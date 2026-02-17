import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";
import { MAIN_HEADER_TITLE_CLASS, PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";
import { Button } from "@/components/ui/button";

export default function NovoClientePage() {
  return (
    <main className="space-y-8">
      <PageHeader
        title="Nova cliente"
        titleClassName={MAIN_HEADER_TITLE_CLASS}
        actions={<ProfileMenu />}
      />
      <SectionDivider />
      <div className="space-y-5">
        <Button asChild variant="ghost" className="h-9 rounded-full px-3 text-primary hover:bg-primary/8">
          <Link href="/clientes">
            <ArrowLeft className="h-4 w-4" />
            Voltar para clientes
          </Link>
        </Button>
        <section className="rounded-3xl border border-primary/10 bg-card px-5 py-6 shadow-[0_10px_28px_rgba(59,86,77,0.08)]">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-secondary text-primary">
              <UserPlus className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-primary md:text-xl">Cadastro em preparacao</h2>
              <p className="text-sm leading-relaxed text-primary/75 md:text-base">
                O formulario de cadastro de clientes sera adicionado nesta tela no proximo ciclo.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
