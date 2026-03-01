
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link2, Calendar, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { getInvites } from "@/components/invites/actions";
import OpenInviteButton from "@/components/invites/OpenInviteButton";


export default async function InvitesPage() {
  const invites = await getInvites();

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Invites</h1>
          <p className="text-muted-foreground">
            Beheer uitnodigingen voor nieuwe patiënten
          </p>
        </div>
        <OpenInviteButton />
      </div>

      {/* Invites Table */}
      <div className="border border-border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Aangemaakt op</TableHead>
              <TableHead>Geldig tot</TableHead>
              <TableHead>Patiëntnaam</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell className="font-mono text-sm">{invite.link_id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {process.env.DOMAIN_NAME}/invite/{invite.link_id}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(invite.created_at), "d MMM yyyy", { locale: nl })}
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(invite.valid_until), "d MMM yyyy", { locale: nl })}
                </TableCell>
                
                <TableCell className="text-sm">
                  {invite.patient_name || <span className="text-muted-foreground">-</span>}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      invite.used_at ? "bg-green-100 text-green-700"
                        : invite.valid_until < new Date().toISOString()
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-100 text-blue-700"
                    }>
                    {invite.used_at ? "Gebruikt" : invite.valid_until < new Date().toISOString() ? "Verlopen" : "Ongebruikt"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {!invite.used_at && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          Intrekken
                        </Button>
                      </>
                    )}
                    {invite.valid_until && invite.valid_until < new Date().toISOString() && (
                      <Button variant="ghost" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Verleng
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Stuur invite links veilig via e-mail of WhatsApp.
          Patiënten kunnen de link maar één keer gebruiken.
        </p>
      </div>
    </div>
  );
}