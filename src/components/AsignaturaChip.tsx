type Props = { emoji: string; text: string; className?: string };

export default function AsignaturaChip({ emoji, text, className = "" }: Props) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 rounded-full
        border border-white/20 bg-white/5 backdrop-blur-sm
        px-4 py-2.5 text-[15px] md:text-base text-white/90
        shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
        ${className}
      `}
    >
      <span className="text-[20px] md:text-[22px] leading-none select-none">{emoji}</span>
      <span className="leading-none whitespace-nowrap">{text}</span>
    </span>
  );
}
