// components/StepCarousel.tsx
import { useEffect, useRef, useState } from "react";
import StepCard from "./StepCard";

type Step = { icon: string; title: string; description: string };
type Props = { steps: Step[]; className?: string; controlledIndex?: number };

export default function StepCarousel({ steps, className = "", controlledIndex }: Props) {
  const [current, setCurrent] = useState(0);
  const mobRef = useRef<HTMLDivElement>(null);

  // si viene controlado (por GSAP) usamos ese índice como activo
  useEffect(() => {
    if (typeof controlledIndex === "number") setCurrent(controlledIndex);
  }, [controlledIndex]);

  return (
    <div className={`w-full ${className}`}>
      {/* MOBILE: scroll-snap natural */}
      <div className="md:hidden">
        <div ref={mobRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-2 scroll-pl-4">
          {steps.map((s, i) => (
            <div key={i} className="shrink-0 w-[85%] snap-center">
              <StepCard icon={s.icon} title={s.title} description={s.description} active={i === current} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full bg-white/30 transition-all ${i === current ? "w-6 opacity-100" : "w-2 opacity-70"}`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP: pista controlada por GSAP (pin + scrub) */}
      <div className="relative hidden md:block overflow-hidden">
        <div className="cf-track flex gap-8 will-change-transform">
          {steps.map((s, i) => (
            <div key={i} className="cf-slide shrink-0 w-[min(720px,72vw)] mx-auto">
              <StepCard icon={s.icon} title={s.title} description={s.description} active={i === current} />
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full bg-white/30 transition-all ${i === current ? "w-7 opacity-100" : "w-2.5 opacity-70"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
