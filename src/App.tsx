import { useLenis } from "./hooks/useLenis";
import Hero from "./components/Hero";
import ComoFunciona from "./components/ComoFunciona";
import AsignaturasMetodologia from "./components/AsignaturasMetodologia";
import Seccion3 from "./components/Seccion3";
import Seccion4 from "./components/Seccion4";

export default function App() {
  useLenis();

  return (
    <main className="text-white bg-gradient-to-br from-blue-600 to-violet-700">
      {/* sección hero */}
      <Hero />

      {/* sección cómo funciona */}
      <ComoFunciona />

      <Seccion3 />
      <Seccion4 />

      {/* placeholder hasta que creemos las siguientes */}
      <section className="h-[120vh]" />
    </main>
  );
}
