import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordForm } from "@/features/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg items-center px-6 py-16">
      <Card className="w-full rounded-3xl border-primary/20">
        <CardHeader>
          <CardTitle className="text-4xl text-primary">Recuperar acesso</CardTitle>
          <CardDescription>Receba um link para redefinir sua senha.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResetPasswordForm />
          <Link href="/login" className="text-sm text-primary underline-offset-2 hover:underline">
            Voltar para login
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
