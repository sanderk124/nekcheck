import {Edit, Eye, FileText, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getQuestionnaires } from "./actions";
import EditQuestionnaireButton from "./EditQuestionnaireButton";
import PreviewQuestionnaireButton from "./PreviewQuestionnaireButton";
import NewQuestionnaireButton from "./NewQuestionnaireButton";

export default async function QuestionnairesList() {

    const questionnaires = await getQuestionnaires();

    return (
        <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Vragenlijsten</h1>
            <p className="text-muted-foreground">
              Beheer de vragenlijsten die patiënten invullen
            </p>
          </div>

          <NewQuestionnaireButton />
        </div>

        {/* Questionnaire Cards */}
        <div className="grid gap-6">
          {questionnaires.map((questionnaire) => (
            <Card key={questionnaire.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle>{questionnaire.title}</CardTitle>
                        {questionnaire.is_default && (
                          <Badge variant="secondary">Standaard</Badge>
                        )}
                        {questionnaire.is_active && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Actief
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{questionnaire.description}</CardDescription>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <PreviewQuestionnaireButton questionnaireId={questionnaire.id} />
                    <EditQuestionnaireButton questionnaireId={questionnaire.id} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">

                  <span>•</span>
                  <span>Laatst gewijzigd: {new Date(questionnaire.last_modified).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>Let op:</strong> Deze vragenlijst is bedoeld voor monitoring en vervangt geen medische diagnose.
          </p>
        </div>
      </div>
    )
}