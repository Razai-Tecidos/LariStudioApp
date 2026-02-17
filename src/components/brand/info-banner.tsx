import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type InfoBannerProps = {
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
  showIcon?: boolean;
};

export function InfoBanner({
  title,
  description,
  className,
  centered = false,
  showIcon = true,
}: InfoBannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-primary/18 bg-transparent px-4 py-3.5 text-primary",
        className,
      )}
    >
      {centered ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/6 blur-xl"
        />
      ) : null}
      <div
        className={cn(
          "relative z-10 flex items-start gap-3",
          centered && "items-center justify-center text-center",
        )}
      >
        {showIcon ? <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /> : null}
        <div className={cn(centered && "mx-auto max-w-[34ch]")}>
          <p
            className={cn(
              "text-base font-semibold tracking-[-0.01em]",
              centered &&
                "min-h-[2.4em] font-semibold text-sm leading-[1.2] md:min-h-[2.3em] md:text-[1.15rem] md:leading-[1.18]",
            )}
          >
            {title}
          </p>
          {description ? (
            <p
              className={cn(
                "text-sm opacity-80",
                centered && "mt-1 font-editorial text-[11px] tracking-[0.02em] md:mt-1.5 md:text-xs",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
