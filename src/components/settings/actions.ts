"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phoneNumber = formData.get("phoneNumber");

  const { data, error } = await supabase.from("profiles").update({
    first_name: firstName as string,
    last_name: lastName as string,
    email: email as string,
    phone_number: phoneNumber as string,
    }).eq("user_id", id as string).select().single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Profile not updated");
  }

  redirect("/dashboard/settings?success=profile_updated");

}