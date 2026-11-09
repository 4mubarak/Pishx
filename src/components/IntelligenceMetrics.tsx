import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Code, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Fingerprint, 
  ShieldCheck, 
  Cpu, 
  Terminal,
  ExternalLink,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { ScanResult, RiskIndicator, SeverityType } from '../types';

interface IntelligenceMetricsProps {
  scan: ScanResult;
}

export const IntelligenceMetrics: React.FC<IntelligenceMetricsProps> = ({ scan }) => {
  const [activeTab, setActiveTab] = useState<'indicators' | 'dom_forensics' | 'raw_json'>('indicators');
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [expandedIndicatorId, setExpandedIndicatorId] = useState<string | null>(null);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(scan.rawJson, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scan.rawJson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${scan.id}-threat-intel.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getSeverityBadge = (severity: SeverityType) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="rounded bg-red-950/80 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-800/60 uppercase">
            Critical
          </span>
        );
      case 'HIGH':
        return (
          <span className="rounded bg-amber-950/80 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-800/60 uppercase">
            High
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="rounded bg-yellow-950/80 px-2 py-0.5 text-[10px] font-bold text-yellow-400 border border-yellow-800/60 uppercase">
            Medium
          </span>
        );
      case 'LOW':
        return (
          <span className="rounded bg-blue-950/80 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-800/60 uppercase">
            Low
          </span>
        );
      case 'INFO':
      default:
        return (
          <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800/60 uppercase">
            Info / Clean
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col space-y-6 rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl">
      {/* Tab Switcher Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white">Technical Intelligence & Forensics</h3>
          <p className="text-xs text-slate-400">Deep inspection metrics and neural LLM reasoning</p>
        </div>

        <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('indicators')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'indicators'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Fingerprint className="h-3.5 w-3.5" />
            <span>Risk Indicators</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dom_forensics')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'dom_forensics'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>DOM Forensics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('raw_json')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'raw_json'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>JSON Payload</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Risk Indicators & LLM Rationale */}
      {activeTab === 'indicators' && (
        <div className="space-y-6">
          {/* LLM RATIONALE TEXT BLOCK */}
          <div className="rounded-xl border border-slate-750 bg-slate-950/70 p-5 shadow-inner">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  PX-LLM Natural Language Threat Rationale
                </h4>
              </div>
              <span className="font-mono text-[10px] text-slate-500">Model: Gemini-PX-Cyber-2.6</span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p className="font-medium text-slate-100 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {scan.rationale.summary}
              </p>

              <div>
                <span className="font-semibold text-slate-400 block mb-1">Technical Synthesis:</span>
                <p className="text-slate-300">{scan.rationale.technicalAnalysis}</p>
              </div>

              {scan.rationale.deceptiveTactics.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-400 block mb-1.5">
                    Deceptive Behavioral Patterns:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {scan.rationale.deceptiveTactics.map((tactic, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 rounded-md bg-slate-900/40 p-2 border border-slate-800/80 text-[11px]"
                      >
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {scan.rationale.evasionMechanisms.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-400 block mb-1.5">
                    Evasion & Defense Defeat Mechanisms:
                  </span>
                  <ul className="space-y-1">
                    {scan.rationale.evasionMechanisms.map((mech, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="text-red-400">✕</span>
                        <span>{mech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800/60 flex items-start gap-2 text-[11px]">
                <span className="font-semibold text-emerald-400 shrink-0">Analyst Recommendation:</span>
                <span className="text-slate-300">{scan.rationale.recommendedAction}</span>
              </div>
            </div>
          </div>

          {/* STRUCTURED LIST OF DETECTED RISK INDICATORS */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Detected Risk Indicators ({scan.indicators.length})
                </h4>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Click indicator for evidence
              </span>
            </div>

            <div className="space-y-2.5">
              {scan.indicators.map((indicator) => {
                const isExpanded = expandedIndicatorId === indicator.id;
                return (
                  <div
                    key={indicator.id}
                    className={`rounded-xl border transition-all ${
                      indicator.severity === 'CRITICAL'
                        ? 'border-red-900/60 bg-red-950/20'
                        : indicator.severity === 'HIGH'
                        ? 'border-amber-900/60 bg-amber-950/20'
                        : indicator.severity === 'MEDIUM'
                        ? 'border-yellow-900/40 bg-yellow-950/15'
                        : 'border-slate-800 bg-slate-950/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedIndicatorId(isExpanded ? null : indicator.id)
                      }
                      className="flex w-full items-start justify-between p-3.5 text-left transition-colors hover:bg-slate-800/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {indicator.severity === 'CRITICAL' || indicator.severity === 'HIGH' ? (
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                          ) : indicator.severity === 'MEDIUM' ? (
                            <AlertTriangle className="h-4 w-4 text-amber-400" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold text-slate-100">
                              {indicator.title}
                            </span>
                            {getSeverityBadge(indicator.severity)}
                            <span className="text-[10px] font-mono text-slate-500 uppercase">
                              {indicator.category}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400 leading-normal">
                            {indicator.description}
                          </p>
                        </div>
                      </div>

                      <div className="ml-2 mt-0.5 text-slate-500">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </button>

                    {/* Evidence Drawer */}
                    {isExpanded && indicator.evidence && (
                      <div className="border-t border-slate-800/80 bg-slate-950/80 p-3.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                          Extracted Forensic Evidence:
                        </span>
                        <pre className="rounded bg-slate-900 p-2.5 font-mono text-[11px] text-emerald-300 break-all overflow-x-auto border border-slate-800">
                          {indicator.evidence}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DOM & Network Forensics */}
      {activeTab === 'dom_forensics' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Authentication Elements
              </span>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center justify-between text-slate-300">
                  <span>Input Field Count</span>
                  <span className="font-mono font-bold text-white">{scan.domData.inputFieldCount}</span>
                </li>
                <li className="flex items-center justify-between text-slate-300">
                  <span>Password Input Present</span>
                  <span
                    className={`font-mono font-bold ${
                      scan.domData.hasPasswordField ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    {scan.domData.hasPasswordField ? 'YES' : 'NO'}
                  </span>
                </li>
                <li className="flex items-center justify-between text-slate-300">
                  <span>Credit Card Field Harvesting</span>
                  <span
                    className={`font-mono font-bold ${
                      scan.domData.hasCreditCardInputs ? 'text-red-400' : 'text-slate-400'
                    }`}
                  >
                    {scan.domData.hasCreditCardInputs ? 'CRITICAL DETECTED' : 'NONE'}
                  </span>
                </li>
                <li className="flex items-center justify-between text-slate-300">
                  <span>Hidden / Cloaked Elements</span>
                  <span className="font-mono font-bold text-slate-200">
                    {scan.domData.hiddenElementsCount}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Network Exfiltration Target
              </span>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-slate-500 block text-[10px]">Form POST Target:</span>
                  <span className="font-mono font-semibold text-red-300 break-all block">
                    {scan.domData.formActionTarget || 'Same-origin form action'}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-500 block text-[10px]">External Scripts:</span>
                  {scan.domData.externalScriptDomains.map((domain, i) => (
                    <span
                      key={i}
                      className="inline-block rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300 mr-1 mt-1"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Captured DOM Snippet */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Captured Form Structure (HTML Extract)
              </span>
              <span className="text-[10px] font-mono text-slate-500">DOM Sandbox View</span>
            </div>
            <pre className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800 leading-relaxed">
              {scan.domData.snippet}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: Raw JSON Response Payload */}
      {activeTab === 'raw_json' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              API Response Payload ({JSON.stringify(scan.rawJson).length} bytes)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyJson}
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                {copiedJson ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadJson}
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <pre className="max-h-[420px] overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-400 leading-relaxed shadow-inner">
            {JSON.stringify(scan.rawJson, null, 2)}
          </pre>
        </div>
      )}

      {/* RAW JSON RESPONSE COLLAPSIBLE ACCORDION (Always accessible as requested in spec) */}
      {activeTab !== 'raw_json' && (
        <div className="border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={() => setIsJsonOpen(!isJsonOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-850 bg-slate-950/70 p-3.5 text-left transition-colors hover:bg-slate-850"
          >
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-200">
                Raw JSON Threat Response
              </span>
              <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] font-mono text-slate-400">
                API Output
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{isJsonOpen ? 'Collapse' : 'Expand'}</span>
              {isJsonOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </button>

          {isJsonOpen && (
            <div className="mt-3 space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-end gap-2 pb-2">
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                >
                  {copiedJson ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedJson ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </button>
              </div>
              <pre className="max-h-72 overflow-auto font-mono text-xs text-emerald-300 leading-relaxed">
                {JSON.stringify(scan.rawJson, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
