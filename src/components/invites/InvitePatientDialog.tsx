
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { SelectTrigger } from "../ui/select";
import { SelectValue } from "../ui/select";
import { SelectContent } from "../ui/select";
import { SelectItem } from "../ui/select";
import { createInvite } from "./actions";

export default function InvitePatientDialog() {

    return (
    <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nieuwe patiënt uitnodigen</DialogTitle>
                <DialogDescription>
                  Genereer een invite link om een nieuwe patiënt te koppelen
                </DialogDescription>
              </DialogHeader>
              
                <form action={createInvite}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-name">Patiëntnaam (optioneel)</Label>
                    <Input
                      id="patient-name"
                      placeholder="Bijv. Jan Jansen"
                      name="patientName"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validity">Geldigheid</Label>
                    <Select
                      name="validity"
                      defaultValue="14"
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 dagen</SelectItem>
                        <SelectItem value="14">14 dagen</SelectItem>
                        <SelectItem value="30">30 dagen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full">
                    Genereer invite
                  </Button>
                </div>
                </form>
               

            </DialogContent>
    )
};