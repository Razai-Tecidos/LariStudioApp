import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const MAIN_HEADER_TITLE_CLASS = "text-4xl leading-[1.05] md:text-5xl";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
  rowClassName?: string;
  titleClassName?: string;
};

export function PageHeader({
  title,
  subtitle,
  actions,
  className,
  rowClassName,
  titleClassName,
}: PageHeaderProps) {
  return (
    <header className={cn("space-y-3", className)}>
      <div className={cn("flex items-center justify-between gap-4", rowClassName)}>
        <h1 className={cn("font-serif-display text-5xl text-primary md:text-6xl", titleClassName)}>
          {title}
        </h1>
        {actions}
      </div>
      {subtitle ? (
        <p className="font-editorial text-sm text-muted-foreground md:text-base">{subtitle}</p>
      ) : null}
    </header>
  );
}
