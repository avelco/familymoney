import { Hono, Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createSchema } from "../schemas/userSchemas";
import { createUser, getUserByEmail } from "../repositories/userRepository";

const app = new Hono();

app.post("/create", zValidator("json", createSchema), async (c: Context) => {
    try {
        const { email, name } = await c.req.json();

        // Check for existing user
        const existingUser = await getUserByEmail(c.env.DB, email);
        if (existingUser) {
            return c.json({ error: "Email already registered" }, 409);
        }

        // Create new user
        const userId = await createUser(c.env.DB, email, name);
        return c.json({ result: userId });
    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case "EMAIL_EXISTS":
                    return c.json({ error: "Email already registered" }, 409);
                case "DATABASE_ERROR":
                    return c.json({ error: "Database operation failed" }, 500);
            }
        }
        console.error("Unexpected error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});

app.post("/verify-code", (c) => c.json("verify code"));
app.post("/logout", (c) => c.json("logout"));

export default app;
