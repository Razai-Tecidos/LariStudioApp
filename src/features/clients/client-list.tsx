"use client";

import { useEffect, useMemo, useState } from "react";
import { ClientCard } from "@/components/brand/client-card";
import { ConfirmDeleteDialog } from "@/components/brand/confirm-delete-dialog";
import { EmptyState } from "@/components/brand/empty-state";
import { SearchInput } from "@/components/brand/search-input";
import type { Client } from "@/types/app";

type ClientListProps = {
  clients: Pick<Client, "id" | "name" | "phone">[];
};

export function ClientList({ clients }: ClientListProps) {
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

  return (
    <>
      <div className="space-y-5">
        <SearchInput value={query} onChange={setQuery} />
        {filtered.length === 0 ? (
          <EmptyState
            title="Nenhuma cliente encontrada"
            description="Ajuste o termo de busca ou crie o primeiro cadastro."
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
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
