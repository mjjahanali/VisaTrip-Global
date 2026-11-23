export type ConsentStatus = 'unset' | 'accepted' | 'essential_only';

export interface ConsentRecord {
  status: Exclude<ConsentStatus, 'unset'>;
  version: number;
  updatedAt: string;
}

const STORAGE_KEY = 'vtg_cookie_consent_v1';
const CONSENT_VERSION = 1;

export const CONSENT_CHANGE_EVENT = 'vtg:consent-change';
export const OPEN_COOKIE_SETTINGS_EVENT = 'vtg:open-cookie-settings';

export function getConsentRecord(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (
      parsed.version === CONSENT_VERSION &&
      (parsed.status === 'accepted' || parsed.status === 'essential_only') &&
      typeof parsed.updatedAt === 'string'
    ) {
      return {
        status: parsed.status,
        version: parsed.version,
        updatedAt: parsed.updatedAt,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function getConsentStatus(): ConsentStatus {
  const record = getConsentRecord();
  return record ? record.status : 'unset';
}

/**
 * Returns true ONLY when the visitor has explicitly opted into optional analytics cookies.
 * Analytics scripts (GA4, Meta Pixel) and conversion events remain blocked until consent is granted.
 */
export function hasAnalyticsConsent(): boolean {
  return getConsentStatus() === 'accepted';
}

export function setConsentStatus(status: Exclude<ConsentStatus, 'unset'>): void {
  if (typeof window === 'undefined') return;
  const record: ConsentRecord = {
    status,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage may be disabled in strict privacy modes; still emit runtime event
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: record }));
}

export function openCookieSettings(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}
