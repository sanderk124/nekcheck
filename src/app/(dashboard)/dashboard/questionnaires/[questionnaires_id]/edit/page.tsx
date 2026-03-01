import { createClient } from "@/lib/supabase/server";
import EditQuestionnaire from "@/components/questionnaires/edit/EditQuestionnaire";
import { redirect } from "next/navigation";

type Question = {
    id: string;
    position: number;
    label: string;
    type: string;
    is_required: boolean;
}

export default async function EditQuestionnairePage({ params }: { params: Promise<{ questionnaires_id: string }> }) {
    const { questionnaires_id } = await params;
    const supabase = await createClient();
    console.log("questionnaires_id: ", questionnaires_id);

    const { data: questions, error: questionsError } = await supabase.from("questions").select("id, position, label, type, is_required").eq("questionnaire_id", questionnaires_id).eq("questionnaire_id", questionnaires_id);

    if (questionsError) {
        throw new Error(questionsError.message);
    }
    const { data: questionnaire, error: questionnaireError } = await supabase.from("questionnaires").select("id, title, description, created_at, created_by").eq("id", questionnaires_id).single();

    if (questionnaireError) {
        throw new Error(questionnaireError.message);
    }

    if (!questions || !questionnaire) {
        redirect("/dashboard/questionnaires");
    }



    return (
        <EditQuestionnaire questionnaire={questionnaire} questions={questions as Question[] | null} />
    )
}