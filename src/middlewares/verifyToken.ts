import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/generateTokens";

export const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(403).json({ success: false, message: "Token is invalid or expired" });
        }
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(403).json({ success: false, message: "Token is invalid or expired" });
    }
};
