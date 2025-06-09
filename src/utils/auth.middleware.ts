import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { JWTUserPayload } from '../interfaces/auth.interfaces';
import { expressjwt } from 'express-jwt';

export const generateToken = (payload: JWTUserPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1d", algorithm: "HS256" });
  };

export const verifyToken = (token: string): any => {
    return jwt.verify(token, env.JWT_SECRET);
};

