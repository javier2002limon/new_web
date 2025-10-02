import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { icon: "📝", title: "Clases dinámicas", text: "Explicaciones claras y ejemplos prácticos, sin paja." },
  { icon: "📄", title: "Materiales propios", text: "Resúmenes, ejercicios resueltos y simulacros." },
  { icon: "🤝", title: "Seguimiento continuo", text: "Dudas entre clases, feedback rápido." },
  { icon: "🎯", title: "Enfoque al examen", text: "Estrategia y práctica para aprobar a la primera." },
];

export default function FaseB() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Título aparece enseguida
      gsap.from(".fase-b-title", {
        y: 30,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=5%",   // 💨 más pronto
          end: "top+=10% top",
          scrub: true,
        },
      });

      // Bloques, uno tras otro
      const items = gsap.utils.toArray<HTMLElement>(".metodologia-item");
      items.forEach((item, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(item, {
          x: fromLeft ? -40 : 40,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${10 + i * 5}% top`,  // ⚡ antes
            end: `top+=${15 + i * 5}% top`,
            scrub: true,
          },
        });
      });

      // CTA aparece pronto también
      gsap.fromTo(
        ctaRef.current,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=40% top",
            end: "top+=50% top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center text-center px-6 md:px-16 overflow-hidden"
    >
      {/* 🔠 TÍTULO */}
      <div className="fase-b-title mt-20 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">⚡ Nuestra metodología</h2>
        <p className="mt-3 text-white/80 text-base md:text-xl">
          Clases prácticas, materiales propios y seguimiento continuo.
        </p>
      </div>

      {/* 🧩 BLOQUES */}
      <div className="mt-12 mb-16 space-y-6 max-w-3xl w-full text-left">
        {ITEMS.map((item) => (
          <div key={item.title} className="metodologia-item flex items-start gap-4">
            <div className="text-3xl md:text-4xl leading-none">{item.icon}</div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
              <p className="mt-1 text-white/80">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 📌 CTA Final */}
      <div
        ref={ctaRef}
        className="opacity-0 mt-10 text-lg md:text-xl font-medium text-white/90"
      >
        ⚡ ¿Quieres probar nuestro método? <br />
        <span className="font-semibold">¡Agenda una clase y descúbrelo!</span>
      </div>
    </div>
  );
}
