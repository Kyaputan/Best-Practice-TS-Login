import mongoose, { Schema, Document, Model } from "mongoose";
import { IProduct } from "../interfaces/product.interfaces";
export interface IUserDocument extends IProduct, Document {}

const ProductSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});


export const Product: Model<IUserDocument> = mongoose.model<IUserDocument>("Products", ProductSchema);
