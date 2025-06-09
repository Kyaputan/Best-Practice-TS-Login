import bcrypt from 'bcryptjs';
import { env } from '../config/env';

const SALT_ROUNDS = env.BCRYPT_SALT_ROUNDS;

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

