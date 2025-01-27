import { cors } from "hono/cors";

export const corsMiddleware = cors({
  origin: "*",
  allowMethods: ["POST", "GET", "OPTIONS"],
  credentials: true,
});
