import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Printer, Copy, Check, Star, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../config/site';

/**
 * Office Google Business Profile Review QR Code & Printable Desk Standee Generator.
 *
 * Uses ISO/IEC 18004 high error-correction (Level H) QR generation locally in the browser
 * (zero external QR APIs). Lets the Rohanpur office owner paste their live Google Business
 * Profile "Ask for reviews" short link (e.g. https://g.page/r/.../review), preview an
 * A5 desk standee with exact Visatrip Global NAP, download crisp SVG/PNG, or print directly.
 */
export function OfficeReviewQrCard() {
  const defaultTarget =
    siteConfig.localSeo.gbpReviewUrl.trim() || siteConfig.contact.mapDirectionsUrl;
  const [reviewUrl, setReviewUrl] = useState(defaultTarget);
  const [qrSvg, setQrSvg] = useState('');
  const [qrPngUrl, setQrPngUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrError, setQrError] = useState('');

  useEffect(() => {
    let active = true;
    const target = reviewUrl.trim();
    if (!target || !/^https?:\/\//i.test(target)) {
      setQrError('একটি সঠিক https:// লিংক দিন (যেমন: https://g.page/r/YOUR_ID/review)');
      setQrSvg('');
      setQrPngUrl('');
      return;
    }

    setQrError('');
    Promise.all([
      QRCode.toString(target, {
        type: 'svg',
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 280,
        color: {
          dark: '#0B1F3A',
          light: '#FFFFFF',
        },
      }),
      QRCode.toDataURL(target, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 1024,
        color: {
          dark: '#0B1F3A',
          light: '#FFFFFF',
        },
      }),
    ])
      .then(([svgString, pngDataUrl]) => {
        if (!active) return;
        setQrSvg(svgString);
        setQrPngUrl(pngDataUrl);
      })
      .catch(() => {
        if (!active) return;
        setQrError('QR কোড তৈরি করা যায়নি। লিংকটি আবার যাচাই করুন।');
      });

    return () => {
      active = false;
    };
  }, [reviewUrl]);

  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'visatrip-global-google-review-qr.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    if (!qrPngUrl) return;
    const a = document.createElement('a');
    a.href = qrPngUrl;
    a.download = 'visatrip-global-google-review-qr-1024px.png';
    a.click();
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(reviewUrl.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  const handlePrintStandee = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-[#0B1F3A]/10 p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center shrink-0">
            <QrCode className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7D5D14]">
              Google Business Profile · Office Desk Tool
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A]">
              অফিস কাউন্টার Google Review QR কোড ও প্রিন্ট স্ট্যান্ডি
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1 leading-[1.7]">
              আপনার Google Business Profile ড্যাশবোর্ড থেকে &ldquo;Ask for reviews&rdquo; লিংকটি নিচে পেস্ট করে রহনপুর অফিস ডেস্কের জন্য প্রিন্টযোগ্য QR স্ট্যান্ডি তৈরি করুন।
            </p>
          </div>
        </div>
      </div>

      {/* Review URL Input */}
      <div className="space-y-2">
        <label htmlFor="gbp-review-url" className="block text-xs font-semibold text-[#0B1F3A]">
          Google Business Profile Review Link (g.page/r/.../review)
        </label>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            id="gbp-review-url"
            type="url"
            value={reviewUrl}
            onChange={(e) => setReviewUrl(e.target.value)}
            aria-invalid={Boolean(qrError)}
            aria-describedby={qrError ? 'gbp-review-url-error' : 'gbp-review-url-hint'}
            placeholder="https://g.page/r/YOUR_PLACE_ID/review"
            className="flex-1 min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/20 text-base sm:text-sm text-[#0B1F3A] bg-[#FAF8F4] focus:bg-white focus:border-[#0B1F3A]"
          />
          <button
            type="button"
            onClick={handleCopyUrl}
            className="min-h-[48px] px-4 rounded-xl border border-[#0B1F3A]/15 bg-white hover:bg-[#FAF8F4] text-xs font-semibold text-[#0B1F3A] inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#0F5132]" aria-hidden="true" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#7D5D14]" aria-hidden="true" />
                Copy Link
              </>
            )}
          </button>
        </div>
        {qrError ? (
          <p id="gbp-review-url-error" role="alert" className="text-xs font-medium text-red-700">
            {qrError}
          </p>
        ) : (
          <p id="gbp-review-url-hint" className="text-xs text-[#525B68]">
            টিপস: GBP ভেরিফাই হওয়ার পর স্থায়ীভাবে লিংকটি <code className="px-1.5 py-0.5 rounded bg-[#FAF8F4] text-[#0B1F3A]">src/config/site.ts</code>-এর <code className="px-1.5 py-0.5 rounded bg-[#FAF8F4] text-[#0B1F3A]">localSeo.gbpReviewUrl</code>-এ যুক্ত করুন।
          </p>
        )}
      </div>

      {/* Printable A5 Desk Standee Preview + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Standee Card */}
        <div className="lg:col-span-6">
          <div
            id="office-review-standee"
            className="rounded-2xl border-2 border-[#C9A24B] bg-[#FAF8F4] overflow-hidden shadow-sm max-w-md mx-auto"
          >
            <div className="bg-[#0B1F3A] text-white px-6 py-5 text-center">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-lg bg-white/10 border border-[#C9A24B]/60 text-[#C9A24B] font-editorial font-bold text-sm inline-flex items-center justify-center">
                  V
                </span>
                <span className="font-editorial text-lg font-bold tracking-tight">
                  {siteConfig.brandName}
                </span>
              </div>
              <p className="text-xs text-[#C9A24B] font-medium">{siteConfig.taglineBn}</p>
            </div>

            <div className="p-6 text-center space-y-4">
              <div>
                <div className="inline-flex items-center gap-1 text-[#C9A24B] mb-1" aria-hidden="true">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A]">
                  আমাদের সেবা কেমন লাগল? Google-এ মতামত দিন
                </h3>
                <p className="text-xs text-[#4B5563] mt-1">
                  Scan with your phone camera to share an honest Google review
                </p>
              </div>

              <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl border border-[#0B1F3A]/12 shadow-xs">
                {qrPngUrl ? (
                  <img
                    src={qrPngUrl}
                    alt="Visatrip Global Google Review QR Code"
                    width={220}
                    height={220}
                    className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px]"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center text-xs text-[#525B68]">
                    QR preview ready
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#0B1F3A]/10 text-xs text-[#374151] space-y-1">
                <p className="inline-flex items-center justify-center gap-1.5 font-semibold text-[#0B1F3A]">
                  <MapPin className="w-3.5 h-3.5 text-[#7D5D14] shrink-0" aria-hidden="true" />
                  <span>{siteConfig.contact.officeAddressBn}</span>
                </p>
                <p className="inline-flex items-center justify-center gap-1.5 tabular-nums text-[#4B5563]">
                  <Phone className="w-3.5 h-3.5 text-[#7D5D14] shrink-0" aria-hidden="true" />
                  <span>
                    {siteConfig.contact.phoneDisplay} · {siteConfig.websiteDisplay}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download & Print Controls + Counter Guidelines */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl bg-[#FAF8F4] border border-[#0B1F3A]/10 p-5 space-y-3">
            <h3 className="text-sm font-bold text-[#0B1F3A]">
              ডাউনলোড ও প্রিন্ট অপশন (A5 অ্যাক্রিলিক স্ট্যান্ডি)
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                disabled={!qrPngUrl}
                onClick={handleDownloadPng}
                className="min-h-[44px] px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#153159] disabled:opacity-40 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
                Download PNG (1024px)
              </button>
              <button
                type="button"
                disabled={!qrSvg}
                onClick={handleDownloadSvg}
                className="min-h-[44px] px-4 rounded-xl bg-white hover:bg-[#FAF8F4] disabled:opacity-40 border border-[#0B1F3A]/15 text-[#0B1F3A] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#7D5D14]" aria-hidden="true" />
                Download Vector SVG
              </button>
              <button
                type="button"
                disabled={!qrPngUrl}
                onClick={handlePrintStandee}
                className="min-h-[44px] px-4 rounded-xl bg-[#C9A24B] hover:bg-[#D6B25E] disabled:opacity-40 text-[#0B1F3A] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                Print Standee
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-[#0B1F3A]/[0.03] border border-[#0B1F3A]/10 p-5 space-y-2 text-xs text-[#4B5563] leading-[1.75]">
            <p className="font-bold text-[#0B1F3A]">অফিস রিভিউ নীতিমালা (Google Compliant):</p>
            <ul className="space-y-1.5 list-disc pl-4">
              <li>শুধুমাত্র প্রকৃত ক্লায়েন্টদের কনসাল্টেশন, টিকেট বা ভিসা হ্যান্ডওভারের পর বিনয়ের সাথে স্ক্যান করতে বলুন।</li>
              <li>কখনোই রিভিউয়ের বিনিময়ে ডিসকাউন্ট, টাকা বা উপহার দেবেন না — এটি Google Policy-র পরিপন্থী।</li>
              <li>অফিসের একই Wi-Fi বা একই ফোন থেকে একাধিক রিভিউ করাবেন না (ক্লায়েন্টের নিজস্ব মোবাইল ডাটা ব্যবহার করা উত্তম)।</li>
              <li>বিস্তারিত GBP পোস্ট, ছবি ও WhatsApp রিভিউ মেসেজ টেমপ্লেটের জন্য <code className="px-1 py-0.5 rounded bg-white text-[#0B1F3A]">/docs/gbp-setup-guide.md</code> দেখুন।</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
