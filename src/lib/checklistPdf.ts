import { siteConfig } from '../config/site';

function escapePdfText(input: string): string {
  // Standard PDF Type1 Helvetica supports ASCII/WinAnsi cleanly across all mobile/desktop PDF viewers
  const ascii = input
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return ascii.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += ' ' + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Generates a lightweight, standards-compliant A4 PDF 1.4 document with zero external dependencies.
 * Renders crisply in Android, iOS Safari, Chrome, Preview, and Adobe Acrobat.
 */
export function generateChecklistPdfBlob(params: {
  titleEn: string;
  serviceName: string;
  itemsEn: string[];
}): Blob {
  const ops: string[] = [];

  // Deep Navy Header Band (A4: 595 x 842 pt)
  ops.push('0.043 0.122 0.227 rg');
  ops.push('0 742 595 100 re f');

  // Gold Accent Rule
  ops.push('0.788 0.635 0.294 rg');
  ops.push('0 738 595 4 re f');

  // Brand Title & Contact in Header
  ops.push('1 1 1 rg');
  ops.push('BT /F2 20 Tf 44 804 Td (VISATRIP GLOBAL) Tj ET');
  ops.push('0.788 0.635 0.294 rg');
  ops.push(
    `BT /F1 10 Tf 44 786 Td (${escapePdfText(
      'Your Trusted Companion to Every Destination  |  ' + siteConfig.websiteDisplay
    )}) Tj ET`
  );
  ops.push('0.88 0.90 0.94 rg');
  ops.push(
    `BT /F1 9 Tf 44 764 Td (${escapePdfText(
      `Hotline / WhatsApp: ${siteConfig.contact.phoneDisplay}   |   Office: ${siteConfig.contact.officeAddressEn}`
    )}) Tj ET`
  );

  // Document Heading
  ops.push('0.043 0.122 0.227 rg');
  ops.push(`BT /F2 15 Tf 44 704 Td (${escapePdfText(params.titleEn)}) Tj ET`);
  ops.push('0.42 0.45 0.50 rg');
  ops.push(
    `BT /F1 9.5 Tf 44 686 Td (${escapePdfText(
      `Category: ${params.serviceName}  |  Prepared for Bangladeshi Travelers`
    )}) Tj ET`
  );

  // Divider line
  ops.push('0.85 0.87 0.90 RG 0.8 w 44 674 m 551 674 l S');

  // Checklist Items with Drawn Checkboxes
  let y = 648;
  params.itemsEn.forEach((rawItem, idx) => {
    const clean = escapePdfText(rawItem);
    if (!clean || y < 130) return;

    // Checkbox square
    ops.push('0.788 0.635 0.294 RG 1 w');
    ops.push(`44 ${y - 2} 11 11 re S`);

    // Item number + wrapped lines
    const wrapped = wrapText(`${idx + 1}. ${clean}`, 76);
    ops.push('0.10 0.12 0.15 rg');
    wrapped.forEach((line, lineIdx) => {
      ops.push(`BT /F1 10.5 Tf 64 ${y - lineIdx * 15} Td (${escapePdfText(line)}) Tj ET`);
    });

    y -= wrapped.length * 15 + 14;
  });

  // Footer Disclaimer Box
  ops.push('0.976 0.969 0.953 rg');
  ops.push('44 48 507 68 re f');
  ops.push('0.788 0.635 0.294 RG 0.7 w');
  ops.push('44 48 507 68 re S');

  ops.push('0.043 0.122 0.227 rg');
  ops.push('BT /F2 9.5 Tf 56 98 Td (IMPORTANT TRANSPARENCY NOTE) Tj ET');
  ops.push('0.28 0.31 0.36 rg');
  ops.push(
    `BT /F1 8.5 Tf 56 83 Td (${escapePdfText(
      'This is a general preparation checklist. Final visa requirements and decisions belong strictly to the Embassy.'
    )}) Tj ET`
  );
  ops.push(
    `BT /F1 8.5 Tf 56 69 Td (${escapePdfText(
      `Free document verification before submission: WhatsApp ${siteConfig.contact.phoneDisplay} (${siteConfig.contact.officeHoursEn})`
    )}) Tj ET`
  );
  ops.push(
    `BT /F1 8 Tf 56 56 Td (${escapePdfText(
      'Always collect an official dated Money Receipt for every payment at Visatrip Global.'
    )}) Tj ET`
  );

  const stream = ops.join('\n');
  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export function downloadChecklistPdf(params: {
  fileSlug: string;
  titleEn: string;
  serviceName: string;
  itemsEn: string[];
}): void {
  const blob = generateChecklistPdfBlob(params);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Visatrip-Global-${params.fileSlug.replace(/[^a-z0-9-]+/gi, '-').toLowerCase()}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
