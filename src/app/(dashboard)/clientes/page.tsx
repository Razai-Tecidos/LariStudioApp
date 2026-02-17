import { MAIN_HEADER_TITLE_CLASS, PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";
import { ClientList } from "@/features/clients/client-list";
import { mockClientList } from "@/features/clients/mock-data";

export default function ClientesPage() {
  return (
    <main className="motion-stagger space-y-8">
      <PageHeader
        title="Clientes"
        titleClassName={MAIN_HEADER_TITLE_CLASS}
        actions={<ProfileMenu />}
      />
      <SectionDivider />
      <ClientList clients={mockClientList} />
    </main>
  );
}
