"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function register(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");
  const acceptTerms = formData.get("acceptTerms");
  const acceptPrivacy = formData.get("acceptPrivacy");

  if (!acceptTerms || !acceptPrivacy) {
    redirect("/register?error=terms");
  }

  if (!password || password !== passwordConfirm) {
    redirect("/register?error=password_mismatch");
  }

  const { data, error } = await supabase.auth.signUp({
    email: email as string,
    password: password as string,
  });

  if (error) {
    throw new Error(error.message);
  }
  
  if (!data.user) {
    redirect("/register?error=nouser");
  }

  // Admin client bypasses RLS – nodig want sessie staat nog niet in cookies na signUp
  const admin = createAdminClient();
  const { error: profileError } = await admin.from("profiles").insert({
    first_name: firstName as string,
    last_name: lastName as string,
    user_id: data.user.id,
  });

  if (profileError) {
    throw new Error(profileError.message);
  }

  redirect("/check-email");
}   


export async function login(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

  if (error) {
    const msg = error.message?.toLowerCase() ?? "";
    if (msg.includes("email not confirmed") || msg.includes("not confirmed") || error.code === "email_not_confirmed") {
      redirect("/check-email");
    }
    throw new Error(error.message);
  }

  if (!data.user) {
    redirect("/login?error=nouser");
  }

  if (!data.user.email_confirmed_at) {
    redirect("/check-email");
  }

  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message);
  }
  redirect("/login");
}

