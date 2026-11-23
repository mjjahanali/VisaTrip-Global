import { useEffect, useRef, useState } from 'react';
import { animate, m, useInView, useReducedMotion } from 'motion/react';
import { toBanglaDigits } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { MOTION_EASE } from './MotionPrimitives';

interface StatCounterProps {
  value: number | null;
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const { isEn } = useLanguage();
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [display, setDisplay] = useState(prefersReduced && value !== null ? value : 0);

  useEffect(() => {
    if (value === null || !inView) return;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 0.38,
      ease: MOTION_EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, prefersReduced]);

  if (value === null) return null;

  const formattedNum = isEn ? String(display) : toBanglaDigits(display);
  const suffixDisplay = isEn ? suffix.replace(' দিন', '') : suffix;

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.32, ease: MOTION_EASE }}
      className="px-4 py-4 text-center"
    >
      <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B1F3A] tabular-nums tracking-tight">
        {formattedNum}
        {suffixDisplay && <span className="text-[#7D5D14] ml-0.5">{suffixDisplay}</span>}
      </div>
      <div className="mt-1 text-xs sm:text-sm text-[#525B68] font-medium">{label}</div>
    </m.div>
  );
}
