// components/HeroChips.tsx
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChipCard from "./ChipCard";
gsap.registerPlugin(ScrollTrigger);

type Item = { emoji: string; text: string };
type Props = { items: Item[] };

export default function HeroChips({ items }: Props) {
    const wrapRef = useRef<HTMLDivElement>(null);

    // 3 filas exactas (4 chips por fila)
    const rows: Item[][] = [items.slice(0, 4), items.slice(4, 8), items.slice(8, 12)];

    // refs a cada pista (el <div> que se desplaza)
    const trackRefs = useRef<HTMLDivElement[]>([]);
    trackRefs.current = [];

    // timelines del marquee (para pausar/reanudar)
    const marqueeTLs = useRef<gsap.core.Timeline[]>([]);

    const setTrackRef = (el: HTMLDivElement | null, idx: number) => {
        if (el) trackRefs.current[idx] = el;
    };

    useLayoutEffect(() => {
        let pauseAll: () => void;
        let resumeAll: () => void;
        let rebuildMarquee: () => void;

        const ctx = gsap.context(() => {
            const rowWraps = gsap.utils.toArray<HTMLElement>(".row-wrap");

            // ENTRADA por fila (1 y 3 desde izq, 2 desde dcha)
            rowWraps.forEach((rowEl, i) => {
                gsap.from(rowEl, {
                    x: i === 1 ? 60 : -60,
                    autoAlpha: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: i * 0.05,
                });
            });

            // Función que (re)construye los marquees con medidas actualizadas
            rebuildMarquee = () => {
                // limpia anteriores
                marqueeTLs.current.forEach((t) => t.kill());
                marqueeTLs.current = [];

                trackRefs.current.forEach((track, i) => {
                    // Duplicamos contenido para loop perfecto
                    // (ya viene duplicado en el JSX, aquí solo medimos)
                    const half = track.scrollWidth / 2;
                    const speed = 40; // px/s
                    const dur = Math.max(half / speed, 8);

                    const goesRight = i !== 1; // filas 0 y 2 (1 y 3 visuales) → derecha; fila 1 → izquierda

                    // Si va a la derecha: empezamos en -half y animamos hacia 0
                    // Si va a la izquierda: de 0 a -half
                    const startX = goesRight ? -half : 0;
                    const endX = goesRight ? 0 : -half;

                    gsap.set(track, { x: startX });
                    const tl = gsap.timeline({ repeat: -1, paused: false });
                    tl.to(track, { x: endX, ease: "none", duration: dur }).set(track, { x: startX });

                    marqueeTLs.current.push(tl);
                });
            };

            rebuildMarquee();

            // Pausar durante scroll y reanudar al terminar
            pauseAll = () => marqueeTLs.current.forEach((t) => t.pause());
            resumeAll = () => marqueeTLs.current.forEach((t) => t.resume());
            ScrollTrigger.addEventListener("scrollStart", pauseAll);
            ScrollTrigger.addEventListener("scrollEnd", resumeAll);

            // SALIDA en scroll (1 y 3 → derecha, 2 → izquierda) y más tarde
            // --- SALIDA en scroll (1 y 3 → derecha, 2 → izquierda) animando el CONTENEDOR EXTERIOR
            // ...
            // ...
            const outers = gsap.utils.toArray<HTMLElement>(".row-outer");
            outers.forEach((outer, i) => {
                const toRight = i !== 1;
                gsap.set(outer, { autoAlpha: 1, x: 0 }); // ⬅️ aseguramos visibilidad inicial
                gsap.to(outer, {
                    x: toRight ? 160 : -160,
                    autoAlpha: 0,
                    ease: "power2.out",
                    overwrite: "auto",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: wrapRef.current,
                        scroller: document.body,
                        start: "top top+=1",   // solo cuando realmente empieces a mover
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });

            // ...

            // ...


            // Recalcular al refrescar/resize
            ScrollTrigger.addEventListener("refreshInit", rebuildMarquee);
        }, wrapRef);

        return () => {
            // limpieza correcta de listeners
            if (pauseAll) ScrollTrigger.removeEventListener("scrollStart", pauseAll);
            if (resumeAll) ScrollTrigger.removeEventListener("scrollEnd", resumeAll);
            if (rebuildMarquee) ScrollTrigger.removeEventListener("refreshInit", rebuildMarquee);
            marqueeTLs.current.forEach((t) => t.kill());
            ctx.revert();
        };
    }, []);

    return (
        <div ref={wrapRef} className="hero-chips mt-6 space-y-3 md:space-y-3.5 w-full">
            {rows.map((row, rIdx) => (
                // ⬇️ NUEVO contenedor exterior que sólo se usa para la animación de salida
                <div key={rIdx} className="row-outer">
                    <div className="row-wrap overflow-hidden w-full">
                        <div
                            ref={(el) => setTrackRef(el, rIdx)}
                            className="row-track flex flex-nowrap gap-3 md:gap-3.5 will-change-transform"
                        >
                            {[...row, ...row].map((it, i) => (
                                <ChipCard key={`${it.text}-${i}`} emoji={it.emoji} text={it.text} />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

}
