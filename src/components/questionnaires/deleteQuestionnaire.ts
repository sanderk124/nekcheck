"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteQuestionnaire(questionnaireId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("User not found");
    }
    const { data, error } = await supabase.from("questionnaires").delete().eq("id", questionnaireId).eq("created_by", user.id);
    if (error) {
        throw new Error(error.message);
    }
    redirect(`/dashboard/questionnaires`);
}