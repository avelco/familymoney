"use server";

import { createClient } from "@/lib/supabase/server";

export const getAccounts = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.from("accounts").select("*");

    if (error) {
        throw error;
    }

    return data;
};

export const addAccount = async (account: any) => {
    const supabase = await createClient();

    // 🔹 Get the authenticated user
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("User not authenticated");
    }

    const updated_at = new Date().toISOString();
    //Include the userId in the account object
    const newAccount = {
        ...account,
        user_id: user.id,
        updated_at,
    };

    const { data, error } = await supabase.from("accounts").insert(newAccount);

    if (error) {
        throw error;
    }

    return data;
};

export const getCategories = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
        throw error;
    }

    return data;
};

export const addCategory = async (category: any) => {
    const supabase = await createClient();

    // 🔹 Get the authenticated user
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("User not authenticated");
    }

    const updated_at = new Date().toISOString();
    //Include the userId in the category object
    const newCategory = {
        ...category,
        user_id: user.id,
        updated_at,
    };

    const { data, error } = await supabase
        .from("categories")
        .insert(newCategory);

    if (error) {
        throw error;
    }

    return data;
};
