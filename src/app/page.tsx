import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Users,
  BarChart3,
  ClipboardList,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function Landing() {

  const features = [
    {
      icon: Users,
      title: "Patiëntenbeheer",
      description:
        "Beheer je patiënten met uitnodigingscodes en volg hun dagelijkse check-ins",
    },
    {
      icon: ClipboardList,
      title: "Dagelijkse Check-ins",
      description:
        "Patiënten vullen dagelijks hun pijnscore en mobiliteit in via de mobiele app",
    },
    {
      icon: BarChart3,
      title: "Voortgang Tracking",
      description:
        "Bekijk trends in pijnscores en compliance over tijd met grafieken",
    },
    {
      icon: Calendar,
      title: "Compliance Monitoring",
      description:
        "Monitor welke patiënten hun dagelijkse check-in gedaan hebben",
    },
  ];

  async function gaNaarRegister() {
    "use server";
    redirect("/register");
  }

  async function gaNaarLogin() {
    "use server";
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <span className="font-bold text-white text-lg">
                NK
              </span>
            </div>
            <span className="text-xl font-bold">
              NekCheck Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <form action={gaNaarRegister}>
          <Button type="submit">
            Account aanmaken
          </Button>
        </form>
      <form action={gaNaarLogin}>
        <Button type="submit" variant="outline">
          Inloggen
        </Button>
      </form>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
            Dagelijkse check-ins voor nek- en schouderklachten
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Monitor je patiënten tussen afspraken met dagelijkse
            pijnscore tracking en compliance monitoring.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <form action={gaNaarRegister}>
              <Button type="submit">
                Account aanmaken
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
            <form action={gaNaarLogin}>
              <Button type="submit" variant="outline">
                Inloggen
                </Button>
            </form>
          </div>

          <p className="text-sm text-muted-foreground">
            Voor fysiotherapeuten • Gratis te gebruiken
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Wat doet NekCheck Pro?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Een eenvoudig platform voor dagelijkse patiënt
            monitoring
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Hoe werkt het?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Registreer je praktijk
                  </h3>
                  <p className="text-muted-foreground">
                    Maak een gratis account aan voor je
                    fysiotherapie praktijk
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Nodig patiënten uit
                  </h3>
                  <p className="text-muted-foreground">
                    Genereer uitnodigingscodes en deel deze met
                    je patiënten
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Patiënten doen dagelijkse check-in
                  </h3>
                  <p className="text-muted-foreground">
                    Patiënten vullen via de mobiele app hun
                    pijnscore en mobiliteit in
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Monitor voortgang
                  </h3>
                  <p className="text-muted-foreground">
                    Bekijk trends, compliance en voortgang in je
                    dashboard
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <form action={gaNaarRegister}>
                <Button type="submit">
                  Begin nu
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="font-bold text-white text-sm">
                    NK
                  </span>
                </div>
                <span className="font-bold">NekCheck Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Dagelijkse check-ins voor nek- en
                schouderklachten
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentatie
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Juridisch</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Voorwaarden
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    AVG
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              &copy; 2026 NekCheck Pro. Alle rechten
              voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}