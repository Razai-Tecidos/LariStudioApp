"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Busque nome ou telefone da cliente",
}: SearchInputProps) {
  return (
    <div className="flex h-12 items-center rounded-2xl border border-primary/18 bg-card px-4 shadow-[0_1px_0_rgba(59,86,77,0.05)]">
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-full border-0 bg-transparent px-0 text-base text-primary placeholder:text-muted-foreground/70 shadow-none focus-visible:ring-2 focus-visible:ring-primary/20"
      />
      <div className="mx-3 h-8 w-px bg-primary/20" />
      <Search className="h-[18px] w-[18px] text-primary/45" />
    </div>
  );
}
