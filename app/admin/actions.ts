"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAuth() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

export async function toggleSlot(id: string, available: boolean) {
  const supabase = await requireAuth();
  await supabase
    .from("availability_slots")
    .update({ available })
    .eq("id", id);
  revalidatePath("/admin/dashboard");
  revalidatePath("/availability");
}

export async function addSlot(dayOfWeek: number, hour: number) {
  const supabase = await requireAuth();
  await supabase
    .from("availability_slots")
    .insert({ day_of_week: dayOfWeek, hour, available: true });
  revalidatePath("/admin/dashboard");
  revalidatePath("/availability");
}

export async function deleteSlot(id: string) {
  const supabase = await requireAuth();
  await supabase.from("availability_slots").delete().eq("id", id);
  revalidatePath("/admin/dashboard");
  revalidatePath("/availability");
}

export async function updateNotificationEmail(email: string) {
  const supabase = await requireAuth();
  await supabase
    .from("settings")
    .update({ value: email, updated_at: new Date().toISOString() })
    .eq("key", "notification_email");
  revalidatePath("/admin/dashboard");
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
