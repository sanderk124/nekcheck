import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';


export default async function PreviewQuestionnairePage({ params }: { params: Promise<{ questionnaires_id: string }> }) {
  const { questionnaires_id } = await params;
  const supabase = await createClient();
  const { data: questions, error: questionsError } = await supabase.from("questions").select("id, questionnaire_id, position, label, type, is_required, is_active").eq("questionnaire_id", questionnaires_id).eq("questionnaire_id", questionnaires_id);
  if (questionsError) {
    throw new Error(questionsError.message);
  }

  const { data: questionnaire, error: questionnaireError } = await supabase.from("questionnaires").select("id, title, description, created_at, created_by").eq("id", questionnaires_id).single();
  if (questionnaireError) {
    throw new Error(questionnaireError.message);
  }

  // Mock questionnaire data


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
              <h1 className="text-3xl font-bold mb-2">Preview: Patiënt weergave</h1>
              <p className="text-muted-foreground">
                Zo zien patiënten deze vragenlijst in de mobiele app
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-border">
            {/* App header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="font-bold text-white text-xs">{questionnaire.created_by.slice(0, 2).toUpperCase()}</span>
                </div>
                <span className="font-bold">NekCheck</span>
              </div>
              <h2 className="text-2xl font-bold">{questionnaire.title}</h2>
              <p className="text-sm text-muted-foreground">{questionnaire.description}</p>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {questions.filter(q => q.is_active).map((question) => (
                <Card key={question.id}>
                  <CardContent className="p-4">
                    <Label className="mb-3 block">
                      {question.label}
                      {question.is_required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    
                    {question.type === 'slider' ? (
                      <div className="space-y-2">
                        <input 
                          type="range" 
                          min="0" 
                          max="10" 
                          defaultValue="5"
                          className="w-full accent-teal-500"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span className="font-medium text-primary">5</span>
                          <span>10</span>
                        </div>
                      </div>
                    ) : question.type === 'ja_nee' && (
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 px-4 rounded-lg border-2 border-border bg-white hover:border-primary transition-colors text-sm font-medium">
                          Nee
                        </button>
                        <button className="flex-1 py-2 px-4 rounded-lg border-2 border-border bg-white hover:border-primary transition-colors text-sm font-medium">
                          Ja
                        </button>
                      </div>
                    )}
                    
                    
                    
                    {question.type === 'open_tekst' && (
                      <textarea 
                        className="w-full p-3 border border-border rounded-lg bg-white" 
                        rows={3}
                        placeholder="Type hier..."
                      />
                    )}
                    
                    
                  </CardContent>
                </Card>
              ))}

              {/* Submit button */}
              <button className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Verstuur check-in
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
