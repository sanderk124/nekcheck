"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import InvitePatientDialog from "./InvitePatientDialog";


export default function OpenInviteButton() {
    const [isNewInviteOpen, setIsNewInviteOpen] = useState(false);

    return (
        <Dialog open={isNewInviteOpen} onOpenChange={(open) => {
            setIsNewInviteOpen(open);
        }}>
            <DialogTrigger asChild>
                <Button>Open invite</Button>
            </DialogTrigger>
            <InvitePatientDialog />
        </Dialog>
    );
}