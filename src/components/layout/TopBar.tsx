import { ChevronDown, Search, User } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { logout } from "@/components/auth/actions";
import { LogoutButton } from "./LogoutButton";

export default function TopBar() {
  return (
    <div className="h-16 border-b border-border bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Zoek patiënt..."

            className="pl-9"
          />
        </div>
      </div>
    <div className="flex items-center gap-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
            JV
          </div>
          <span className="font-medium">Jan Visser</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div>
            <div className="font-medium">Jan Visser</div>
            <div className="text-sm text-muted-foreground">jan.visser@nekcheck.nl</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard/settings">
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profiel
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <LogoutButton logout={logout} />
      </DropdownMenuContent>
    </DropdownMenu>
  </div>  
  </div>
  );
}