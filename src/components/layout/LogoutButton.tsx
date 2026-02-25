"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type LogoutButtonProps = {
  logout: () => Promise<void>;
};

export function LogoutButton({ logout }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      logout();
    });
  }

  return (
    <DropdownMenuItem asChild>
      <Button
        type="button"
        variant="ghost"
        className="w-full justify-start font-normal cursor-pointer"
        onClick={handleClick}
        disabled={isPending}
      >
        <LogOut className="w-4 h-4 mr-2" />
        {isPending ? "Bezig..." : "Uitloggen"}
      </Button>
    </DropdownMenuItem>
  );
}
