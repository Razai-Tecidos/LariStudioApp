import { EmptyState } from "@/components/brand/empty-state";
import { MAIN_HEADER_TITLE_CLASS, PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";

export default function CatalogoPage() {
  return (
    <main className="space-y-8">
      <PageHeader title="Catalogo" titleClassName={MAIN_HEADER_TITLE_CLASS} actions={<ProfileMenu />} />
      <SectionDivider />
      <EmptyState
        title="Catalogo em preparacao"
        description="Em breve esta area exibira colecoes, produtos e organizacao do acervo."
      />
    </main>
  );
}
