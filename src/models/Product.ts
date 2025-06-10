import mongoose, { Schema, Document, Model } from "mongoose";
import { ProductDTO } from "../interfaces/product.interface";

export interface IUserDocument extends ProductDTO, Document {}

const ProductSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (v: number) => v >= 0,
            message: "Price must be a non-negative number",
        },
    },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator: (v: number) => v >= 0,
            message: "Quantity must be a non-negative number",
        },
        default: 0,
    },
    type: {
        type: String,
        enum: ["electronics", "grocery", "fashion", "home", "misc"],
        default: "misc",
    },
}, {
    timestamps: true
});


export const Product: Model<IUserDocument> = mongoose.model<IUserDocument>("Products", ProductSchema);
