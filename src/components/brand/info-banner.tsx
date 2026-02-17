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
        "rounded-3xl border border-accent-foreground/10 bg-accent px-5 py-4 text-accent-foreground",
        className,
      )}
    >
      <div className={cn("flex items-start gap-3", centered && "justify-center text-center")}>
        {showIcon ? <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /> : null}
        <div>
          <p
            className={cn(
              "text-base font-semibold",
              centered && "font-semibold text-base leading-[1.25] md:text-2xl md:leading-[1.2]",
            )}
          >
            {title}
          </p>
          {description ? (
            <p className={cn("text-sm opacity-80", centered && "mt-2 text-base md:text-lg")}>
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
