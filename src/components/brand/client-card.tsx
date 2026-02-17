import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Client } from "@/types/app";

type ClientCardProps = {
  client: Pick<Client, "id" | "name" | "phone">;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  return (
    <article className="flex items-center justify-between rounded-3xl border border-primary/8 bg-secondary px-5 py-4 shadow-[0_2px_10px_rgba(59,86,77,0.05)]">
      <div className="min-w-0">
        <h3 className="truncate text-lg font-semibold tracking-[0.01em] text-primary md:text-xl">
          {client.name}
        </h3>
        <p className="mt-1 text-sm text-primary/80 md:text-base">{client.phone}</p>
      </div>
      <div className="ml-3 flex shrink-0 items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-primary/75 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          onClick={() => onEdit?.(client.id)}
          aria-label={`Editar ${client.name}`}
        >
          <Pencil className="h-[18px] w-[18px]" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-primary/75 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          onClick={() => onDelete?.(client.id)}
          aria-label={`Excluir ${client.name}`}
        >
          <Trash2 className="h-[18px] w-[18px]" />
        </Button>
      </div>
    </article>
  );
}
