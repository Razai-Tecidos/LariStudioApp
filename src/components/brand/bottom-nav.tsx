"use client";

import {
  BookOpen,
  CalendarDays,
  Ellipsis,
  HandCoins,
  Home,
  Settings2,
  StickyNote,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type BottomNavItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  isCenter?: boolean;
  kind?: "link" | "menu";
};

export type BottomNavMoreOption = {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

const dashboardItems: BottomNavItem[] = [
  { key: "agenda", label: "Agenda", href: "/agendamento", icon: CalendarDays, kind: "link" },
  { key: "clientes", label: "Clientes", href: "/clientes", icon: Users, kind: "link" },
  {
    key: "inicio",
    label: "Inicio",
    href: "/",
    icon: Home,
    isCenter: true,
    kind: "link",
  },
  { key: "catalogo", label: "Catalogo", href: "/catalogo", icon: BookOpen, kind: "link" },
  { key: "mais", label: "Mais", icon: Ellipsis, kind: "menu" },
];

const moreOptions: BottomNavMoreOption[] = [
  { key: "financeiro", label: "Financeiro", href: "/financeiro", icon: HandCoins },
  { key: "ajustes", label: "Ajustes", href: "/ajustes", icon: Settings2 },
  { key: "lembretes", label: "Lembretes", href: "/lembretes", icon: StickyNote },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isMoreActive(pathname: string) {
  return moreOptions.some((option) => isActivePath(pathname, option.href));
}

type BottomNavProps = {
  items?: BottomNavItem[];
  centerItemKey?: string;
};

export function BottomNav({
  items = dashboardItems,
  centerItemKey = "inicio",
}: BottomNavProps) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!moreRef.current) {
        return;
      }

      if (!moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMoreOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const moreIsActive = isMoreActive(pathname);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
      <div className="mx-auto w-full max-w-3xl px-4 md:px-10">
        <nav
          aria-label="Navegacao principal"
          className="rounded-[2rem] border border-border/80 bg-card/95 px-3 py-3 shadow-[0_-8px_30px_rgba(59,86,77,0.12)] backdrop-blur"
        >
          <ul className="grid grid-cols-5 items-end gap-1">
            {items.map((item) => {
              const Icon = item.icon;
              const center = item.isCenter || item.key === centerItemKey;
              const isMenu = item.kind === "menu";
              const linkActive = item.href ? isActivePath(pathname, item.href) : false;
              const active = isMenu ? moreIsActive : linkActive;

              if (center && item.href) {
                return (
                  <li key={item.key} className="flex flex-col items-center">
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        "-mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(59,86,77,0.35)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active && "ring-2 ring-ring",
                      )}
                    >
                      <Icon className="h-7 w-7" />
                    </Link>
                    <span className="mt-1 text-[11px] font-medium text-primary">{item.label}</span>
                  </li>
                );
              }

              if (isMenu) {
                return (
                  <li key={item.key} className="relative flex flex-col items-center" ref={moreRef}>
                    {moreOpen ? (
                      <div className="absolute right-0 bottom-14 z-40 w-44 rounded-2xl border border-primary/20 bg-card p-2 shadow-[0_8px_24px_rgba(59,86,77,0.18)]">
                        {moreOptions.map((option) => {
                          const OptionIcon = option.icon;
                          const optionActive = isActivePath(pathname, option.href);
                          return (
                            <Link
                              key={option.key}
                              href={option.href}
                              onClick={() => setMoreOpen(false)}
                              className={cn(
                                "mb-1 flex items-center rounded-xl px-3 py-2 text-sm text-primary transition last:mb-0 hover:bg-primary/10",
                                optionActive && "bg-primary/12 font-medium",
                              )}
                            >
                              <OptionIcon className="mr-2 h-4 w-4" />
                              {option.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      aria-label={item.label}
                      aria-expanded={moreOpen}
                      onClick={() => setMoreOpen((current) => !current)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        (active || moreOpen) && "bg-primary/12 text-primary",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                    <span
                      className={cn(
                        "mt-1 text-[11px] font-medium text-muted-foreground",
                        (active || moreOpen) && "text-primary",
                      )}
                    >
                      {item.label}
                    </span>
                  </li>
                );
              }

              if (!item.href) {
                return null;
              }

              return (
                <li key={item.key} className="flex flex-col items-center">
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active && "bg-primary/12 text-primary",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                  <span
                    className={cn(
                      "mt-1 text-[11px] font-medium text-muted-foreground",
                      active && "text-primary",
                    )}
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
