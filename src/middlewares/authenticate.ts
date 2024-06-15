import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

// create an interface.
export interface AuthRequest extends Request {
    userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // 1. get token from headers (login headers.)
    const token = req.headers["authorization"];
    if (!token) {
        return next(createHttpError(401, "Athorization token is required."));
    }

    try {
        // 2. if token get the parse token (get only token parts).
        const tokenParse = token.split(" ")[1];

        // 3. verify token.
        const decoded = jwt.verify(tokenParse, config.jwt_secret as string);
        // console.log("decoded:: ", decoded);

        const _req = req as AuthRequest;
        _req.userId = decoded.sub as string;

        next();
    } catch (error) {
        return next(createHttpError(500, { message: "Token Expire" }));
    }
};

export default authenticate;
