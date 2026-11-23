import { useEffect, useState } from 'react';

interface MobileKeyboardState {
  isMobileViewport: boolean;
  keyboardOffset: number;
}

/**
 * Tracks mobile viewport (< 1024px) and virtual keyboard height using
 * the Visual Viewport API so a sticky form-submit bar docks cleanly
 * directly above the soft keyboard on iOS & Android.
 */
export function useMobileKeyboard(active: boolean): MobileKeyboardState {
  const [state, setState] = useState<MobileKeyboardState>({
    isMobileViewport: false,
    keyboardOffset: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 1023px)');

    const update = () => {
      const isMobile = mq.matches;
      const vv = window.visualViewport;
      let offset = 0;
      if (isMobile && vv) {
        const diff = window.innerHeight - vv.height - vv.offsetTop;
        offset = diff > 60 ? Math.round(diff) : 0;
      }
      setState({ isMobileViewport: isMobile, keyboardOffset: offset });
    };

    update();
    mq.addEventListener?.('change', update);
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);

    return () => {
      mq.removeEventListener?.('change', update);
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
    };
  }, []);

  // Toggle global body class so the site-wide mobile bottom bar glides away while typing
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (active && state.isMobileViewport) {
      document.body.classList.add('vtg-keyboard-open');
    } else {
      document.body.classList.remove('vtg-keyboard-open');
    }
    return () => {
      document.body.classList.remove('vtg-keyboard-open');
    };
  }, [active, state.isMobileViewport]);

  return state;
}
