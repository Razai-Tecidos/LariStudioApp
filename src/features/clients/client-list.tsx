"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ClientCard } from "@/components/brand/client-card";
import { ConfirmDeleteDialog } from "@/components/brand/confirm-delete-dialog";
import { EmptyState } from "@/components/brand/empty-state";
import { SearchInput } from "@/components/brand/search-input";
import { Button } from "@/components/ui/button";
import type { ClientListItem } from "@/features/clients/mock-data";

type ClientListProps = {
  clients: ClientListItem[];
};

export function ClientList({ clients }: ClientListProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [clientItems, setClientItems] = useState(clients);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    setClientItems(clients);
  }, [clients]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) {
      return clientItems;
    }

    return clientItems.filter((client) => {
      return (
        client.name.toLowerCase().includes(normalized) ||
        client.phone.toLowerCase().includes(normalized)
      );
    });
  }, [clientItems, query]);

  const deleteTarget = deleteTargetId
    ? clientItems.find((client) => client.id === deleteTargetId)
    : null;

  function handleConfirmDelete() {
    if (!deleteTargetId) {
      return;
    }

    setClientItems((prev) => prev.filter((client) => client.id !== deleteTargetId));
    setDeleteTargetId(null);
  }

  function handleOpenClient(id: string) {
    router.push(`/clientes/${id}`);
  }

  return (
    <>
      <div className="motion-stagger space-y-5">
        <SearchInput value={query} onChange={setQuery} />
        <Button
          asChild
          type="button"
          className="h-11 w-full rounded-2xl bg-primary text-base font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/clientes/novo" aria-label="Adicionar cliente">
            Adicionar cliente
          </Link>
        </Button>
        {filtered.length === 0 ? (
          <EmptyState
            title="Nenhuma cliente encontrada"
            description="Ajuste o termo de busca ou crie o primeiro cadastro."
          />
        ) : (
          <div className="motion-stagger space-y-3">
            {filtered.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onEdit={handleOpenClient}
                onDelete={(id) => setDeleteTargetId(id)}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmDeleteDialog
        open={Boolean(deleteTargetId)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTargetId(null);
          }
        }}
        onConfirm={handleConfirmDelete}
        clientName={deleteTarget?.name}
      />
    </>
  );
}
