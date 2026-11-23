import fs from 'fs';
import path from 'path';

export type LeadStatus = 'New' | 'Contacted' | 'Processing' | 'Done';

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  country: string;
  message: string;
  sourcePage: string;
  formType?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  timestamp: string;
  status: LeadStatus;
  extra?: Record<string, string>;
}

export interface LeadStorageAdapter {
  createLead(input: Omit<LeadRecord, 'id' | 'timestamp' | 'status'>): Promise<LeadRecord>;
  listLeads(): Promise<LeadRecord[]>;
  updateLeadStatus(id: string, status: LeadStatus): Promise<LeadRecord | null>;
}

/**
 * Phase 1 Local JSON Lead Store.
 * Structured behind LeadStorageAdapter so you can swap to Supabase, PostgreSQL, or MongoDB
 * without touching API routes or frontend forms.
 */
export class JsonFileLeadStore implements LeadStorageAdapter {
  private filePath: string;

  constructor(filePath?: string) {
    this.filePath = filePath || path.resolve(process.cwd(), '.data', 'leads.json');
  }

  private ensureFile(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf8');
    }
  }

  private readAll(): LeadRecord[] {
    try {
      this.ensureFile();
      const raw = fs.readFileSync(this.filePath, 'utf8');
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private writeAll(leads: LeadRecord[]): void {
    this.ensureFile();
    fs.writeFileSync(this.filePath, JSON.stringify(leads, null, 2), 'utf8');
  }

  async createLead(input: Omit<LeadRecord, 'id' | 'timestamp' | 'status'>): Promise<LeadRecord> {
    const leads = this.readAll();
    const record: LeadRecord = {
      ...input,
      id: `VTG-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'New',
    };
    leads.unshift(record);
    this.writeAll(leads);
    return record;
  }

  async listLeads(): Promise<LeadRecord[]> {
    return this.readAll();
  }

  async updateLeadStatus(id: string, status: LeadStatus): Promise<LeadRecord | null> {
    const leads = this.readAll();
    const idx = leads.findIndex((item) => item.id === id);
    if (idx === -1) return null;
    leads[idx] = { ...leads[idx], status };
    this.writeAll(leads);
    return leads[idx];
  }
}

export const leadStore: LeadStorageAdapter = new JsonFileLeadStore();
