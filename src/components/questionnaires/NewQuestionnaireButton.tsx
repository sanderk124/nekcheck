"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import NewQuestionnaireDialog from "./NewQuestionnaireDialog";

export default function NewQuestionnaireButton() {
  const [showNewDialog, setShowNewDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowNewDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Nieuwe vragenlijst
      </Button>

      {showNewDialog && (
        <NewQuestionnaireDialog onClose={() => setShowNewDialog(false)} />
      )}
    </>
  );
}