import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import { env } from "../config/env";

const connectDB = async (): Promise<void> => {
    try {
        const conn: Mongoose = await mongoose.connect(env.DATABASE_URL, {} as ConnectOptions);
        console.info(`[Database] Connected to MongoDB: ${conn.connection.name} ✅`);
    } catch (err: unknown) {
        console.error("[Database] Connection error ❌", err);
        if (err instanceof Error) {
            console.error("Error message:", err.message);
        }
        process.exit(1);
    }
};

export default connectDB;
