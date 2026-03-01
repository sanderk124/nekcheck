"use client"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

export default function PreviewQuestionnaireButton({ questionnaireId }: { questionnaireId: string }) {
    const router = useRouter()
    return (
        <Button variant="outline" onClick={() => {
            router.push(`/dashboard/questionnaires/${questionnaireId}/preview`)
        }}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
        </Button>
    )
}   