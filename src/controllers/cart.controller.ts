import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { User } from "../models/User";
import { ZodError } from "zod";
import { addToCartSchema, removeFromCartSchema, updateCartSchema } from "../interfaces/cart.interface"
import { AddToCartDTO, RemoveFromCartDTO, UpdateCartDTO } from "../interfaces/cart.interface"

class CartController {

  static async addToCart(req: Request<{}, {}, AddToCartDTO>, res: Response): Promise<void> {
    try {
      const AddCartData = addToCartSchema.safeParse(req.body);
      if (!AddCartData.success) {
        res.status(400).json({ success: false, error: "Validation error", details: AddCartData.error.errors });
        return;
      }
      const { productId, quantity } = AddCartData.data;
      const userId = req.auth?._id;
      if (!userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }
      const user = await User.findById(userId).exec();
      if (!user) {
        res.status(404).json({ success: false, error: "User not found" });
        return;
      }
      const cart = await Cart.findOne({ userId }).exec();
      if (!cart) {
        res.status(404).json({ success: false, error: "Cart not found" });
        return;
      }
      const isProductInCart: boolean = cart.items.some((item) => item.productId.toString() === productId.toString());
      if (isProductInCart) {
        res.status(400).json({ success: false, error: "Product already in cart" });
        return;
      }
      cart.items.push({ productId, quantity });
      await cart.save();
      res.status(201).json({ success: true, message: "Product added to cart successfully", cart });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: "Validation error", details: error.errors });
      } else if (error instanceof Error) {
        res.status(400).json({ success: false, error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }

  static async removeFromCart(req: Request<{}, {}, RemoveFromCartDTO>, res: Response): Promise<void> {
    try {
      const RemoveCartData = removeFromCartSchema.safeParse(req.body);
      if (!RemoveCartData.success) {
        res.status(400).json({ success: false, error: "Validation error", details: RemoveCartData.error.errors });
        return;
      }  const { productId } = RemoveCartData.data
      const userId = req.auth?._id;
      if (!userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }
      const user = await User.findById(userId).exec();
      if (!user) {
        res.status(404).json({ success: false, error: "User not found" });
        return;
      }
      const cart = await Cart.findOne({ userId }).exec();
      if (!cart) {
        res.status(404).json({ success: false, error: "Cart not found" });
        return;
      }
      const isProductInCart: boolean = cart.items.some((item) => item.productId.toString() === productId.toString());
      if (!isProductInCart) {
        res.status(400).json({ success: false, error: "Product not in cart" });
        return;
      }
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId.toString());
      await cart.save();
      res.status(200).json({ success: true, message: "Product removed from cart successfully", cart });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: "Validation error", details: error.errors });
      } else if (error instanceof Error) {
        res.status(400).json({ success: false, error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }

  static async getCart(req: Request<{}, {}, {}>, res: Response): Promise<void> {
    try {
      const userId = req.auth?._id;
      if (!userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }
      const user = await User.findById(userId).exec();
      if (!user) {
        res.status(404).json({ success: false, error: "User not found" });
        return;
      }
      const cart = await Cart.findOne({ userId }).exec();
      if (!cart) {
        res.status(404).json({ success: false, error: "Cart not found" });
        return;
      }
      res.status(200).json({ success: true, message: "Cart retrieved successfully", cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  static async EditCart(req: Request<{}, {}, UpdateCartDTO>, res: Response): Promise<void> {
    try {
      const EditCartData = updateCartSchema.safeParse(req.body);
      if (!EditCartData.success) {
        res.status(400).json({ success: false, error: "Validation error", details: EditCartData.error.errors });
        return;
      }
      const { productId, quantity } = EditCartData.data;
      const userId = req.auth?._id;
      if (!userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }
      const user = await User.findById(userId).exec();
      if (!user) {
        res.status(404).json({ success: false, error: "User not found" });
        return;
      }
      const cart = await Cart.findOne({ userId }).exec();
      if (!cart) {
        res.status(404).json({ success: false, error: "Cart not found" });
        return;
      }
      const isProductInCart: boolean = cart.items.some((item) => item.productId.toString() === productId.toString());
      if (!isProductInCart) {
        res.status(400).json({ success: false, error: "Product not in cart" });
        return;
      }
      cart.items = cart.items.map((item) => {
        if (item.productId.toString() === productId.toString()) {
          item.quantity = quantity;
        }
        return item;
      });
      await cart.save();
      res.status(200).json({ success: true, message: "Product updated in cart successfully", cart });
    } catch (error) {
    }
  }
}

export default CartController;

// Request<{ค่าจากparameter}, {ค่าจากquery}, {ค่าจากbody} , {ค่าจากheader}>

// จากparameter /user/123 → { id: "123" }
// จากquery /user?name=John&age=30 → { name: "John", age: "30" }
// จากbody 	{ name: "apple" }
// จากheader { "Content-Type": "application/json" }