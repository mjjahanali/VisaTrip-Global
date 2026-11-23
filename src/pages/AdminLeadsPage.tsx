import { useState } from 'react';
import { Lock, Download, RefreshCw, LogOut, QrCode, Users, Loader2 } from 'lucide-react';
import type { LeadRecord, LeadStatus } from '../lib/leadStore';
import { SeoHead } from '../lib/seo';
import { useToast } from '../context/ToastContext';
import { OfficeReviewQrCard } from '../components/OfficeReviewQrCard';
import { ListSkeleton } from '../components/Skeletons';
import { EmptyState } from '../components/EmptyState';

const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Processing', 'Done'];

export function AdminLeadsPage() {
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [authedPassword, setAuthedPassword] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<'All' | LeadStatus>('All');
  const [activeTab, setActiveTab] = useState<'leads' | 'gbp-qr'>('leads');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLeads = async (pwd: string) => {
    setLoading(true);
    setError('');
    try {
      const resp = await fetch('/api/leads', {
        headers: { 'X-Admin-Password': pwd },
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) {
        setError('ভুল পাসওয়ার্ড। অনুগ্রহ করে সঠিক ADMIN_PASSWORD দিন।');
        setAuthedPassword(null);
      } else {
        setAuthedPassword(pwd);
        setLeads(data.leads || []);
      }
    } catch {
      setError('সার্ভারের সাথে সংযোগ করা যায়নি।');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads(password);
  };

  const handleStatusChange = async (id: string, nextStatus: LeadStatus) => {
    if (!authedPassword) return;
    const resp = await fetch(`/api/leads/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Password': authedPassword,
      },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (resp.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l)));
      showToast({
        variant: 'success',
        durationMs: 3000,
        title: `Status updated to ${nextStatus}`,
        description: `Lead ${id} has been updated.`,
      });
    } else {
      showToast({
        variant: 'error',
        title: 'Failed to update lead status',
      });
    }
  };

  const exportCsv = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Service', 'Country', 'Message', 'Source', 'Status'];
    const rows = leads.map((l) => [
      l.id,
      l.timestamp,
      l.name,
      l.phone,
      l.service,
      l.country,
      l.message.replace(/\n/g, ' '),
      l.sourcePage,
      l.status,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visatrip-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const visibleLeads =
    filterStatus === 'All' ? leads : leads.filter((l) => l.status === filterStatus);

  return (
    <>
      <SeoHead
        title="Admin Leads Dashboard | Visatrip Global"
        description="Internal lead management panel for Visatrip Global."
        canonicalPath="/admin/leads"
        noIndex
      />

      <section className="py-12 sm:py-16 min-h-[70vh]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {!authedPassword ? (
            <div className="max-w-md mx-auto bg-white rounded-2xl p-7 border border-[#0B1F3A]/10 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] text-[#C9A24B] flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-[#0B1F3A]">Admin Leads Panel</h1>
              <p className="mt-1 text-xs text-[#525B68]">
                অ্যাডমিন পাসওয়ার্ড দিয়ে ক্লায়েন্ট ইনকোয়ারি লগ দেখুন। (ডিফল্ট ডেভ পাসওয়ার্ড: .env-এ সেট করুন)
              </p>

              <form onSubmit={handleLogin} aria-busy={loading} className="mt-5 space-y-4">
                <fieldset disabled={loading} className="space-y-4 disabled:opacity-75 transition-opacity">
                  <div>
                    <label htmlFor="admin-pwd" className="block text-xs font-semibold text-[#0B1F3A] mb-1">
                      Admin Password
                    </label>
                    <input
                      id="admin-pwd"
                      type="password"
                      autoComplete="current-password"
                      required
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? 'admin-login-error' : undefined}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full min-h-[48px] px-3.5 rounded-xl border border-[#0B1F3A]/20 text-base sm:text-sm"
                    />
                  </div>
                </fieldset>
                {error && (
                  <p id="admin-login-error" role="alert" className="text-xs font-medium text-red-700">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[46px] rounded-xl bg-[#0B1F3A] text-white font-bold text-sm hover:bg-[#153159] inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                  {loading ? 'Checking...' : 'Sign In'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#0B1F3A]">
                    Visatrip Global — Lead Log ({visibleLeads.length})
                  </h1>
                  <p className="text-xs text-[#525B68]">
                    Phase 1 JSON/DB Lead Adapter · Update status or export CSV anytime.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => fetchLeads(authedPassword)}
                    className="min-h-[44px] px-4 rounded-xl bg-white border border-[#0B1F3A]/15 text-xs font-semibold text-[#0B1F3A] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Refresh
                  </button>
                  <button
                    type="button"
                    onClick={exportCsv}
                    className="min-h-[44px] px-4 rounded-xl bg-[#C9A24B] text-[#0B1F3A] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthedPassword(null);
                      setPassword('');
                    }}
                    className="min-h-[44px] px-4 rounded-xl bg-white border border-[#0B1F3A]/15 text-xs font-semibold text-[#525B68] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>

              {/* Admin View Switcher: Leads vs Office GBP Review QR Standee */}
              <div
                role="tablist"
                aria-label="Admin dashboard sections"
                className="flex flex-wrap gap-2 border-b border-[#0B1F3A]/10 pb-4"
              >
                <button
                  id="admin-tab-leads"
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'leads'}
                  aria-controls="admin-panel-leads"
                  tabIndex={activeTab === 'leads' ? 0 : -1}
                  onClick={() => setActiveTab('leads')}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                      e.preventDefault();
                      setActiveTab('gbp-qr');
                      document.getElementById('admin-tab-gbp-qr')?.focus();
                    }
                  }}
                  className={`min-h-[44px] px-4 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-[#0B1F3A] text-white'
                      : 'bg-white border border-[#0B1F3A]/12 text-[#374151]'
                  }`}
                >
                  <Users
                    className={`w-4 h-4 ${activeTab === 'leads' ? 'text-[#C9A24B]' : 'text-[#7D5D14]'}`}
                    aria-hidden="true"
                  />
                  Client Leads ({leads.length})
                </button>
                <button
                  id="admin-tab-gbp-qr"
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'gbp-qr'}
                  aria-controls="admin-panel-gbp-qr"
                  tabIndex={activeTab === 'gbp-qr' ? 0 : -1}
                  onClick={() => setActiveTab('gbp-qr')}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                      e.preventDefault();
                      setActiveTab('leads');
                      document.getElementById('admin-tab-leads')?.focus();
                    }
                  }}
                  className={`min-h-[44px] px-4 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer ${
                    activeTab === 'gbp-qr'
                      ? 'bg-[#0B1F3A] text-white'
                      : 'bg-white border border-[#0B1F3A]/12 text-[#374151]'
                  }`}
                >
                  <QrCode
                    className={`w-4 h-4 ${activeTab === 'gbp-qr' ? 'text-[#C9A24B]' : 'text-[#7D5D14]'}`}
                    aria-hidden="true"
                  />
                  Office Google Review QR Standee
                </button>
              </div>

              {activeTab === 'gbp-qr' ? (
                <div id="admin-panel-gbp-qr" role="tabpanel" aria-labelledby="admin-tab-gbp-qr">
                  <OfficeReviewQrCard />
                </div>
              ) : (
                <div id="admin-panel-leads" role="tabpanel" aria-labelledby="admin-tab-leads" className="space-y-6">
                  <div
                    role="group"
                    aria-label="Filter leads by status"
                    className="flex overflow-x-auto snap-carousel scrollbar-none gap-2 pb-1 sm:pb-0 sm:flex-wrap"
                  >
                    {(['All', ...STATUSES] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        aria-pressed={filterStatus === st}
                        onClick={() => setFilterStatus(st)}
                        className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 snap-start cursor-pointer ${
                          filterStatus === st
                            ? 'bg-[#0B1F3A] text-white'
                            : 'bg-white border border-[#0B1F3A]/12 text-[#4B5563]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {loading ? (
                    <div className="bg-white rounded-2xl border border-[#0B1F3A]/10 overflow-hidden">
                      <ListSkeleton variant="table" rows={5} />
                    </div>
                  ) : visibleLeads.length === 0 ? (
                    <EmptyState
                      icon="files"
                      titleBn={
                        filterStatus === 'All'
                          ? 'এখনো কোনো লিড রেকর্ড হয়নি'
                          : `"${filterStatus}" স্ট্যাটাসে কোনো লিড নেই`
                      }
                      titleEn={
                        filterStatus === 'All'
                          ? 'No Leads Recorded Yet'
                          : `No Leads with "${filterStatus}" Status`
                      }
                      descriptionBn="সাইটের যেকোনো কনসাল্টেশন ফর্ম সাবমিট করলে এখানে তাৎক্ষণিকভাবে দেখা যাবে।"
                      descriptionEn="Submit any consultation form on the site to see incoming inquiries appear here."
                      onReset={filterStatus !== 'All' ? () => setFilterStatus('All') : undefined}
                      resetLabelBn="সব স্ট্যাটাস দেখুন"
                      resetLabelEn="Show All Statuses"
                      showWhatsAppCta={false}
                    />
                  ) : (
                  <div className="bg-white rounded-2xl border border-[#0B1F3A]/10 overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm min-w-[780px]">
                      <thead className="bg-[#0B1F3A] text-white text-xs">
                        <tr>
                          <th scope="col" className="p-3.5">Ref / Date</th>
                          <th scope="col" className="p-3.5">Client</th>
                          <th scope="col" className="p-3.5">Service & Country</th>
                          <th scope="col" className="p-3.5">Message / Source</th>
                          <th scope="col" className="p-3.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#0B1F3A]/8">
                        {visibleLeads.map((lead) => (
                            <tr key={lead.id} className="align-top">
                              <td className="p-3.5 tabular-nums">
                                <div className="font-bold text-[#0B1F3A]">{lead.id}</div>
                                <div className="text-xs leading-[1.55] text-[#525B68]">
                                  {new Date(lead.timestamp).toLocaleString()}
                                </div>
                              </td>
                              <td className="p-3.5">
                                <div className="font-semibold text-[#0B1F3A]">{lead.name}</div>
                                <div className="text-xs text-[#4B5563] tabular-nums">{lead.phone}</div>
                              </td>
                              <td className="p-3.5">
                                <div className="font-medium text-[#0B1F3A]">{lead.service}</div>
                                <div className="text-xs text-[#525B68]">{lead.country || '—'}</div>
                              </td>
                              <td className="p-3.5 max-w-xs">
                                <div className="text-xs text-[#374151]">{lead.message || '—'}</div>
                                <div className="text-xs leading-[1.55] text-[#525B68] mt-1">
                                  Page: {lead.sourcePage}
                                  {lead.utmSource ? ` · UTM: ${lead.utmSource}` : ''}
                                </div>
                              </td>
                              <td className="p-3.5">
                                <select
                                  aria-label={`Update status for ${lead.name} (${lead.id})`}
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                  className="min-h-[44px] px-3 rounded-lg border border-[#0B1F3A]/20 text-base sm:text-xs font-semibold bg-[#FAF8F4]"
                                >
                                  {STATUSES.map((st) => (
                                    <option key={st} value={st}>
                                      {st}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
