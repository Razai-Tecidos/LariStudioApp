import { EmptyState } from "@/components/brand/empty-state";
import { PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";

export default function LembretesPage() {
  return (
    <main className="space-y-8">
      <PageHeader title="Lembretes" actions={<ProfileMenu />} />
      <SectionDivider />
      <EmptyState
        title="Lembretes em preparacao"
        description="Este espaco sera usado para anotar pendencias e alertas importantes."
      />
    </main>
  );
}
