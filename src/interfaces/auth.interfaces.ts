import { z } from "zod";
import { ObjectId } from "mongoose";
// === Interfaces ===

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
}

export interface JWTUserPayload {
    _id: any;
    username: string;
    email: string;
    role: "admin" | "user";
}

declare global {
    namespace Express {
      interface Request {
        auth?: JWTUserPayload;
      }
    }
}
// === Zod Schemas ===

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
}).strict();

export const userRegisterSchema = z.object({
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
}).strict();

export const updateUserSchema = z.object({
    username: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(255),
    newpassword: z.string().min(6).max(255).optional(),
}).strict();

export const userDeleteSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
}).strict();

// === Inferred Types from Zod ===

export type UserLoginDTO = z.infer<typeof userLoginSchema>;
export type UserRegisterDTO = z.infer<typeof userRegisterSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type UserDeleteDTO = z.infer<typeof userDeleteSchema>;
