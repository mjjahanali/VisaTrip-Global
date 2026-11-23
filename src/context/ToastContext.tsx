import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

export type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

interface ToastItem extends Required<Pick<ToastInput, 'title' | 'variant' | 'durationMs'>> {
  id: string;
  description?: string;
}

interface ToastContextValue {
  showToast: (toast: ToastInput) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const MAX_TOASTS = 3;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());

  const dismissToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, variant = 'success', durationMs = 5200 }: ToastInput) => {
      const id = `vtg-toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const next: ToastItem = { id, title, description, variant, durationMs };

      setToasts((prev) => {
        const trimmed = prev.slice(-(MAX_TOASTS - 1));
        return [...trimmed, next];
      });

      if (durationMs > 0 && typeof window !== 'undefined') {
        const timer = window.setTimeout(() => {
          dismissToast(id);
        }, durationMs);
        timersRef.current.set(id, timer);
      }
    },
    [dismissToast]
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] lg:inset-x-auto lg:left-6 lg:bottom-6 z-[60] flex flex-col gap-2.5 lg:w-[390px] max-w-full"
      >
        {toasts.map((toast) => {
          const isError = toast.variant === 'error';
          const isWarning = toast.variant === 'warning';
          const isInfo = toast.variant === 'info';

          const borderClass = isError
            ? 'border-red-300'
            : isWarning
            ? 'border-[#C9A24B]'
            : isInfo
            ? 'border-[#0B1F3A]/20'
            : 'border-[#0F5132]/35';

          const iconWrapClass = isError
            ? 'bg-red-50 text-red-700'
            : isWarning
            ? 'bg-[#C9A24B]/18 text-[#7D5D14]'
            : isInfo
            ? 'bg-[#0B1F3A]/8 text-[#0B1F3A]'
            : 'bg-[#0F5132]/12 text-[#0F5132]';

          return (
            <div
              key={toast.id}
              role={isError ? 'alert' : 'status'}
              className={`pointer-events-auto rounded-2xl bg-white border ${borderClass} shadow-[0_14px_38px_rgba(7,21,41,0.18)] p-4 flex items-start gap-3 transition-opacity duration-200`}
            >
              <div
                className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center ${iconWrapClass}`}
                aria-hidden="true"
              >
                {isError ? (
                  <AlertCircle className="w-5 h-5" />
                ) : isWarning ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : isInfo ? (
                  <Info className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-bold text-[#0B1F3A] leading-snug">{toast.title}</p>
                {toast.description && (
                  <p className="mt-1 text-xs text-[#4B5563] leading-[1.65]">{toast.description}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Close notification"
                className="w-11 h-11 -mr-2 -mt-2 rounded-xl text-[#525B68] hover:text-[#0B1F3A] hover:bg-[#FAF8F4] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      showToast: () => undefined,
      dismissToast: () => undefined,
    };
  }
  return ctx;
}
