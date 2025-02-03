// app/actions/auth.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";

export async function signInWithEmail(email: string) {
    const supabase = await createClient();
    // Validate the email (optional, as you're already validating on the client)
    if (!email || !email.includes("@")) {
        throw new Error("Debes ingresar un correo válido");
    }
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            // set this to false if you do not want the user to be automatically signed up
            shouldCreateUser: false,
        },
    });
    console.log(error);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function verifyOtp(email: string, otp: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: "email",
    });

    if (error) {
        return { success: false, error: error.message };
    }

    permanentRedirect("/dashboard");
}
