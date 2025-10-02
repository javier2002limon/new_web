import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"span"> & {
  emoji: string;
  text: string;
  dataRow?: number;
};

export default function ChipCard({ emoji, text, dataRow, className, ...rest }: Props) {
  return (
    <motion.span
      data-row={dataRow}
      {...rest}
      className={
        `mini-chip inline-flex shrink-0 items-center gap-2 rounded-full
         border border-white/20 bg-white/5 backdrop-blur-sm
         px-3.5 py-2 text-sm md:text-[15px] text-white/90
         shadow-[inset_0_1px_0_rgba(255,255,255,.06)] ` + (className ?? "")
      }
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
    >
      <span className="select-none leading-none text-base md:text-[17px]">{emoji}</span>
      <span className="leading-snug">{text}</span>
    </motion.span>
  );
}
