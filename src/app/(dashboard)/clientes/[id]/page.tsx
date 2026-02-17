import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { MAIN_HEADER_TITLE_CLASS, PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";
import { Button } from "@/components/ui/button";
import { ClientDetailSections } from "@/features/clients/client-detail-sections";
import { getMockClientById } from "@/features/clients/mock-data";

type ClientDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;
  const client = getMockClientById(id);

  if (!client) {
    notFound();
  }

  return (
    <main className="motion-stagger space-y-8">
      <PageHeader
        title="Detalhes"
        titleClassName={MAIN_HEADER_TITLE_CLASS}
        actions={<ProfileMenu />}
      />
      <SectionDivider />

      <div className="motion-stagger space-y-5">
        <Button
          asChild
          variant="ghost"
          className="h-9 rounded-full px-3 text-primary hover:bg-primary/8"
        >
          <Link href="/clientes">
            <ChevronLeft className="h-4 w-4" />
            Voltar para clientes
          </Link>
        </Button>
        <h2 className="font-serif-display text-3xl leading-[1.05] text-primary md:text-4xl">
          {client.firstName} {client.lastName}
        </h2>

        <ClientDetailSections client={client} />
      </div>
    </main>
  );
}
