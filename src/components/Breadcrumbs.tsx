import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: BreadcrumbItem[];
  light?: boolean;
}) {
  const { localizedPath } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol
        className={`flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] ${
          light ? 'text-white/85' : 'text-[#525B68]'
        }`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-70 shrink-0" aria-hidden="true" />}
              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={light ? 'text-white font-medium' : 'text-[#0B1F3A] font-medium'}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={localizedPath(item.to)}
                  className={`transition-colors ${
                    light ? 'hover:text-[#E2BE67]' : 'hover:text-[#0B1F3A]'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
