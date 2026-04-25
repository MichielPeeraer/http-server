import { Request, Response } from "express";
import { createUser, updateUser } from "../db/queries/users.js";
import { BadRequestError } from "./errors.js";
import { respondWithJSON } from "./json.js";
import { getBearerToken, hashPassword, validateJWT } from "../auth.js";
import { NewUser, UserResponse } from "../db/schema.js";
import { config } from "../config.js";

export async function handlerUsersCreate(req: Request, res: Response) {
    type parameters = {
        email: string;
        password: string;
    };
    const params: parameters = req.body;

    if (!params.email || !params.password) {
        throw new BadRequestError("Missing required fields");
    }

    const user = await createUser({
        email: params.email,
        hashedPassword: await hashPassword(params.password),
    } satisfies NewUser);

    if (!user) {
        throw new Error("Could not create user");
    }

    respondWithJSON(res, 201, {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isChirpyRed: user.isChirpyRed,
    } satisfies UserResponse);
}

export async function handlerUsersUpdate(req: Request, res: Response) {
    type parameters = {
        password: string;
        email: string;
    };

    const token = getBearerToken(req);
    const userId = validateJWT(token, config.jwt.secret);

    const params: parameters = req.body;

    if (!params.password || !params.email) {
        throw new BadRequestError("Missing required fields");
    }

    const hashedPassword = await hashPassword(params.password);

    const user = await updateUser({
        id: userId,
        email: params.email,
        hashedPassword,
    });

    respondWithJSON(res, 200, {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        isChirpyRed: user.isChirpyRed,
    } satisfies UserResponse);
}
