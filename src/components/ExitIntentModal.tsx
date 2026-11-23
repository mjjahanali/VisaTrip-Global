import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChecklistModal } from './ChecklistModal';
import { getPageLeadContext } from '../lib/leadContext';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';

export function ExitIntentModal() {
  const { locale, t } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const ctx = getPageLeadContext(pathname, locale);

  useEffect(() => {
    // Desktop only, never on arrival (requires >= 12s dwell + real exit intent), never on admin routes
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    if (ctx.pageType === 'admin') return;
    if (
      sessionStorage.getItem('vtg_exit_shown') === '1' ||
      sessionStorage.getItem('vtg_lead_magnet_converted') === '1'
    ) {
      return;
    }

    let armed = false;
    const timer = window.setTimeout(() => {
      armed = true;
    }, 12000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (
        e.clientY <= 4 &&
        sessionStorage.getItem('vtg_exit_shown') !== '1' &&
        sessionStorage.getItem('vtg_lead_magnet_converted') !== '1'
      ) {
        sessionStorage.setItem('vtg_exit_shown', '1');
        trackAnalyticsEvent('lead_magnet_impression', {
          trigger: 'exit_intent',
          checklist_id: ctx.leadMagnet.id,
        });
        setOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ctx.pageType, ctx.leadMagnet.id]);

  return (
    <ChecklistModal
      open={open}
      onClose={() => setOpen(false)}
      title={t(
        `যাওয়ার আগে ফ্রি ডাউনলোড করুন: ${ctx.leadMagnet.titleBn}`,
        `Before you go — get your free ${ctx.leadMagnet.titleEn}`
      )}
      serviceName={ctx.leadMagnet.serviceName}
      documents={ctx.leadMagnet.documentsBn}
      documentsEn={ctx.leadMagnet.documentsEn}
      pdfTitleEn={ctx.leadMagnet.pdfTitleEn}
      trigger="exit_intent"
      checklistId={ctx.leadMagnet.id}
    />
  );
}
