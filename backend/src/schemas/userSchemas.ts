import { z } from "zod";

export const createSchema = z.object({
    email: z
        .string()
        .min(1, "Email no puede estar vacío")
        .email("Formato de email incorrecto"),

    name: z.string().min(1, "Nombre no puede estar vacío"),
});
