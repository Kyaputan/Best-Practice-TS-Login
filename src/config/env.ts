import dotenv from 'dotenv';
import path from 'path';
import { EnvConfig } from '../interfaces/env.interfaces';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const env: EnvConfig = {
  PORT: process.env.PORT || "error",
  JWT_SECRET: process.env.JWT_SECRET || "error",
  DATABASE_URL: process.env.DATABASE_URL || "error",
  NODE_ENV: process.env.NODE_ENV || "development",
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
