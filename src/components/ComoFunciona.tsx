import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepCard from "./StepCard";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { icon: "📝", title: "Evaluación inicial", description: "Charla corta + mini test para situarnos." },
  { icon: "📅", title: "Plan a medida", description: "Calendario y materiales adaptados a ti." },
  { icon: "🎥", title: "Clases online", description: "Sesiones prácticas, grabadas y con recursos." },
  { icon: "🤝", title: "Seguimiento", description: "Dudas entre clases y simulacros de examen." },
];

export default function ComoFunciona() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current!;
    const trackEl   = trackRef.current!;
    const ctaEl     = ctaRef.current!;
    let snapping = false;

    const smoothTo = (target: Element) => {
      const lenis: any = (window as any).__lenis;
      snapping = true;
      if (lenis?.scrollTo) {
        lenis.scrollTo(target, { duration: 0.6, offset: 0, onComplete: () => (snapping = false) });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => (snapping = false), 650);
      }
    };

    let stSnap: ScrollTrigger | null = null;
    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      // 1) Snap a estado inicial (cuando la sección es >50-60% visible, encaja su top al viewport)
      stSnap = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => !snapping && smoothTo(sectionEl),
        onEnterBack: () => !snapping && smoothTo(sectionEl),
      });

      // 2) Pin + scrub de TODA LA SECCIÓN: el top queda fijo y el título no se tapa
      const slides = STEPS.length;

      // CTA oculto al inicio
      gsap.set(ctaEl, { autoAlpha: 0, y: 10 });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          pin: sectionEl,                // ⬅️ pin a toda la sección (top queda fijo)
          start: "top top",              // al tocar el borde superior
          end: () => "+=" + (window.innerHeight * (slides - 1)),
          scrub: 0.7,
          snap: {
            snapTo: (v) => {
              const seg = slides - 1;
              return Math.round(v * seg) / seg;
            },
            duration: 0.35,
            ease: "power1.inOut",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const seg = slides - 1;
            const idx = Math.round(self.progress * seg);
            setActive(idx);
          },
          // markers: true,
        },
      });

      // — mover la pista horizontal (una pantalla por slide)
      tl.to(trackEl, { xPercent: -100 * (slides - 1), ease: "none" }, 0);

      // — mostrar CTA al comienzo del recorrido
      tl.to(ctaEl, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power1.out" }, 0.05);

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, sectionRef);

    return () => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
      stSnap?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="relative min-h-screen text-white bg-gradient-to-br from-violet-700 to-fuchsia-600 overflow-hidden"
    >
      {/* encabezado */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 pt-10 md:pt-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"
        >
          Cómo funciona
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto"
        >
          Cuatro pasos simples para ponerte al día sin dramas.
        </motion.p>
      </div>

      {/* Galería (un poco más arriba que la mitad) */}
      <div
        className="
          relative z-10
          mt-6 md:mt-8
          -translate-y-4 md:-translate-y-8
          h-[58vh] md:h-[60vh]
          flex items-center
        "
      >
        <div className="w-full overflow-hidden">
          <div ref={trackRef} className="flex h-full">
            {STEPS.map((s, i) => (
              <div key={s.title} className="basis-full shrink-0 flex items-center justify-center px-4">
                <StepCard icon={s.icon} title={s.title} description={s.description} active={i === active} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* dots */}
      <div className="relative z-10 -mt-2 md:-mt-1 flex items-center justify-center gap-2">
        {STEPS.map((_, i) => (
          <motion.span
            key={i}
            className="h-1.5 rounded-full bg-white/30"
            animate={{ width: i === active ? 24 : 8, opacity: i === active ? 1 : 0.6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* CTA — ahora aparece cuando empieza a deslizar la galería */}
      <div className="relative z-10 mt-8 md:mt-10 pb-12 flex justify-center">
        <motion.a
          ref={ctaRef}
          href="https://wa.me/34722532100"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="px-8 py-4 rounded-full font-semibold text-lg
                     bg-gradient-to-r from-white to-white/90 text-fuchsia-700 shadow-lg hover:shadow-xl"
        >
          📲 Reserva tu primera sesión gratis
        </motion.a>
      </div>

      {/* glow sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.12),transparent_70%)]" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/70 flex justify-center">
          <motion.span
            animate={{ y: [2, 14, 2] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 mt-2 rounded-full bg-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
