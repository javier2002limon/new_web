import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FaseB from "./FaseB";

gsap.registerPlugin(ScrollTrigger);

export default function Seccion4() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",   // ⬅️ controla la duración del pin
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
      id="seccion4"
      ref={sectionRef}
      className="relative w-full h-[100vh] bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* OJO: no absolute, dejamos que crezca con su contenido */}
        <FaseB />
      </div>
    </section>
  );
}
