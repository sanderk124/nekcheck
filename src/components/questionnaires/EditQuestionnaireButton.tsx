"use client"

import { Edit } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function EditQuestionnaireButton({ questionnaireId }: { questionnaireId: string }) {
    const router = useRouter()
    return (
        <Button onClick={() => {
            router.push(`/dashboard/questionnaires/${questionnaireId}/edit`)
        }}>
            <Edit className="w-4 h-4 mr-2" />
            Bewerken
        </Button>
    )
}