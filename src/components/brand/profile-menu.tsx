import { CircleUserRound, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export function ProfileMenu() {
  async function logout() {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <details className="group relative">
      <summary className="size-10 list-none cursor-pointer rounded-full border border-primary/60 text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 [&::-webkit-details-marker]:hidden">
        <span className="flex h-full w-full items-center justify-center">
          <CircleUserRound className="h-6 w-6" />
        </span>
      </summary>
      <div className="absolute right-0 z-20 mt-2 min-w-32 rounded-2xl border border-primary/20 bg-card p-2 shadow-sm">
        <form action={logout}>
          <Button type="submit" variant="ghost" className="w-full justify-start text-primary hover:bg-primary/10">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </form>
      </div>
    </details>
  );
}
