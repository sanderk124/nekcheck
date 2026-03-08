import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type Questionnaire = {
    id: string;
    created_at: string;
    title: string;
    created_by: string;
    is_active: boolean;
    is_default: boolean;
    description: string;
    last_modified: string;
}

export async function getQuestionnaires() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("User not found");
    }

    const { data, error } = await supabase.from("questionnaires").select("id, created_at, title, created_by, is_active, is_default, description, last_modified").eq("created_by", user.id);
    if (error) {
        throw new Error(error.message);
    }
    return data as Questionnaire[];
}

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
    
    if (!data) {
        throw new Error("Questionnaire not created");
    }
    
    redirect(`/dashboard/questionnaires?success=questionnaire_created`);
}