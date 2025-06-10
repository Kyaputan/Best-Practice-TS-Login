import mongoose, { Schema, Document, Model } from "mongoose";
import { ICartItemDTO, ICartSchemaDTO } from "../interfaces/cart.interface";

export interface CartDocument extends Document, ICartSchemaDTO { }




const CartItemSchema = new Schema<ICartItemDTO>(
    {
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Products"
        },
        quantity:{
            type: Number,
            required: true,
            min: 1
        },
    },
    {
        _id: false
    }
);

const CartSchema = new Schema<CartDocument>(
    {
        userId:{    
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            unique: true 
        },
        items:{ 
            type: [CartItemSchema], 
            required: true,
            default: []
        },
    },
    {
        timestamps: true,
    }
);

export const Cart: Model<CartDocument> = mongoose.model<CartDocument>("Cart", CartSchema);