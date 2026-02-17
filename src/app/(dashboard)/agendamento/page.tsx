import { EmptyState } from "@/components/brand/empty-state";
import { MAIN_HEADER_TITLE_CLASS, PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";

export default function AgendamentoPage() {
  return (
    <main className="space-y-8">
      <PageHeader title="Agendamento" titleClassName={MAIN_HEADER_TITLE_CLASS} actions={<ProfileMenu />} />
      <SectionDivider />
      <EmptyState
        title="Agenda em preparacao"
        description="Em breve voce podera organizar horarios e compromissos por aqui."
      />
    </main>
  );
}
