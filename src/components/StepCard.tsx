// components/StepCard.tsx
import { motion } from "framer-motion";

type Props = {
  icon: string;         // emoji
  title: string;
  description: string;
  active?: boolean;     // si está en el centro/activo
};

export default function StepCard({ icon, title, description, active }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className={`
        flex flex-col items-center text-center px-4 py-6 rounded-3xl 
        transition-transform duration-500 ease-in-out
        ${active ? "scale-105 shadow-[0_0_25px_rgba(255,255,255,0.15)]" : ""}
      `}
    >
      {/* Emoji grande */}
      <motion.span
        animate={active ? { scale: [1, 1.1, 1] } : {}}
        transition={active ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : {}}
        className="text-5xl md:text-6xl mb-4"
      >
        {icon}
      </motion.span>

      {/* Título */}
      <h3 className="text-xl md:text-2xl font-semibold mb-2">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-sm md:text-base text-white/80 leading-snug max-w-[18rem]">
        {description}
      </p>
    </motion.div>
  );
}
