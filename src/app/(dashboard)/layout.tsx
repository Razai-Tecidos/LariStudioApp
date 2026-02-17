import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { BottomNav } from "@/components/brand/bottom-nav";
import { getServerEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const ownerEmail = getServerEnv().AUTHORIZED_OWNER_EMAIL.toLowerCase();
  if (!user.email || user.email.toLowerCase() !== ownerEmail) {
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto min-h-screen w-full max-w-3xl px-6 pt-8 pb-[calc(8.75rem+env(safe-area-inset-bottom))] md:px-10 md:pb-[calc(9.5rem+env(safe-area-inset-bottom))]">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
