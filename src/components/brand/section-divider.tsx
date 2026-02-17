import { cn } from "@/lib/utils";

type SectionDividerProps = {
  className?: string;
};

export function SectionDivider({ className }: SectionDividerProps) {
  return <div className={cn("h-px w-full bg-primary/45", className)} />;
}
