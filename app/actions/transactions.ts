"use server";

import { createClient } from "@/lib/supabase/server";

export const addTransaction = async (transaction: any) => {
    const supabase = await createClient();

    // 🔹 Get the authenticated user
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("User not authenticated");
    }

    const newTransaction = {
        ...transaction,
        date: new Date().toISOString(),
        user_id: user.id,
    };

    const { data, error } = await supabase
        .from("transactions")
        .insert(newTransaction);

    if (error) {
        throw error;
    }

    return data;
};

export const updateAccountBalance = async (
    accountId: string,
    amount: number
) => {
    const supabase = await createClient();

    // Update the account balance
    const { data, error } = await supabase
        .from("accounts")
        .update({ balance: supabase.rpc("increment_balance", { x: amount }) })
        .eq("id", accountId);

    if (error) {
        throw error;
    }

    return data;
};
