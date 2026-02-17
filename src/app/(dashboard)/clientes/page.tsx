import { MAIN_HEADER_TITLE_CLASS, PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";
import { ClientList } from "@/features/clients/client-list";
import type { Client } from "@/types/app";

const mockClients: Pick<Client, "id" | "name" | "phone">[] = [
  { id: "1", name: "Vanessa Andrade", phone: "(11) 9 9999-9999" },
  { id: "2", name: "Camila Rocha", phone: "(11) 9 9999-9998" },
  { id: "3", name: "Julia Santos", phone: "(11) 9 9999-9997" },
];

export default function ClientesPage() {
  return (
    <main className="space-y-8">
      <PageHeader
        title="Clientes"
        titleClassName={MAIN_HEADER_TITLE_CLASS}
        actions={<ProfileMenu />}
      />
      <SectionDivider />
      <ClientList clients={mockClients} />
    </main>
  );
}
