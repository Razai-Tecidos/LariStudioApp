import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="rounded-3xl border border-dashed border-primary/30 bg-card px-6 py-10 text-center">
      <Inbox className="mx-auto mb-3 h-10 w-10 text-primary/60" />
      <h3 className="text-2xl text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </section>
  );
}
