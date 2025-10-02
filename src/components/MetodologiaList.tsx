import MetodologiaItem from "./MetodologiaItem";

const ITEMS = [
  { icon: "📝", title: "Clases dinámicas", text: "Explicaciones claras y ejemplos prácticos, sin paja." },
  { icon: "📄", title: "Materiales propios", text: "Resúmenes, ejercicios resueltos y simulacros." },
  { icon: "🤝", title: "Seguimiento continuo", text: "Dudas entre clases, feedback rápido." },
  { icon: "🎯", title: "Enfoque al examen", text: "Estrategia y práctica para aprobar a la primera." },
];

export default function MetodologiaList() {
  return (
    <>
      {/* mobile: apilado */}
      <div className="space-y-6 md:hidden">
        {ITEMS.map((it) => (
          <MetodologiaItem key={it.title} {...it} />
        ))}
      </div>

      {/* desktop: 2 columnas */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-8">
        {ITEMS.map((it) => (
          <MetodologiaItem key={it.title} {...it} />
        ))}
      </div>
    </>
  );
}
