import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Check, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function SettingsPage() {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const { data: profileData } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
  if (!profileData) {
    throw new Error("Profile not found");
  }

  return (
    <div className="p-8 space-y-6">
    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold mb-2">Mijn profiel</h1>
      <p className="text-muted-foreground">
        Beheer je persoonlijke gegevens en voorkeuren
      </p>
    </div>

    {/* Tabs */}
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general">Algemeen</TabsTrigger>
        <TabsTrigger value="security">Beveiliging</TabsTrigger>
      </TabsList>

      {/* General Tab */}
      <TabsContent value="general" className="space-y-6">
        {/* Profile Photo */}
        <Card>
          <CardHeader>
            <CardTitle>Profielfoto</CardTitle>
            <CardDescription>Upload een profielfoto die zichtbaar is voor je team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {profileData.first_name[0]}{profileData.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload nieuwe foto
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG of GIF. Maximaal 2MB. Aanbevolen: 400x400px
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Persoonlijke gegevens</CardTitle>
            <CardDescription>Je basis informatie en contactgegevens</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Voornaam</Label>
                <Input
                  id="firstName"
                  defaultValue={profileData.first_name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Achternaam</Label>
                <Input
                  id="lastName"
                  defaultValue={profileData.last_name}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefoonnummer</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue={profileData?.phone || ""}
              />
            </div>

            <div className="pt-4">
              <Button>
                <Check className="w-4 h-4 mr-2" />
                Wijzigingen opslaan
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  );
}