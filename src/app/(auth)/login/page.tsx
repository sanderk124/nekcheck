import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { login } from '@/components/auth/actions';

export default function LoginPage() {
  return     <div className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50 flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    {/* Logo */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
          <span className="font-bold text-white text-xl">NK</span>
        </div>
        <span className="text-2xl font-bold">NekCheck Pro</span>
      </div>
      <p className="text-muted-foreground">Fysiotherapeut Portal</p>
    </div>

    {/* Login Card */}
    <Card>
      <CardHeader>
        <CardTitle>Inloggen</CardTitle>
        <CardDescription>
          Log in met je fysiotherapeut account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={login}    className="space-y-4">
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
            <Label htmlFor="password">Wachtwoord</Label>
            <Input
              id="password"
              type="password"
              placeholder="•••••��•"
              name="password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Inloggen
          </Button>

          <div className="text-center">
            <a href="/register" className="text-sm text-primary hover:underline">
              Nog geen account? Registreer als fysiotherapeut
            </a>
          </div>

          <div className="text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              Wachtwoord vergeten?
            </a>
          </div>
        </form>
      </CardContent>
    </Card>

    <div className="text-center mt-6 text-sm text-muted-foreground">
      <a href="/" className="text-primary hover:underline">
        ← Terug naar homepage
      </a>
    </div>
  </div>
</div>
}