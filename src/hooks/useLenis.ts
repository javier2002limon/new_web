// useLenis.ts
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}

    ScrollTrigger.defaults({ scroller: document.body as any });

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    (window as any).__lenis = lenis; // ⬅️ guardamos en global para helpers

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", () => ScrollTrigger.update());

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value as number) : (lenis as any).scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: (document.body.style as any).transform ? "transform" : "fixed",
    });

    const resetToTop = () => {
      lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => ScrollTrigger.refresh(true));
      window.scrollTo(0, 0);
    };

    requestAnimationFrame(() => {
      resetToTop();
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => {
      resetToTop();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh(true));
      });
    };
    window.addEventListener("load", onLoad);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    document.fonts?.ready.then(() => ScrollTrigger.refresh(true));

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);
}

// 👉 NUEVO: hook por sección
export function useSnapSection(ref: React.RefObject<HTMLElement | null>)  {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const lenis: any = (window as any).__lenis;
    let snapping = false;

    const smoothTo = () => {
      snapping = true;
      if (lenis?.scrollTo) {
        lenis.scrollTo(el, {
          duration: 0.6,
          offset: 0,
          onComplete: () => (snapping = false),
        });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => (snapping = false), 650);
      }
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => !snapping && smoothTo(),
      onEnterBack: () => !snapping && smoothTo(),
    });

    return () => st.kill();
  }, [ref]);
}
