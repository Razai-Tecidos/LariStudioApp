"use client";

import { useMemo, useState } from "react";
import { ClientCard } from "@/components/brand/client-card";
import { EmptyState } from "@/components/brand/empty-state";
import { SearchInput } from "@/components/brand/search-input";
import type { Client } from "@/types/app";

type ClientListProps = {
  clients: Pick<Client, "id" | "name" | "phone">[];
};

export function ClientList({ clients }: ClientListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) {
      return clients;
    }

    return clients.filter((client) => {
      return (
        client.name.toLowerCase().includes(normalized) ||
        client.phone.toLowerCase().includes(normalized)
      );
    });
  }, [clients, query]);

  return (
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
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  );
}
