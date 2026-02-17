import { EmptyState } from "@/components/brand/empty-state";
import { PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";

export default function AjustesPage() {
  return (
    <main className="space-y-8">
      <PageHeader title="Ajustes" actions={<ProfileMenu />} />
      <SectionDivider />
      <EmptyState
        title="Ajustes em preparacao"
        description="Aqui voce podera configurar preferncias de conta, estilo e operacao."
      />
    </main>
  );
}
