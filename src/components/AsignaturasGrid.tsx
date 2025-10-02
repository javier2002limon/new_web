
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AsignaturaChip from "./AsignaturaChip";

gsap.registerPlugin(ScrollTrigger);


const SUBJECTS = [
  { emoji: "🗄️", text: "Bases de Datos" },
  { emoji: "💻", text: "Programación" },
  { emoji: "🔖", text: "Lenguajes de marcas" },
  { emoji: "⚙️", text: "Entornos de desarrollo" },
  { emoji: "🔌", text: "Acceso a datos" },
  { emoji: "🖼️", text: "Desarrollo de interfaces" },
  { emoji: "📱", text: "Prog. multimedia y móviles" },
  { emoji: "🧩", text: "Servicios y procesos" },
  { emoji: "🌐", text: "DW Entorno cliente" },
  { emoji: "🖥️", text: "DW Entorno servidor" },
  { emoji: "🚀", text: "Despliegue apps web" },
  { emoji: "🎨", text: "Diseño de interfaces web" },
];

export default function AsignaturasGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chips = gsap.utils.toArray<HTMLElement>(".chip");

      // entrada en oleadas solo al entrar en viewport
      gsap.from(chips, {
        y: 30,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true, // solo una vez
        },
      });

      // parallax suave por fila (desktop)
      const rows = new Map<number, HTMLElement[]>();
      chips.forEach((chip, i) => {
        const row = Math.floor(i / 3);
        if (!rows.has(row)) rows.set(row, []);
        rows.get(row)!.push(chip);
      });

      rows.forEach((rowEls, rowIdx) => {
        gsap.to(rowEls, {
          y: rowIdx % 2 === 0 ? -20 : 20,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);


  return (
    <div ref={gridRef}>
      <div className="hidden md:grid grid-cols-3 gap-4 md:gap-5">
        {SUBJECTS.map((s) => (
          <AsignaturaChip key={s.text} emoji={s.emoji} text={s.text} className="chip justify-center" />
        ))}
      </div>
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {SUBJECTS.map((s) => (
          <AsignaturaChip key={s.text} emoji={s.emoji} text={s.text} className="chip shrink-0 snap-center" />
        ))}
      </div>
    </div>
  );
}
