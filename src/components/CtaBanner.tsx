import { Phone, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { siteConfig, buildWhatsAppLink } from '../config/site';
import { getPageLeadContext } from '../lib/leadContext';
import { trackAnalyticsEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { InquiryForm } from './InquiryForm';
import { FadeUp } from './MotionPrimitives';

interface CtaBannerProps {
  defaultService?: string;
  defaultCountry?: string;
  theme?: 'navy' | 'hajj';
  headingBn?: string;
  headingEn?: string;
  whatsappMessage?: string;
}

export function CtaBanner({
  defaultService,
  defaultCountry,
  theme = 'navy',
  headingBn = 'আজই কথা বলুন আমাদের বিশেষজ্ঞদের সাথে',
  headingEn = 'Speak with Our Travel & Visa Consultants Today',
  whatsappMessage,
}: CtaBannerProps) {
  const { locale, t } = useLanguage();
  const { pathname } = useLocation();
  const ctx = getPageLeadContext(pathname, locale);

  const bgClass = theme === 'hajj' ? 'bg-hajj-hero' : 'bg-navy-hero';
  const waHref = whatsappMessage ? buildWhatsAppLink(whatsappMessage, locale) : ctx.whatsappUrl;

  return (
    <section id="consultation" className={`${bgClass} text-white py-16 sm:py-24`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <FadeUp className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="w-6 h-px bg-[#C9A24B]" />
              <p className={`text-xs font-semibold tracking-[0.08em] ${theme === 'hajj' ? 'text-[#E2BE67]' : 'text-[#C9A24B]'}`}>
                {t('ফ্রি কনসাল্টেশন · স্বচ্ছ পরামর্শ', 'Free Consultation · Honest Guidance')}
              </p>
            </div>
            <h2 className="heading-h2 text-white">{t(headingBn, headingEn)}</h2>
            <p className="body-base text-white/85">
              {t(
                'ভিসা ডকুমেন্ট, ওমরাহ প্যাকেজ, এয়ার টিকেট বা Work Permit যাচাই — যেকোনো প্রশ্নে বিনা খরচে আমাদের অভিজ্ঞ কনসালটেন্টদের সাথে কথা বলুন।',
                'Whether you need visa document review, Umrah package schedules, air tickets, or Work Permit verification, talk to our consultants at zero cost.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackAnalyticsEvent('whatsapp_click', {
                    location: 'cta_banner',
                    prefilled_topic: ctx.serviceLabel,
                  })
                }
                className="btn-primary"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t('WhatsApp-এ মেসেজ করুন', 'Message on WhatsApp')}
              </a>
              <a
                href={siteConfig.contact.phoneHref}
                onClick={() => trackAnalyticsEvent('call_click', { location: 'cta_banner' })}
                className="btn-secondary-light tabular-nums"
              >
                <Phone className={`w-4 h-4 ${theme === 'hajj' ? 'text-[#E2BE67]' : 'text-[#C9A24B]'}`} aria-hidden="true" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>

            <div className="pt-6 border-t border-white/15 space-y-2 text-sm text-white/85">
              <p>
                <strong className="text-white">{t('অফিস ঠিকানা:', 'Office:')}</strong>{' '}
                {t(siteConfig.contact.officeAddressBn, siteConfig.contact.officeAddressEn)}
              </p>
              <p>
                <strong className="text-white">{t('অফিস সময়:', 'Hours:')}</strong>{' '}
                {t(siteConfig.contact.officeHoursBn, siteConfig.contact.officeHoursEn)}
              </p>
            </div>
          </FadeUp>

          <FadeUp
            delay={0.08}
            className="lg:col-span-7 bg-white/6 backdrop-blur-xs border border-white/15 rounded-2xl p-6 sm:p-8 shadow-[0_20px_48px_rgba(0,0,0,0.2)]"
          >
            <h3 className="heading-h3 text-white mb-2">
              {t('মাত্র ১০ সেকেন্ডে ফ্রি কলব্যাকের অনুরোধ জানান', 'Request a Free Callback in 10 Seconds')}
            </h3>
            <p className="text-xs sm:text-sm text-white/85 mb-5 leading-[1.65]">
              {t(
                'শুধু নাম ও WhatsApp নম্বর দিন — অতিরিক্ত বিবরণ ঐচ্ছিক।',
                'Just enter your name and WhatsApp number — extra details are optional.'
              )}
            </p>
            <InquiryForm
              defaultService={defaultService}
              defaultCountry={defaultCountry}
              darkSurface
              formType="final_cta_banner"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
