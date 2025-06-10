import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "../interfaces/auth.interface";

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, {
    timestamps: true
});


export const User: Model<IUserDocument> = mongoose.model<IUserDocument>("Users", userSchema);
