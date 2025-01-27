import { Hono } from "hono";
import auth from "./routes/auth";
import user from "./routes/user";

const app = new Hono();
app.route("/auth", auth);
app.route("/user", user);
app.get("/", (c) => c.text("Hono!"));

export default app;
