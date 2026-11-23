interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  return (
    <div className={`${isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`.trim()}>
      {kicker && (
        <div
          className={`inline-flex items-center gap-3 mb-3 ${
            isCenter ? 'justify-center' : ''
          }`}
        >
          <span
            aria-hidden="true"
            className="w-6 h-px bg-[#C9A24B] shrink-0"
          />
          <p
            className={`text-xs font-semibold tracking-[0.08em] ${
              light ? 'text-[#E2BE67]' : 'text-[#7D5D14]'
            }`}
          >
            {kicker}
          </p>
          {isCenter && (
            <span
              aria-hidden="true"
              className="w-6 h-px bg-[#C9A24B] shrink-0"
            />
          )}
        </div>
      )}
      <h2 className={`heading-h2 ${light ? 'text-white' : 'text-[#0B1F3A]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 body-base ${
            light ? 'text-white/85' : 'text-[#525B68]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
