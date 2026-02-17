import { InfoBanner } from "@/components/brand/info-banner";
import { MAIN_HEADER_TITLE_CLASS, PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGreetingForTimeZone } from "@/lib/greeting";

export default function HomePage() {
  const greeting = getGreetingForTimeZone("America/Sao_Paulo");

  return (
    <main className="space-y-8">
      <PageHeader
        title={`${greeting}, Lari!`}
        titleClassName={MAIN_HEADER_TITLE_CLASS}
        rowClassName="items-center"
        actions={<ProfileMenu />}
      />
      <InfoBanner
        title="Tudo fez formoso no seu devido tempo"
        description="Eclesiastes 3:11"
        centered
        showIcon={false}
        className="mx-auto max-w-[720px] rounded-[2.25rem] border-accent-foreground/5 px-8 py-8 text-primary-foreground md:px-12 md:py-10"
      />
      <SectionDivider />
      <Card className="rounded-3xl border-primary/20 bg-card/85 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-primary">Proxima cliente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-primary">
          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <p>
              <span className="block text-muted-foreground">Nome</span>
              Vanessa Andrade
            </p>
            <p>
              <span className="block text-muted-foreground">Telefone</span>
              (11) 9 9999-9999
            </p>
            <p>
              <span className="block text-muted-foreground">Idade</span>
              34 anos
            </p>
            <p>
              <span className="block text-muted-foreground">Servico</span>
              Ajuste e acabamento de vestido
            </p>
          </div>
          <Button className="h-11 rounded-2xl bg-primary px-6 text-primary-foreground hover:bg-primary/90">
            Iniciar atendimento
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
