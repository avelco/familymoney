import type { D1Database } from "@cloudflare/workers-types";
import { getCurrentTime } from "../utils/time";

export const createUser = async (
    db: D1Database,
    email: string,
    name: string
): Promise<string> => {
    const userId = crypto.randomUUID();
    const seed = crypto.getRandomValues(new Uint8Array(16));
    try {
        await db
            .prepare(
                "INSERT INTO users (id, email, name, seed, created_at) VALUES (?, ?, ?, ?, ?)"
            )
            .bind(userId, email, name, seed, getCurrentTime())
            .run();
        return userId;
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes("UNIQUE constraint failed: users.email")
        ) {
            throw new Error("EMAIL_EXISTS");
        }
        throw new Error("DATABASE_ERROR");
    }
};

export const getUserByEmail = async (db: D1Database, email: string) => {
    try {
        return await db
            .prepare("SELECT id FROM users WHERE email = ?")
            .bind(email)
            .first();
    } catch (error) {
        throw new Error("DATABASE_ERROR");
    }
};
