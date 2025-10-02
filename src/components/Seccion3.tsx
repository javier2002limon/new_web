// components/Seccion3.tsx
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FaseA from "./FaseA";

gsap.registerPlugin(ScrollTrigger);

export default function Seccion3() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",  // ⬅️ controla cuánto dura el pin (150% del viewport)
        pin: true,
        scrub: true,
        anticipatePin: 1,
        // markers: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="seccion3"
      ref={sectionRef}
      className="relative w-full h-[100vh] bg-gradient-to-br from-fuchsia-700 to-pink-600 text-white overflow-hidden"
    >
      {/* Se queda fijo durante el scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <FaseA />
      </div>
    </section>
  );
}
