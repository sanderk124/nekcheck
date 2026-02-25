import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { register } from '@/components/auth/actions';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Back */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug
            </Link>
          </Button>
          
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <span className="font-bold text-white text-xl">NK</span>
            </div>
            <span className="text-2xl font-bold">NekCheck Pro</span>
          </div>
          <p className="text-muted-foreground">Registreer als fysiotherapeut</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Maak je account aan</CardTitle>
            <CardDescription>
              Vul je gegevens in om te beginnen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={register} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Voornaam</Label>
                  <Input
                    id="firstName"
                    placeholder="Jan"
                    name="firstName"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Achternaam</Label>
                  <Input
                    id="lastName"
                    placeholder="Jansen"
                    name="lastName"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mailadres</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="naam@voorbeeld.nl"
                  name="email"
                  required
                />  
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefoonnummer</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+31 6 12345678"
                  name="phone"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Wachtwoord</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimaal 8 karakters"
                  name="password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">Bevestig wachtwoord</Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  placeholder="Herhaal je wachtwoord"
                  name="passwordConfirm"
                  required
                />
              </div>

              <div className="p-4 bg-accent/50 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    name="acceptTerms"
                  />
                  <label htmlFor="terms" className="text-sm cursor-pointer leading-tight">
                    Ik ga akkoord met de{' '}
                    <a href="#" className="text-primary hover:underline">
                      algemene voorwaarden
                    </a>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy"
                    name="acceptPrivacy"
                  />
                  <label htmlFor="privacy" className="text-sm cursor-pointer leading-tight">
                    Ik heb de{' '}
                    <a href="#" className="text-primary hover:underline">
                      privacy policy
                    </a>{' '}
                    gelezen en ga akkoord
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-900">
                  <strong>Let op:</strong> NekCheck Pro is niet bedoeld voor het verzamelen van 
                  persoonlijke identificeerbare informatie (PII) of het beveiligen van 
                  zeer gevoelige medische gegevens.
                </p>
              </div>

              <Button type="submit" className="w-full">
                Account aanmaken
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          Heb je al een account?{' '}
          <a href="/login" className="text-primary hover:underline">
            Inloggen
          </a>
        </div>
      </div>
    </div>
  );
}