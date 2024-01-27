import { Response } from "express";
import { generateToken } from "../services/generateToken"

export function handleAuthError(error, email: string, response: Response) {
    console.error(`[authRoutes] -> [post] -> [google] -> ${error}`)
    if (error.message.includes("User already exists")) {
        const token = generateToken(email)
        console.log(`[authRoutes] -> [post] -> [google] -> [handleAuthError] -> [token] -> ${token} logged in`)
        return response.json({ token, user: error.user })
    } else {
        return response.status(500).json({ error: error.message });
    }
}
