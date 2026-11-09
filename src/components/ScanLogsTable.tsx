import React, { useState } from 'react';
import { 
  History, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Eye, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  Filter,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { ScanResult, VerdictType } from '../types';

interface ScanLogsTableProps {
  logs: ScanResult[];
  onSelectScan: (scan: ScanResult) => void;
  activeScanId: string | null;
  onClearLogs: () => void;
}

export const ScanLogsTable: React.FC<ScanLogsTableProps> = ({
  logs,
  onSelectScan,
  activeScanId,
  onClearLogs,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [csvExportSuccess, setCsvExportSuccess] = useState(false);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.impersonatedBrand?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVerdict =
      filterVerdict === 'ALL' || log.verdict === filterVerdict;

    return matchesSearch && matchesVerdict;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    if (logs.length === 0) return;
    setIsExportingCsv(true);

    const targetList = filteredLogs.length > 0 ? filteredLogs : logs;
    const headers = [
      'Scan ID',
      'Timestamp (UTC)',
      'Target URL',
      'Classification Verdict',
      'Confidence Score (%)',
      'Impersonated Brand',
      'Target Sector',
      'Domain Age (Days)',
      'TLS / SSL Valid',
      'SSL Issuer',
      'Hosting IP',
      'Country',
      'ASN',
      'External Form Action Target',
      'Critical Indicators Count',
      'Threat Rationale Summary',
    ];

    const escapeCsv = (str: string | undefined | null) => {
      if (!str) return '""';
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = targetList.map((l) => [
      escapeCsv(l.id),
      escapeCsv(l.timestamp),
      escapeCsv(l.url),
      escapeCsv(l.verdict),
      `${l.confidenceScore}%`,
      escapeCsv(l.impersonatedBrand?.name || 'N/A'),
      escapeCsv(l.impersonatedBrand?.targetSector || 'N/A'),
      l.metrics.domainAgeDays,
      l.metrics.sslValid ? 'YES' : 'NO',
      escapeCsv(l.metrics.sslIssuer),
      escapeCsv(l.metrics.ipAddress),
      escapeCsv(l.metrics.country),
      escapeCsv(l.metrics.asn),
      escapeCsv(l.domData.formActionTarget || 'None'),
      l.indicators.length,
      escapeCsv(l.rationale.summary),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `px-phishing-threat-report-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();

    setIsExportingCsv(false);
    setCsvExportSuccess(true);
    setTimeout(() => setCsvExportSuccess(false), 2500);
  };

  const renderBadge = (verdict: VerdictType) => {
    switch (verdict) {
      case 'MALICIOUS':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-red-950/80 px-2 py-0.5 text-xs font-bold text-red-400 border border-red-800/60 uppercase">
            <ShieldAlert className="h-3 w-3" />
            <span>Malicious</span>
          </span>
        );
      case 'SUSPICIOUS':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-950/80 px-2 py-0.5 text-xs font-bold text-amber-400 border border-amber-800/60 uppercase">
            <AlertTriangle className="h-3 w-3" />
            <span>Suspicious</span>
          </span>
        );
      case 'CLEAN':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-950/80 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-800/60 uppercase">
            <ShieldCheck className="h-3 w-3" />
            <span>Clean</span>
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
      {/* Table Top Toolbar */}
      <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-300">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Recent Scan Logs</h3>
            <p className="text-xs text-slate-400">
              Historical inspection log of queried domains and threat classifications
            </p>
          </div>
        </div>

        {/* Filter buttons & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search box */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by URL or brand..."
              className="rounded-lg border border-slate-800 bg-slate-950 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none w-48 sm:w-56"
            />
          </div>

          {/* Verdict Filter Selectors */}
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-0.5 text-xs">
            {['ALL', 'MALICIOUS', 'SUSPICIOUS', 'CLEAN'].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setFilterVerdict(v)}
                className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  filterVerdict === v
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {v === 'ALL' ? 'All' : v.charAt(0) + v.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Export CSV Report Button */}
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={logs.length === 0 || isExportingCsv}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all shadow-sm ${
              csvExportSuccess
                ? 'border-emerald-500/80 bg-emerald-950/80 text-emerald-300'
                : 'border-slate-700 bg-slate-900 text-slate-100 hover:border-emerald-500/50 hover:bg-slate-800 hover:text-white'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            title="Export complete scan telemetry to CSV"
          >
            {csvExportSuccess ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Exported CSV!</span>
              </>
            ) : (
              <>
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
                <span>Export CSV Report</span>
              </>
            )}
          </button>

          {/* Clear Logs */}
          {logs.length > 0 && (
            <button
              type="button"
              onClick={onClearLogs}
              className="flex items-center gap-1 rounded-lg border border-slate-800/80 bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:border-red-900/60 hover:text-red-400 transition-colors"
              title="Clear scan history"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950/80 font-mono text-[11px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-4">Target URL</th>
              <th className="py-3.5 px-4">Impersonated Target</th>
              <th className="py-3.5 px-4">Classification</th>
              <th className="py-3.5 px-4 text-right">Confidence</th>
              <th className="py-3.5 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <History className="h-8 w-8 text-slate-700" />
                    <span>No scan logs match your search or filter criteria.</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => {
                const isActive = log.id === activeScanId;
                return (
                  <tr
                    key={log.id}
                    className={`transition-colors hover:bg-slate-800/40 ${
                      isActive ? 'bg-slate-800/60' : ''
                    }`}
                  >
                    {/* Timestamp */}
                    <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    {/* Target URL with Truncation & Copy */}
                    <td className="py-3.5 px-4 max-w-xs md:max-w-md">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono font-medium text-slate-200 truncate block"
                          title={log.url}
                        >
                          {log.url}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyUrl(log.url, log.id)}
                          className="text-slate-500 hover:text-slate-300 transition-colors shrink-0"
                          title="Copy URL"
                        >
                          {copiedId === log.id ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Impersonated Brand */}
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      {log.impersonatedBrand ? (
                        <div className="flex items-center gap-1.5 font-medium text-red-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                          <span>{log.impersonatedBrand.name}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">None / Authentic</span>
                      )}
                    </td>

                    {/* Classification Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderBadge(log.verdict)}
                    </td>

                    {/* Confidence Score */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-200 whitespace-nowrap">
                      {log.confidenceScore}%
                    </td>

                    {/* Actions button */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onSelectScan(log)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition-colors ${
                          isActive
                            ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                            : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 p-4 text-[11px] text-slate-400 font-mono">
        <span>Showing {filteredLogs.length} of {logs.length} scan records · Auto-logging enabled</span>
        <button
          type="button"
          onClick={handleExportCsv}
          disabled={logs.length === 0 || isExportingCsv}
          className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors disabled:opacity-40"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download History (.csv)</span>
        </button>
      </div>
    </div>
  );
};
