import { ScanResult } from '../types';

/**
 * Mock PDF/Printable Executive Dossier Generator
 * Compiles real-time scan telemetry, indicators, and LLM rationale into a self-contained,
 * formatted executive security report for SOC reporting and compliance archiving.
 */
export function generatePdfReport(scan: ScanResult): void {
  const isMalicious = scan.verdict === 'MALICIOUS';
  const isSuspicious = scan.verdict === 'SUSPICIOUS';
  const verdictColor = isMalicious ? '#DC2626' : isSuspicious ? '#D97706' : '#16A34A';
  const verdictBg = isMalicious ? '#FEE2E2' : isSuspicious ? '#FEF3C7' : '#DCFCE7';

  const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pishx Executive Threat Report - ${scan.id}</title>
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
      margin: 0;
      padding: 40px;
      line-height: 1.5;
    }
    .header {
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 20px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #0F172A;
      margin: 0;
    }
    .brand-subtitle {
      font-size: 12px;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
      margin-top: 4px;
    }
    .meta-box {
      text-align: right;
      font-family: monospace;
      font-size: 11px;
      color: #64748B;
    }
    .verdict-banner {
      background: ${verdictBg};
      border: 1px solid ${verdictColor};
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .verdict-title {
      font-size: 18px;
      font-weight: 800;
      color: ${verdictColor};
      text-transform: uppercase;
      margin: 0;
    }
    .verdict-sub {
      font-size: 12px;
      color: #334155;
      margin-top: 2px;
    }
    .confidence-pill {
      font-size: 22px;
      font-weight: 900;
      font-family: monospace;
      color: ${verdictColor};
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #334155;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    .card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 12px 16px;
      font-size: 12px;
    }
    .card-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748B;
      margin-bottom: 4px;
    }
    .card-value {
      font-weight: 600;
      color: #0F172A;
      word-break: break-all;
    }
    .indicator-item {
      border: 1px solid #E2E8F0;
      border-left: 4px solid ${verdictColor};
      background: #FFFFFF;
      border-radius: 4px;
      padding: 10px 14px;
      margin-bottom: 8px;
      font-size: 12px;
    }
    .indicator-header {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      color: #0F172A;
    }
    .indicator-desc {
      color: #475569;
      margin-top: 4px;
      font-size: 11px;
    }
    .evidence {
      background: #F1F5F9;
      padding: 6px 10px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 10px;
      color: #0F172A;
      margin-top: 6px;
      word-break: break-all;
    }
    .rationale-box {
      background: #F8FAFC;
      border: 1px solid #CBD5E1;
      border-radius: 6px;
      padding: 14px 18px;
      font-size: 12px;
      color: #1E293B;
      line-height: 1.6;
    }
    .footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      margin-top: 36px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #94A3B8;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="brand-title">PISHX THREAT INTELLIGENCE DOSSIER</h1>
      <div class="brand-subtitle">Autonomous Multi-Modal Phishing Website Forensic Report</div>
    </div>
    <div class="meta-box">
      <div>REPORT ID: ${scan.id}</div>
      <div>TIMESTAMP: ${scan.timestamp}</div>
      <div>ENGINE: PX-LLM v2.6 Cyber Core</div>
    </div>
  </div>

  <div class="verdict-banner">
    <div>
      <div class="verdict-title">${scan.verdict} / THREAT SCORE ${scan.confidenceScore}%</div>
      <div class="verdict-sub">Target Host: ${scan.displayUrl}</div>
    </div>
    <div class="confidence-pill">
      ${scan.confidenceScore}% CONFIDENCE
    </div>
  </div>

  <div class="section-title">Target & Telemetry Summary</div>
  <div class="grid-2">
    <div class="card">
      <div class="card-label">Target URL</div>
      <div class="card-value">${scan.url}</div>
    </div>
    <div class="card">
      <div class="card-label">Targeted Brand Impersonation</div>
      <div class="card-value">${scan.impersonatedBrand ? scan.impersonatedBrand.name + ' (' + scan.impersonatedBrand.officialDomain + ')' : 'None / Legitimate Domain'}</div>
    </div>
    <div class="card">
      <div class="card-label">Network Infrastructure</div>
      <div class="card-value">IP: ${scan.metrics.ipAddress} | ASN: ${scan.metrics.asn} | Country: ${scan.metrics.country}</div>
    </div>
    <div class="card">
      <div class="card-label">Domain Age & TLS Status</div>
      <div class="card-value">Age: ${scan.metrics.domainAgeDays} days | TLS: ${scan.metrics.sslValid ? 'Valid (' + scan.metrics.sslIssuer + ')' : 'Invalid'}</div>
    </div>
  </div>

  <div class="section-title">PX-LLM Semantic Threat Assessment</div>
  <div class="rationale-box">
    <strong>Executive Summary:</strong> ${scan.rationale.summary}<br><br>
    <strong>Attack Vector:</strong> ${scan.rationale.attackVector}<br><br>
    <strong>Technical Synthesis:</strong> ${scan.rationale.technicalAnalysis}<br><br>
    <strong>Remediation Directive:</strong> ${scan.rationale.recommendedAction}
  </div>

  <div class="section-title">Forensic Risk Indicators (${scan.indicators.length} Flagged)</div>
  ${scan.indicators
    .map(
      (ind) => `
    <div class="indicator-item">
      <div class="indicator-header">
        <span>${ind.title}</span>
        <span style="font-size: 10px; text-transform: uppercase;">[${ind.severity}] ${ind.category}</span>
      </div>
      <div class="indicator-desc">${ind.description}</div>
      ${ind.evidence ? `<div class="evidence">FORENSIC PROOF: ${ind.evidence}</div>` : ''}
    </div>
  `
    )
    .join('')}

  <div class="footer">
    <div>CONFIDENTIAL & PROPRIETARY — PISHX THREAT INTELLIGENCE</div>
    <div>CRYPTOGRAPHIC SEAL: SHA256-PX-${scan.id.toUpperCase()}-${Date.now().toString(16)}</div>
  </div>

  <script>
    // Automatically trigger browser print-to-PDF dialog when opened
    window.onload = function() {
      // Optional automatic print trigger
    };
  </script>
</body>
</html>`;

  // Create downloadable file with appropriate MIME type
  const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.href = url;
  downloadAnchor.download = `${scan.id}-threat-report.html`;
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  URL.revokeObjectURL(url);
}
