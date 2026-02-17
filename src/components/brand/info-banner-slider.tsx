"use client";

import { type PointerEvent, useRef, useState } from "react";
import { InfoBanner } from "@/components/brand/info-banner";
import { cn } from "@/lib/utils";

type InfoBannerSlide = {
  id: string;
  title: string;
  description?: string;
  className?: string;
};

type InfoBannerSliderProps = {
  slides: readonly InfoBannerSlide[];
  className?: string;
};

export function InfoBannerSlider({ slides, className }: InfoBannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);

  function resetDrag() {
    setIsDragging(false);
    setDragOffset(0);
    dragStartXRef.current = null;
    dragPointerIdRef.current = null;
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (slides.length < 2) {
      return;
    }

    dragStartXRef.current = event.clientX;
    dragPointerIdRef.current = event.pointerId;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging || dragStartXRef.current === null) {
      return;
    }

    setDragOffset(event.clientX - dragStartXRef.current);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) {
      return;
    }

    if (dragPointerIdRef.current !== null && event.currentTarget.hasPointerCapture(dragPointerIdRef.current)) {
      event.currentTarget.releasePointerCapture(dragPointerIdRef.current);
    }

    const width = containerRef.current?.offsetWidth ?? 0;
    const threshold = Math.max(36, width * 0.16);

    if (dragOffset <= -threshold && activeIndex < slides.length - 1) {
      setActiveIndex((current) => current + 1);
    } else if (dragOffset >= threshold && activeIndex > 0) {
      setActiveIndex((current) => current - 1);
    }

    resetDrag();
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative overflow-hidden rounded-[1.75rem]", className)}>
      <div
        ref={containerRef}
        className={cn("touch-pan-y select-none", slides.length > 1 && "cursor-grab active:cursor-grabbing")}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div
          className={cn("flex", isDragging ? "transition-none" : "transition-transform duration-300 ease-out")}
          style={{
            transform: `translateX(calc(${-activeIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full">
              <InfoBanner
                title={slide.title}
                description={slide.description}
                centered
                showIcon={false}
                className={cn(
                  "rounded-[1.75rem] border-accent-foreground/5 px-4 py-3.5 pr-10 text-primary-foreground md:px-8 md:py-5",
                  slide.className,
                )}
              />
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 ? (
        <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1">
          {slides.map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ir para slide ${index + 1}`}
                aria-current={isActive ? "true" : "false"}
                className={cn(
                  "h-1.5 rounded-full transition",
                  isActive ? "w-3 bg-primary/90" : "w-1.5 bg-primary/35 hover:bg-primary/55",
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
