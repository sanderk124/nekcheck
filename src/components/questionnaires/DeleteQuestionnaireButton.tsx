"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteQuestionnaire } from "./deleteQuestionnaire";

export default function DeleteQuestionnaireButton({ questionnaireId }: { questionnaireId: string }) {
    const handleDeleteQuestionnaire = async () => {
        await deleteQuestionnaire(questionnaireId);
    }
    return (
        <Button variant="destructive" onClick={() => {
            handleDeleteQuestionnaire();
        }}>
            <Trash2 className="w-4 h-4 mr-2" />
            Verwijder
        </Button>
    )
}