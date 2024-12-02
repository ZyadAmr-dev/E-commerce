import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export function generateToken(payload: string | object): string {
    if (!process.env.TOKEN_SECRET) {
        throw new Error("TOKEN_SECRET is not defined in the environment variables.");
    }

    try {
        return jwt.sign(payload, process.env.TOKEN_SECRET);
    } catch (err) {
        console.error("Error generating token:", err);
        throw new Error("Failed to generate token.");
    }
}

export function verifyToken(token: string, secretKey = process.env.TOKEN_SECRET): jwt.JwtPayload | string {
    try {
        return jwt.verify(String(token), secretKey);
    } catch (err) {
        console.error("Error verifying token:", err);
        throw new Error("Token verification failed."); 
    }
}
