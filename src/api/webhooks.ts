import { Request, Response } from "express";
import { upgradeChirpyRed } from "../db/queries/users.js";
import { config } from "../config.js";
import { getAPIKey } from "../auth.js";
import { UnauthorizedError } from "./errors.js";

export async function handlerWebhook(req: Request, res: Response) {
    type parameters = {
        event: string;
        data: {
            userId: string;
        };
    };

    const params: parameters = req.body;

    let apiKey = getAPIKey(req);
    if (apiKey !== config.api.polkaKey) {
        throw new UnauthorizedError("Invalid api key");
    }

    if (params.event !== "user.upgraded") {
        res.status(204).send();
        return;
    }

    const upgradedUser = await upgradeChirpyRed(params.data.userId);
    if (!upgradedUser) {
        res.status(404).send();
        return;
    }

    res.status(204).send();
}
