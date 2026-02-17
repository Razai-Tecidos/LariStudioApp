import Link from "next/link";
import { Plus } from "lucide-react";
import { MAIN_HEADER_TITLE_CLASS, PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";
import { Button } from "@/components/ui/button";
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
        actions={
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-full border-primary/20 bg-card px-4 text-primary shadow-[0_6px_18px_rgba(59,86,77,0.1)] hover:bg-secondary"
            >
              <Link href="/clientes/novo" aria-label="Adicionar cliente">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Adicionar cliente</span>
                <span className="sm:hidden">Adicionar</span>
              </Link>
            </Button>
            <ProfileMenu />
          </div>
        }
      />
      <SectionDivider />
      <ClientList clients={mockClients} />
    </main>
  );
}
