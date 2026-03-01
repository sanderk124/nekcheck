"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function generateInviteCode(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createInvite(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");

  const patientName = (formData.get("patientName") as string) || null;
  const validityDays = parseInt((formData.get("validity") as string) || "14", 10);
  const linkId = generateInviteCode(8);

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + validityDays);

  const { error } = await supabase.from("patient_invites").insert({
    link_id: "NK-" + linkId,
    valid_until: validUntil.toISOString(),
    patient_name: patientName || null,
    created_by: user.id,
  });

  if (error) throw new Error(error.message);

  redirect(`/dashboard/invites`);
}

type Invite = {
    id: string;
    link_id: string;
    created_at: string;
    valid_until: string;
    patient_name: string | null;
    used_at: string | null;
  };


 export async function getInvites(): Promise<Invite[]> {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not found");
    }
    const { data, error } = await supabase.from("patient_invites").select("id,link_id, created_at, valid_until, patient_name, used_at").eq("created_by", user.id);
  

    if (error) {
      throw new Error(error.message);
    }
  
    return data as Invite[];

}