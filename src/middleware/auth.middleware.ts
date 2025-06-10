import { expressjwt } from "express-jwt";
import { env } from "../config/env";
import { Request, Response, NextFunction } from "express";
import { JWTUserPayload } from "../interfaces/auth.interface";

declare global {
    namespace Express {
        interface Request {
            auth?: JWTUserPayload;
        }
    }
}

export const requireLogin = expressjwt({
    secret: env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth",
});

export const handleJwtError = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ success: false, error: 'Unauthorized: Invalid or missing token' });
    } else {
        next(err);
    }
};
interface Role {
    role: "user" | "admin";
}

export const checkRole = (role: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const auth: JWTUserPayload = req.auth as JWTUserPayload;

        if (auth && auth.role === role.role) {
            next();
        } else {
            console.log(`❌ Role mismatched: Required ${role.role}, got ${auth?.role}`);
            res.status(403).json({ message: "Forbidden: Insufficient role" });
        }
    };
};
