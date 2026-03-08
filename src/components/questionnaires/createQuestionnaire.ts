"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createQuestionnaire(title: string, description: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("User not found");
    }
    const { data, error } = await supabase.from("questionnaires").insert({ title, description, created_by: user.id });
    if (error) {
        throw new Error(error.message);
    }
    
    
    redirect(`/dashboard/questionnaires`);
}