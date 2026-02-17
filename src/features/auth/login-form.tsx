"use client";

import { useState } from "react";
import { LoaderCircle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { signInSchema } from "@/lib/validations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    const payload = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!payload.success) {
      setError(payload.error.issues[0]?.message ?? "Dados invalidos.");
      return;
    }

    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword(payload.data);
    setLoading(false);

    if (signInError) {
      setError("Nao foi possivel entrar.");
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-7">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base text-primary">
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          className="h-12 rounded-2xl border-primary/20 bg-background px-4 text-base focus-visible:ring-primary/30"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-base text-primary">
          Senha
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="h-12 rounded-2xl border-primary/20 bg-background px-4 text-base focus-visible:ring-primary/30"
          required
        />
      </div>
      {error ? (
        <Alert className="rounded-2xl border-accent-foreground/15 bg-accent text-accent-foreground">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <Button
        type="submit"
        className="h-12 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={loading}
      >
        {loading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogIn className="mr-2 h-4 w-4" />
        )}
        Entrar
      </Button>
    </form>
  );
}
