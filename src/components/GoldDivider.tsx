interface GoldDividerProps {
  className?: string;
  compact?: boolean;
}

export function GoldDivider({ className = '', compact = false }: GoldDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full flex items-center justify-center ${compact ? 'py-2' : 'py-0'} ${className}`}
    >
      <div className="w-full max-w-[1200px] px-4 sm:px-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/45 to-[#C9A24B]/60" />
        <div className="w-2 h-2 rotate-45 border border-[#C9A24B] bg-[#FAF8F4] shrink-0" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A24B]/45 to-[#C9A24B]/60" />
      </div>
    </div>
  );
}
