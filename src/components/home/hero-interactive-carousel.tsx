"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play } from "lucide-react";
import type { HeroSlideItem } from "@/features/school/hero-types";

interface HeroInteractiveCarouselProps {
  slides: HeroSlideItem[];
  interval?: number; // seconds
  animation?: "kenburns" | "fade" | "slide";
  showOverlayText?: boolean;
  brightness?: "bright" | "normal" | "cinematic";
}

export function HeroInteractiveCarousel({
  slides,
  interval = 5,
  animation = "kenburns",
  showOverlayText = false,
  brightness = "bright",
}: HeroInteractiveCarouselProps) {
  const activeSlides = slides.filter((s) => s.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = activeSlides.length;

  useEffect(() => {
    if (total <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, Math.max(3, interval) * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, interval, isPaused]);

  if (total === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      {activeSlides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Ken Burns Zoom or Fade */}
            <div
              className={`w-full h-full bg-cover bg-center transition-transform duration-7000 ease-out ${
                animation === "kenburns" && isActive ? "scale-110" : "scale-100"
              }`}
              style={{
                backgroundImage: `url('${slide.imageUrl}')`,
                transitionDuration: `${Math.max(3, interval) * 1000}ms`,
              }}
            />

            {/* Gradient Overlays for contrast & integration with 3D/Text */}
            {brightness === "bright" ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-transparent" />
              </>
            ) : brightness === "normal" ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-slate-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
              </>
            )}

            {/* Optional Slide Content (Title, Subtitle, Button) if enabled */}
            {showOverlayText && (slide.title || slide.subtitle) && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-20 pointer-events-auto">
                <div className="max-w-3xl mx-auto space-y-4">
                  {slide.title && (
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                      {slide.title}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto drop-shadow">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.buttonText && slide.buttonUrl && (
                    <div className="pt-2">
                      <Link
                        href={slide.buttonUrl}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
                      >
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Navigation Controls (Prev/Next buttons) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white/80 hover:text-white border border-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white/80 hover:text-white border border-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Bottom Indicators & Slide Counter */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
          {/* Pause / Play Indicator */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="text-white/60 hover:text-white transition-colors"
            title={isPaused ? "เล่นภาพสไลด์อัตโนมัติ" : "หยุดชั่วคราว"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-7 bg-amber-400 shadow-sm shadow-amber-400/50"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Counter (e.g. 01 / 03) */}
          <span className="text-[11px] font-mono font-medium text-white/60 tracking-wider">
            {String(currentIndex + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
