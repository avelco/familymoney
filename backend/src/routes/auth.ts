import { Hono, Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schemas/authSchemas";
import { getUserByEmail } from "../repositories/userRepository";

const app = new Hono();

app.post(
    "/request-code",
    // Validate the request body
    zValidator("json", loginSchema),
    // Handle the request
    async (c: Context) => {
        // Validate if email is in the database
        const { email } = await c.req.json();
        const userId = await getUserByEmail(c.env.DB, email);
        if (!userId) {
            return c.json({ error: "Email not found" }, 404);
        }
        // Generate a random code
        return c.json(userId);
    }
);

app.post("/verify-code", (c) => c.json("list books"));
app.post("/logout", (c) => c.json("list books"));

export default app;
