import { useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const count = items.length;
    if (count === 0) return;

    let nextIdx: number | null = null;
    if (e.key === 'ArrowDown') {
      nextIdx = (idx + 1) % count;
    } else if (e.key === 'ArrowUp') {
      nextIdx = (idx - 1 + count) % count;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = count - 1;
    }

    if (nextIdx !== null) {
      e.preventDefault();
      buttonRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const triggerId = `${baseId}-trigger-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <div
            key={item.question}
            className={`rounded-2xl border bg-white transition-colors duration-200 ${
              isOpen
                ? 'border-[#C9A24B]/70 shadow-[0_6px_22px_rgba(11,31,58,0.06)]'
                : 'border-[#0B1F3A]/10 hover:border-[#C9A24B]/50'
            }`}
          >
            <h3 className="m-0">
              <button
                ref={(el) => {
                  buttonRefs.current[idx] = el;
                }}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-full min-h-[56px] px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer rounded-2xl"
              >
                <span className="font-semibold text-[15px] sm:text-base text-[#0B1F3A] leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#7D5D14] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="accordion-panel"
              data-open={isOpen ? 'true' : 'false'}
              hidden={!isOpen}
            >
              <div>
                <div className="px-5 sm:px-6 pb-5 pt-0 text-sm sm:text-[15px] text-[#374151] leading-[1.8] border-t border-[#0B1F3A]/6">
                  <div className="pt-4">{item.answer}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
