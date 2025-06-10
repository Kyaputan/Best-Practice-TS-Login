import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export interface EnvConfig {
  PORT: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
  NODE_ENV: "development" | "production" | "test" | string;
  BCRYPT_SALT_ROUNDS:number;
}

export const env: EnvConfig = {
  PORT: process.env.PORT || "error",
  JWT_SECRET: process.env.JWT_SECRET || "error",
  DATABASE_URL: process.env.DATABASE_URL || "error",
  NODE_ENV: process.env.NODE_ENV || "development",
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
