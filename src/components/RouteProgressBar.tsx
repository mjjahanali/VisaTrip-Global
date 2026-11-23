import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ROUTE_LOADING_EVENT = 'vtg:route-loading';

/**
 * Branded Navy & Gold top progress bar triggered on route navigation and
 * Suspense chunk resolution. Uses compositor-only scaleX + opacity transforms
 * and respects prefers-reduced-motion.
 */
export function RouteProgressBar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const isFirstRender = useRef(true);
  const chunkActiveRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const finishBar = () => {
    clearTimers();
    setProgress(1);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 240);
    timersRef.current.push(hideTimer);
  };

  const startBar = (keepOpenUntilEvent = false) => {
    clearTimers();
    setVisible(true);
    setProgress(0.28);

    const t1 = window.setTimeout(() => setProgress(0.68), 90);
    const t2 = window.setTimeout(() => setProgress(0.84), 260);
    timersRef.current.push(t1, t2);

    if (!keepOpenUntilEvent) {
      const done = window.setTimeout(() => {
        if (!chunkActiveRef.current) {
          finishBar();
        }
      }, 340);
      timersRef.current.push(done);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    startBar(false);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onChunkEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ active?: boolean }>).detail;
      if (detail?.active) {
        chunkActiveRef.current = true;
        startBar(true);
      } else {
        chunkActiveRef.current = false;
        finishBar();
      }
    };
    window.addEventListener(ROUTE_LOADING_EVENT, onChunkEvent);
    return () => {
      window.removeEventListener(ROUTE_LOADING_EVENT, onChunkEvent);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-[70] h-[3px] pointer-events-none bg-[#0B1F3A]/15 overflow-hidden"
    >
      <div
        style={{
          transform: `scaleX(${progress})`,
          opacity: visible ? 1 : 0,
        }}
        className="h-full w-full origin-left bg-gradient-to-r from-[#7D5D14] via-[#C9A24B] to-[#E2BE67] transition-transform duration-200 ease-out"
      />
    </div>
  );
}
