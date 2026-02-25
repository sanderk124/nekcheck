import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CheckEmailPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Als er wél een user is en die is al bevestigd → door naar dashboard
  if (user?.email_confirmed_at) {
    redirect("/dashboard");
  }

  // Geen user of nog niet bevestigd: tonen "Check je e-mail" (geen redirect naar /login).
  // Na signUp geeft Supabase vaak nog geen sessie tot de link is geklikt.
  return <div>Check your email</div>;
}