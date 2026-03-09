"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { createQuestionnaire } from "./createQuestionnaire";

export default function NewQuestionnaireDialog({ onClose }: { onClose: () => void }) {
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const handleCreateQuestionnaire = async () => {
        await createQuestionnaire(newName, newDescription);
        onClose();
    }
    return (
        <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nieuwe vragenlijst aanmaken</DialogTitle>
            <DialogDescription>
              Vul de details in voor de nieuwe vragenlijst.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Naam</Label>
              <Input
                id="name"
                value={newName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                placeholder="NekCheck Daily"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Beschrijving</Label>
              <Textarea
                id="description"
                value={newDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDescription(e.target.value)}
                placeholder="Standaard dagelijkse check-in vragenlijst"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Annuleren
            </Button>
            <Button type="button" onClick={handleCreateQuestionnaire}>
              Aanmaken
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}