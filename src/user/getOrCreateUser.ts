import { User } from "../types/User";
import { createUser } from "./createUser";
import { getUser } from "./getUser";

export async function getOrCreateUser(chatId: number, username: string | undefined): Promise<User> {
    if (!Number.isFinite(chatId)) {
        throw new Error(`Invalid chat ID ${chatId} when getting/creating new user ${username}`);
    }

    const existingUser = await getUser(chatId);
    if (existingUser) {
        return existingUser;
    }

    return createUser(chatId, username);
}