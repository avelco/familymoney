import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email no puede estar vacío")
        .email("Formato de email incorrecto"),
});
