import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";
import { UserRepository } from "../modules/users/repositories/implementations/UserRepository";

const TOKEN_MISSING_ERROR = "Token missing";
const INVALID_TOKEN_ERROR = "Invalid token";
const USER_NOT_FOUND_ERROR = "User not found";

const userRepository = container.resolve(UserRepository);

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new Error(TOKEN_MISSING_ERROR);
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            throw new Error(INVALID_TOKEN_ERROR);
        }

        const [, token] = parts;

        try {
            const { sub: user_id } = verify(token, process.env.JWT_SECRET!) as { sub: string };

            const user = await userRepository.findById(user_id);
            if (!user) {
                throw new Error(USER_NOT_FOUND_ERROR);
            }

            request.userGoogle = user;
            next();
        } catch (error) {
            console.error(`[ensureAuthenticated] -> ${error}`);
            response.status(401).json({ error: error.message });
        }
}
