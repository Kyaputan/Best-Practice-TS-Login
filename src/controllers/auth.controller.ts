import { Request, Response } from "express";
import { User } from "../models/User";
import { UserRegisterDTO, UserLoginDTO, UpdateUserDTO, UserDeleteDTO } from "../interfaces/auth.interfaces";
import { userRegisterSchema, userLoginSchema, updateUserSchema, userDeleteSchema } from "../interfaces/auth.interfaces";
import { comparePassword, hashPassword } from "../utils/hash.util";
import { generateToken } from "../utils/auth.middleware";
import { JWTUserPayload } from "../interfaces/auth.interfaces";
import { IUserDocument } from "../models/User";
import { ZodError } from "zod";

class AuthController {

  static async register(req: Request<{}, {}, UserRegisterDTO>, res: Response): Promise<void> {
    try {
      const registerData = userRegisterSchema.parse(req.body);
      const { username, email, password } = registerData;
      const exist = await User.findOne({ email }).exec();
      if (exist) {
        res.status(400).json({ success: false, error: "Email already in use" });
        return;
      }
      const hashedPassword: string = await hashPassword(password);
      const user: IUserDocument = await User.create({ username, email, password: hashedPassword });
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ success: false, error: "Validation error", details: err.errors });
      } else if (err instanceof Error) {
        res.status(400).json({ success: false, error: err.message });
      } else {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }


  static async login(req: Request<{}, {}, UserLoginDTO>, res: Response): Promise<void> {
    try {
      const loginData = userLoginSchema.parse(req.body);
      const { email, password } = loginData;
      try {

        const user: IUserDocument | null = await User.findOne({ email }).exec();
        if (!user) {
          res.status(401).json({ success: false, error: "Invalid email or password" });
          return;
        }

        const isPasswordValid: boolean = await comparePassword(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({ success: false, error: "Invalid email or password" });
          return;
        }
        const Payloads: JWTUserPayload = { _id: user._id, username: user.username, email: user.email, role: user.role, }
        const token: string = generateToken(Payloads);
        res.status(200).json({ success: true, message: "Logged in successfully", token });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ success: false, error: "Validation error", details: err.errors });
      } else if (err instanceof Error) {
        res.status(400).json({ success: false, error: err.message });
      }
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    const userId: string | undefined = req.auth?._id;
    if (!userId) {
      res.status(401).json({ success: false, error: "Unauthorized" });
      return;
    }
    const user: IUserDocument | null = await User.findById(userId).exec();
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }
    res.status(200).json({ success: true, message: `Logged out successfully - ${user.username}` });
  }

  static async update(req: Request<{}, {}, UpdateUserDTO>, res: Response): Promise<void> {
    try {
      const updateData = updateUserSchema.parse(req.body);
      const { username, email, password, newpassword } = updateData;
      const userId = req.auth?._id;
      if (!username && !email && !newpassword) {
        res.status(400).json({ success: false, error: "No fields to update" });
        return;
      }
      try {
        const user: IUserDocument | null = await User.findById(userId).exec();
        if (!user) {
          res.status(404).json({ success: false, error: "User not found" });
          return;
        }

        const isPasswordValid: boolean = await comparePassword(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({ success: false, error: "Invalid current password" });
          return;
        }


        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (newpassword) user.password = await hashPassword(newpassword);

        const updatedUser = await user.save();

        res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ success: false, error: "Validation error", details: err.errors });
      } else if (err instanceof Error) {
        res.status(400).json({ success: false, error: err.message });
      }
    }
  }

  static async delete(req: Request<{}, {}, UserDeleteDTO>, res: Response): Promise<void> {
    try {
      const deleteData = userDeleteSchema.parse(req.body);
      const { email, password } = deleteData;
      const userId = req.auth?._id;

      if (!userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }

      const user: IUserDocument | null = await User.findOne({ email }).exec();
      if (!user) {
        res.status(401).json({ success: false, error: "Invalid email or password" });
        return;
      }
      if (user._id !== userId) {
        res.status(403).json({ success: false, error: "Forbidden" });
        return;
      }

      const isPasswordValid: boolean = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ success: false, error: "Invalid email or password" });
        return;
      }

      const deletedUser = await User.findByIdAndDelete(userId).exec();
      if (!deletedUser) {
        res.status(404).json({ success: false, error: "User not found" });
        return;
      }

      res.status(200).json({ success: true, message: "User deleted successfully", user: deletedUser });

    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ success: false, error: "Validation error", details: err.errors });
      } else {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }
}

export default AuthController;