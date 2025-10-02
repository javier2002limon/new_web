// components/Seccion3/FaseA.tsx
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
  { emoji: "🖼️", text: "Interfaces gráficas" },
  { emoji: "📱", text: "Multimedia y móviles" },
  { emoji: "🧩", text: "Servicios y procesos" },

  { emoji: "🌐", text: "Cliente web" },
  { emoji: "🖥️", text: "Servidor web" },
  { emoji: "🚀", text: "Despliegue web" },
  { emoji: "🎨", text: "Diseño web" },
];

export default function FaseA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaContactRef = useRef<HTMLAnchorElement>(null);
  const filaRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 🎯 TÍTULO
      gsap.from(".fase-a-title", {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=5%",
          end: "top+=5% top",
          scrub: true,
        },
      });

      // 🎯 GALERÍA
      gsap.fromTo(
        galleryRef.current,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=10% top",
            end: "top+=15% top",
            scrub: true,
          },
        }
      );

      // 🎯 FILAS horizontales
      filaRefs.forEach((ref, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        if (ref.current) {
          gsap.to(ref.current, {
            xPercent: direction * 50,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top+=5% top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // 🎯 CTA normal
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

      // 🎯 CTA contacto WhatsApp
      gsap.fromTo(
        ctaContactRef.current,
        { scale: 0.9, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=55% top",
            end: "top+=65% top",
            scrub: true,
          },
          onComplete: () => {
            gsap.to(ctaContactRef.current, {
              scale: 1.05,
              repeat: -1,
              yoyo: true,
              duration: 1.2,
              ease: "easeInOut",
            });
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filas = Array.from({ length: Math.ceil(SUBJECTS.length / 4) }, (_, i) =>
    SUBJECTS.slice(i * 4, i * 4 + 4)
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center text-center px-6 md:px-16 overflow-hidden"
    >
      {/* 🔠 TÍTULO */}
      <div className="fase-a-title mt-20 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">📚 Asignaturas que cubrimos</h2>
        <p className="mt-3 text-white/80 text-base md:text-xl">
          Todo el temario oficial, explicado claro y sin dramas.
        </p>
      </div>

      {/* 🧩 GALERÍA */}
      <div
        ref={galleryRef}
        className="fase-a-gallery mt-12 mb-16 space-y-8 w-full max-w-5xl opacity-0"
      >
        {filas.map((fila, i) => (
          <div
            key={i}
            ref={filaRefs[i]}
            className="fila flex justify-center gap-4 flex-nowrap"
          >
            {fila.map((s) => (
              <AsignaturaChip
                key={s.text}
                emoji={s.emoji}
                text={s.text}
                className="chip whitespace-nowrap"
              />
            ))}
          </div>
        ))}
      </div>

      {/* 📌 CTA Final normal */}
      <div
        ref={ctaRef}
        className="opacity-0 mt-10 text-lg md:text-xl font-medium text-white/90"
      >
        📌 ¿Buscas otras asignaturas o ciclos? <br />
        <span className="font-semibold">¡Pregúntanos sin compromiso!</span>
      </div>

      {/* 📞 CTA WhatsApp destacado */}
      <a
        ref={ctaContactRef}
        href="https://wa.me/34722532100"
        target="_blank"
        rel="noreferrer"
        className="opacity-0 mt-12 px-6 py-4 rounded-xl bg-white text-fuchsia-700 font-bold shadow-xl hover:shadow-2xl transition-transform"
      >
        Contáctanos: 722 532 100
      </a>
    </div>
  );
}
