import { motion } from "framer-motion";

type Props = { icon: string; title: string; text: string; index?: number };

export default function MetodologiaItem({ icon, title, text, index = 0 }: Props) {
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className="flex items-start gap-4"
    >
      <div className="text-3xl md:text-4xl leading-none">{icon}</div>
      <div>
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
        <p className="mt-1 text-white/80">{text}</p>
      </div>
    </motion.div>
  );
}
