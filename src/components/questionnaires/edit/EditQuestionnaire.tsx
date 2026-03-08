"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, GripVertical, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

type Question = {
    id: string;
    questionnaire_id: string;
    position: number;
    label: string;
    type: string;
    is_required: boolean;
    is_active: boolean;
}

type Questionnaire = {
    id: string;
    title: string;
    description: string;
    created_at: string;
    created_by: string;
}

export default function EditQuestionnaire({ questionnaire, questions }: { questionnaire: Questionnaire, questions: Question[] | null }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const success = searchParams?.get("success");

    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [questionsList, setQuestionsList] = useState<Question[]>(questions || []);
    const selectedQ = questionsList.find(q => q.id === selectedQuestion);

    const handleAddQuestion = () => {
        setQuestionsList([...questionsList, { id: crypto.randomUUID(), questionnaire_id: questionnaire.id, position: questionsList.length + 1, label: "", type: "open_tekst", is_required: false, is_active: true } as Question]);
    }

    const handleDeleteQuestion = () => {
        setQuestionsList(questionsList.filter(q => q.id !== selectedQuestion));
        setSelectedQuestion(null);
    }

    const handleSaveQuestionnaire = async () => {
        const supabase = await createClient();

        const { data: questionsData, error: questionsError } = await supabase.from("questions").upsert(questionsList as Question[]).eq("questionnaire_id", questionnaire.id)

        if (questionsError) {
            throw new Error(questionsError.message);
        }
        router.push(`/dashboard/questionnaires/${questionnaire.id}/edit?success=questionnaire_updated`);
    }

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div>
                <Link href="/dashboard/questionnaires">
                    <Button
                        variant="ghost"
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Terug naar vragenlijsten
                    </Button>
                </Link>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Vragenlijst bewerken</h1>
                        <p className="text-muted-foreground">
                            Pas vragen aan, wijzig volgorde of schakel vragen in/uit
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/dashboard/questionnaires/${questionnaire.id}/preview`}>
                            <Button variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                            </Button>
                        </Link>
                        <Button onClick={handleSaveQuestionnaire}>
                            Opslaan
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
          {/* Left: Questions List */}
          <div className="col-span-5 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vragen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {questionsList.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Geen vragen gevonden</p>
                  </div>
                )}
                {questionsList.map((question, index) => (
                  <div
                    key={question.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedQuestion === question.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedQuestion(question.id)}
                  >
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground mt-0.5 cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm truncate">
                            {question.label || `Vraag ${index + 1}`}
                          </span>
                          {!question.is_active && (
                            <Badge variant="secondary" className="text-xs">Uit</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {question.type}
                          </Badge>
                          {question.is_required && (
                            <span className="text-xs text-muted-foreground">Verplicht</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button onClick={handleAddQuestion} variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Voeg vraag toe
                </Button>
              </CardContent>
            </Card>
            {success && (
              <div className="text-center py-12 text-muted-foreground">
                <p>Vragenlijst succesvol bijgewerkt</p>
              </div>
            )}
          </div>
          <div className="col-span-7">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vraag instellingen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedQ ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="question-label">Vraag tekst</Label>
                      <Input
                        id="question-label"
                        value={selectedQ.label}
                        onChange={(e) => {
                          setQuestionsList(questionsList.map(q => q.id === selectedQ.id ? { ...q, label: e.target.value } : q));
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="question-type">Type</Label>
                      <Select onValueChange={(value) => {
                        setQuestionsList(questionsList.map(q => q.id === selectedQ.id ? { ...q, type: value } : q));
                      }} value={selectedQ.type}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slider">Slider (0-10)</SelectItem>
                          <SelectItem value="ja_nee">Ja/Nee</SelectItem>
                          <SelectItem value="open_tekst">Open tekst</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="required">Verplicht veld</Label>
                      <Switch
                        id="required"
                        checked={selectedQ.is_required}
                        onCheckedChange={(checked) => {
                          setQuestionsList(questionsList.map(q => q.id === selectedQ.id ? { ...q, is_required: checked } : q));
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="enabled">Vraag actief</Label>
                      <Switch
                        id="enabled"
                        checked={selectedQ.is_active}
                        onCheckedChange={(checked) => {
                          setQuestionsList(questionsList.map(q => q.id === selectedQ.id ? { ...q, is_active: checked } : q));
                        }}
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <Button onClick={handleDeleteQuestion} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Verwijder vraag
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Selecteer een vraag om te bewerken</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Preview (patiënt weergave)</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedQ && selectedQ.is_active && (
                  <div className="p-4 border border-border rounded-lg bg-gray-50">
                    <Label className="mb-3 block">
                      {selectedQ.label}
                      {selectedQ.is_required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    
                    {selectedQ.type === 'slider' && (
                      <div className="space-y-2">
                        <input type="range" min="0" max="10" className="w-full" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>5</span>
                          <span>10</span>
                        </div>
                      </div>
                    )}
                    
                    {selectedQ.type === 'ja_nee' && (
                      <div className="flex gap-4">
                        <Button variant="outline">Ja</Button>
                        <Button variant="outline">Nee</Button>
                      </div>
                    )}
                    
                    {selectedQ.type === 'open_tekst' && (
                      <textarea 
                        className="w-full p-2 border border-border rounded-lg" 
                        rows={3}
                        placeholder="Type hier..."
                      />
                    )}
                
                    </div>
                )}
              </CardContent>
            </Card>
            </div>
        </div>
        </div>
    )
}