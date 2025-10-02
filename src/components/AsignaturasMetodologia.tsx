import { useLayoutEffect, useRef } from "react";
import SectionTitle from "./SectionTitle";
import AsignaturasGrid from "./AsignaturasGrid";
import MetodologiaList from "./MetodologiaList";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AsignaturasMetodologia() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null); // contiene ambas pantallas

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = 2; // A y B

      gsap.to(slideRef.current, {
        yPercent: -100 * (slides - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * (slides - 1),
          scrub: true,
          pin: true,
          snap: {
            snapTo: (value) => {
              const seg = slides - 1;
              return Math.round(value * seg) / seg;
            },
            duration: 0.3,
            ease: "power1.inOut",
          },
          // markers: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="asignaturas-metodologia"
      ref={sectionRef}
      className="relative text-white bg-gradient-to-br from-fuchsia-700 to-pink-600"
    >
      <div ref={slideRef} className="will-change-transform">
        {/* Pantalla A */}
        <div className="min-h-screen flex items-center">
          <div className="container mx-auto px-6 md:px-16 w-full">
            <SectionTitle
              title="📚 Asignaturas que cubrimos"
              subtitle="Todo el temario oficial, explicado claro y sin dramas."
            />
            <AsignaturasGrid />
          </div>
        </div>

        {/* Pantalla B */}
        <div className="min-h-screen flex items-center">
          <div className="container mx-auto px-6 md:px-16 w-full">
            <SectionTitle
              title="⚡ Nuestra metodología"
              subtitle="Clases prácticas, materiales propios y seguimiento continuo."
            />
            <MetodologiaList />
          </div>
        </div>
      </div>
    </section>
  );
}
