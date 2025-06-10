import { z } from "zod";
import mongoose from "mongoose";


export const ICartItem = z.object({
    productId: z.custom<mongoose.Types.ObjectId>(), 
    quantity: z.number().int().min(1),
}).strict();

export const ICartSchema = z.object({
    userId: z.custom<mongoose.Types.ObjectId>(),         
    items: z.array(ICartItem),
});

export const addToCartSchema = z.object({
    productId: z.custom<mongoose.Types.ObjectId>(),
    quantity: z.number().int().min(1),
}).strict();

export const removeFromCartSchema = z.object({
    productId: z.custom<mongoose.Types.ObjectId>(),
}).strict();

export const updateCartSchema = z.object({
    productId: z.custom<mongoose.Types.ObjectId>(),
    quantity: z.number().int().min(1),
}).strict();


export type ICartItemDTO = z.infer<typeof ICartItem>;
export type ICartSchemaDTO = z.infer<typeof ICartSchema>;

export type AddToCartDTO = z.infer<typeof addToCartSchema>;
export type RemoveFromCartDTO = z.infer<typeof removeFromCartSchema>;
export type UpdateCartDTO = z.infer<typeof updateCartSchema>;