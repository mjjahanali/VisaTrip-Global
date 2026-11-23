import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      el.getAttribute('aria-hidden') !== 'true' &&
      el.offsetParent !== null
  );
}

interface UseFocusTrapOptions {
  /** Whether the modal/drawer is currently open */
  active: boolean;
  /** Callback invoked when Escape is pressed */
  onEscape?: () => void;
  /** Optional explicit element to focus when closed; defaults to the previously focused element */
  returnFocusTo?: RefObject<HTMLElement | null>;
  /** Lock document.body scroll while active (default: true) */
  lockScroll?: boolean;
}

/**
 * WCAG 2.1 AA Focus Trap & Restoration Hook for Modals, Lightboxes, and Drawers.
 *
 * - Captures the element that had focus before opening and restores focus to it on close.
 * - Moves initial focus to the first interactive control (or dialog container itself).
 * - Traps Tab and Shift+Tab strictly inside the dialog container.
 * - Closes cleanly on Escape.
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>({
  active,
  onEscape,
  returnFocusTo,
  lockScroll = true,
}: UseFocusTrapOptions) {
  const containerRef = useRef<T | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;

    const opener =
      returnFocusTo?.current ||
      (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    previousFocusRef.current = opener;

    let prevOverflow = '';
    if (lockScroll) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    // Move focus inside dialog on next animation frame so mounted portals/animations settle
    const rafId = window.requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      if (container.contains(document.activeElement)) return;
      const focusables = getFocusableElements(container);
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        container.focus();
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onEscapeRef.current?.();
        return;
      }

      if (e.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;

      const focusables = getFocusableElements(container);
      if (focusables.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (!current || current === first || !container.contains(current)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (!current || current === last || !container.contains(current)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.cancelAnimationFrame(rafId);
      document.removeEventListener('keydown', handleKeyDown, true);
      if (lockScroll) {
        document.body.style.overflow = prevOverflow;
      }
      const targetToRestore = opener || previousFocusRef.current;
      if (targetToRestore && document.contains(targetToRestore)) {
        window.requestAnimationFrame(() => {
          targetToRestore.focus();
        });
      }
    };
  }, [active, lockScroll, returnFocusTo]);

  return containerRef;
}
