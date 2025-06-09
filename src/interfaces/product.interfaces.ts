import { z } from "zod";

//  Zod Schemas
export const ProductSchema = z.object({
    name: z.string().min(3).max(255),
    price: z.number().min(0),
    quantity: z.number().int().min(0),
    type: z.enum(["electronics", "grocery", "fashion", "home", "misc"]),
}).strict();

export const updateProductSchema = z.object({
    name: z.string().min(3).max(255).optional(),
    price: z.number().min(0).optional(),
    quantity: z.number().int().min(0).optional(),
    type: z.enum(["electronics", "grocery", "fashion", "home", "misc"]).optional(),
}).strict();

export const deleteProductSchema = z.object({
    password: z.string().min(6).max(255),
}).strict();

//  Inferred Types
export type ProductDTO = z.infer<typeof ProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type DeleteProductDTO = z.infer<typeof deleteProductSchema>;

