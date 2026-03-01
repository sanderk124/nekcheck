type Question = {
    id: string;
    position: number;
    label: string;
    type: string;
    is_required: boolean;
}

type Questionnaire = {
    id: string;
    title: string;
    description: string;
    created_at: string;
    created_by: string;
}

export default function EditQuestionnaire({ questionnaire, questions }: { questionnaire: Questionnaire, questions: Question[] | null }) {

    return (
    <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold mb-2">Bewerken van vragenlijst</h1>
            <p className="text-muted-foreground">Bewerk de vragenlijst om deze aan te passen.</p>
            <div className="grid gap-6">
                {questions?.map((question) => (
                    <div key={question.id}>
                        <h2 className="text-lg font-bold">{question.label}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}