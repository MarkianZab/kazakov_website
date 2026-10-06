"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getServiceClient } from "@/lib/supabase";
import { getServerPostHog } from "@/lib/posthog";
import { isAdminEmail } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAuth() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) throw new Error("Unauthorized");
  return supabase;
}

export async function addBookableSlot(date: string, hour: number) {
  await requireAuth();
  const { error } = await getServiceClient()
    .from("bookable_slots")
    .insert({ slot_date: date, slot_hour: hour, booked: false });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePath("/[lang]/booking", "page");
}

export async function deleteBookableSlot(id: string) {
  await requireAuth();
  const { error } = await getServiceClient()
    .from("bookable_slots")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePath("/[lang]/booking", "page");
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
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.auth.signOut();

  if (user?.email) {
    const posthog = getServerPostHog();
    posthog.capture({
      distinctId: user.email,
      event: "admin_signed_out",
    });
    await posthog.shutdown();
  }

  redirect("/admin/login");
}
