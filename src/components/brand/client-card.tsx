import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClientListItem } from "@/features/clients/mock-data";

type ClientCardProps = {
  client: ClientListItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  const isInteractive = Boolean(onEdit);

  return (
    <article
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={() => onEdit?.(client.id)}
      onKeyDown={(event) => {
        if (!isInteractive) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onEdit?.(client.id);
        }
      }}
      className="flex items-center justify-between rounded-3xl border border-primary/8 bg-secondary px-5 py-4 shadow-[0_2px_10px_rgba(59,86,77,0.05)] transition hover:border-primary/20 hover:bg-secondary/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
    >
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
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.(client.id);
          }}
          aria-label={`Editar ${client.name}`}
        >
          <Pencil className="h-[18px] w-[18px]" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-primary/75 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.(client.id);
          }}
          aria-label={`Excluir ${client.name}`}
        >
          <Trash2 className="h-[18px] w-[18px]" />
        </Button>
      </div>
    </article>
  );
}
