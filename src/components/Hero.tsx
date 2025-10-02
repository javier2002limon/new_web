import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroChips from "./HeroChips";

gsap.registerPlugin(ScrollTrigger);

// ...
const chips = [
  { emoji: "🗄️", text: "Bases de Datos" },                    // 0484
  { emoji: "💻", text: "Programación" },                       // 0485
  { emoji: "🔖", text: "Lenguajes de marcas" },                // 0373
  { emoji: "⚙️", text: "Entornos de desarrollo" },             // 0487
  { emoji: "🔌", text: "Acceso a datos" },                     // 0486
  { emoji: "🖼️", text: "Desarrollo de interfaces" },          // 0488
  { emoji: "📱", text: "Prog. multimedia y móviles" },         // 0489
  { emoji: "🧩", text: "Servicios y procesos" },               // 0490
  { emoji: "🌐", text: "DW Entorno cliente" },                 // 0612
  { emoji: "🖥️", text: "DW Entorno servidor" },               // 0613
  { emoji: "🚀", text: "Despliegue apps web" },                // 0614
  { emoji: "🎨", text: "Diseño de interfaces web" },           // 0615
];
// ...


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top +=1",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax fondo
      if (bgRef.current) {
        tl.to(bgRef.current, { y: 60, ease: "none" }, 0);
      }

      // H1 compacta y sube ligeramente
      tl.to(".hero-title", { y: -40, scale: 0.96, letterSpacing: "-0.02em" }, 0);

      // Subtítulo, chips y CTAs se elevan y se desvanecen
      tl.to(".hero-sub", { y: -30, autoAlpha: 0 }, 0.05);
      tl.to(".hero-chips", { y: -30, autoAlpha: 0 }, 0.05);
      tl.to(".hero-ctas", { y: -20, autoAlpha: 0 }, 0.08);

      // Indicador scroll desaparece pronto
      tl.to(".scroll-cue", { autoAlpha: 0 }, 0);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={sectionRef}
      className="relative h-screen overflow-hidden text-white"
      id="home"
      aria-label="Sección de inicio"
    >
      {/* Fondo con degradado A3 */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center opacity-80 will-change-transform"
        style={{ backgroundImage: "url('/bg-a3.jpg')" }}
        aria-hidden
      />
      {/* Vignette para contraste */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"
        aria-hidden
      />

      {/* Contenido */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-16">
          {/* Título */}
          <motion.h1
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-title text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            DAM & DAW<br />SIN DRAMAS
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
            className="hero-sub mt-6 text-lg md:text-2xl text-white/90"
          >
            100% online • Flexibilidad total <br /> Clases particulares y en grupo
          </motion.p>
          

          {/* Burbujas informativas (componente nuevo) */}
          <HeroChips items={chips} />

          {/* CTAs */}
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            className="hero-ctas mt-9 flex flex-wrap gap-4"
          >
            <a
              href="https://wa.me/34722532100"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:translate-y-[0px] transition will-change-transform"
            >
              Hablar por WhatsApp
            </a>
            <a
              href="#como-funciona"
              className="px-6 py-3 rounded-xl border border-white/60 text-white font-semibold hover:bg-white/10 transition"
            >
              Ver cómo funciona
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
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
    </header>
  );
}
