import { EmptyState } from "@/components/brand/empty-state";
import { PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";

export default function FinanceiroPage() {
  return (
    <main className="space-y-8">
      <PageHeader title="Financeiro" actions={<ProfileMenu />} />
      <SectionDivider />
      <EmptyState
        title="Financeiro em preparacao"
        description="Em breve esta area exibira fluxo de caixa, entradas e saidas."
      />
    </main>
  );
}
