import { motion } from "framer-motion";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionTitle({ kicker, title, subtitle, align = "center", className = "" }: Props) {
  const alignCls = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`mb-8 md:mb-12 ${alignCls} ${className}`}>
      {kicker && (
        <motion.div className="text-sm md:text-base text-white/70 mb-1 tracking-wide uppercase">
          {kicker}
        </motion.div>
      )}
      <motion.h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</motion.h2>
      {subtitle && (
        <motion.p className="mt-3 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
