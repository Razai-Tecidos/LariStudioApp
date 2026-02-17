import Link from "next/link";
import { PageHeader } from "@/components/brand/page-header";
import { SectionDivider } from "@/components/brand/section-divider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-10">
        <PageHeader
          title="Lari Machado Studio"
        />
        <SectionDivider />
        <Card className="w-full rounded-3xl border-primary/20 bg-card/90 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl text-primary">Entrar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <LoginForm />
            <Link
              href="/reset-password"
              className="text-sm text-primary/90 underline-offset-2 hover:underline"
            >
              Esqueci minha senha
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
