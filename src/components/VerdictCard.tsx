import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Clock, 
  Lock, 
  Server, 
  Globe2, 
  CheckCircle2, 
  XCircle, 
  Building2,
  Copy,
  Check
} from 'lucide-react';
import { ScanResult } from '../types';

interface VerdictCardProps {
  scan: ScanResult;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ scan }) => {
  const [copiedUrl, setCopiedUrl] = React.useState(false);

  const isMalicious = scan.verdict === 'MALICIOUS';
  const isSuspicious = scan.verdict === 'SUSPICIOUS';
  const isClean = scan.verdict === 'CLEAN';

  // SVG Gauge calculations
  const radius = 64;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scan.confidenceScore / 100) * circumference;

  const handleCopy = () => {
    navigator.clipboard.writeText(scan.url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const getVerdictTheme = () => {
    if (isMalicious) {
      return {
        badgeText: 'MALICIOUS / PHISHING',
        subText: 'Critical Security Alert · Phishing Signature Confirmed',
        border: 'border-red-500/40',
        bg: 'bg-red-950/20',
        glow: 'cyber-glow-red',
        accentColor: 'text-red-400',
        badgeBg: 'bg-red-500 text-slate-950',
        gaugeStroke: '#EF4444',
        icon: ShieldAlert,
      };
    }
    if (isSuspicious) {
      return {
        badgeText: 'SUSPICIOUS / HIGH RISK',
        subText: 'Caution Required · Anomaly Heuristics Triggered',
        border: 'border-amber-500/40',
        bg: 'bg-amber-950/20',
        glow: 'cyber-glow-amber',
        accentColor: 'text-amber-400',
        badgeBg: 'bg-amber-400 text-slate-950',
        gaugeStroke: '#F59E0B',
        icon: AlertTriangle,
      };
    }
    return {
      badgeText: 'CLEAN / LEGITIMATE',
      subText: 'Cryptographically Verified · Authentic Infrastructure',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/20',
      glow: 'cyber-glow-emerald',
      accentColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500 text-slate-950',
      gaugeStroke: '#10B981',
      icon: ShieldCheck,
    };
  };

  const theme = getVerdictTheme();
  const VerdictIcon = theme.icon;

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border ${theme.border} bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl ${theme.glow} transition-all`}
    >
      {/* Top Section: Verdict Banner & Target URL */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
              SCAN VERDICT #{scan.id}
            </span>
            <span className="font-mono text-xs text-slate-500">{scan.timestamp}</span>
          </div>

          {/* Large Visible Risk Badge */}
          <div className="mt-3 flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-base font-extrabold tracking-wide uppercase shadow-lg ${theme.badgeBg}`}
            >
              <VerdictIcon className="h-5 w-5" />
              <span>{theme.badgeText}</span>
            </span>
          </div>
          <p className="mt-2 text-xs font-medium text-slate-300">{theme.subText}</p>
        </div>

        {/* Target URL with Copy Helper */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider">Target Domain / Path</span>
            <button
              onClick={handleCopy}
              type="button"
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
              title="Copy URL"
            >
              {copiedUrl ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span className="text-[10px]">{copiedUrl ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="font-mono text-xs text-slate-200 break-all select-all font-semibold">
            {scan.url}
          </div>
        </div>

        {/* Radial Confidence Gauge */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* SVG Circular Progress Gauge */}
            <div className="relative flex items-center justify-center">
              <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                <circle
                  stroke="#1E293B"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke={theme.gaugeStroke}
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={`${circumference} ${circumference}`}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-mono text-2xl font-black text-white tabular-nums">
                  {scan.confidenceScore}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Confidence
                </span>
              </div>
            </div>

            {/* Sub-Score Telemetry Bars */}
            <div className="w-full flex-1 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">LLM Semantic Assessment</span>
                <span className="font-mono font-semibold text-slate-200">
                  {scan.scoreBreakdown.llmSemanticScore}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                  style={{ width: `${scan.scoreBreakdown.llmSemanticScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Computer Vision Alignment</span>
                <span className="font-mono font-semibold text-slate-200">
                  {scan.scoreBreakdown.visionScore}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-400 transition-all duration-700"
                  style={{ width: `${scan.scoreBreakdown.visionScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Lexical & DOM Heuristics</span>
                <span className="font-mono font-semibold text-slate-200">
                  {scan.scoreBreakdown.heuristicScore}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-400 transition-all duration-700"
                  style={{ width: `${scan.scoreBreakdown.heuristicScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Impersonated Brand Alert Box */}
        {scan.impersonatedBrand ? (
          <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/40 bg-red-900/40 text-red-400">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                    Impersonated Brand Alert
                  </span>
                  <span className="font-mono text-xs font-bold text-red-300">
                    {scan.impersonatedBrand.similarityScore}% Visual Spoof
                  </span>
                </div>
                <h4 className="mt-1 text-sm font-bold text-white">
                  Targeting: {scan.impersonatedBrand.name}
                </h4>
                <div className="mt-2 flex flex-col gap-1 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Official Domain:</span>
                    <span className="font-mono font-semibold text-emerald-400">
                      https://{scan.impersonatedBrand.officialDomain}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {scan.impersonatedBrand.brandIdentity}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-900/40 text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-300">
                  Legitimate Identity Verified
                </span>
                <p className="text-[11px] text-slate-400">
                  No brand impersonation or trademark usurpation signatures detected.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Technical Infrastructure Snapshot */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400 block mb-3">
            Infrastructure Telemetry
          </span>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">Domain Age</span>
                <span className="font-mono font-semibold text-slate-200">
                  {scan.metrics.domainAgeDays} days
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-slate-500 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">SSL Status</span>
                <span
                  className={`font-mono font-semibold ${
                    scan.metrics.sslValid ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {scan.metrics.sslValid ? 'Valid TLS' : 'Invalid / Expired'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-slate-500 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">IP & ASN</span>
                <span className="font-mono font-semibold text-slate-200 truncate block">
                  {scan.metrics.ipAddress}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-slate-500 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">Hosting Country</span>
                <span className="font-mono font-semibold text-slate-200 truncate block">
                  {scan.metrics.country}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Engine stamp */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-500 font-mono">
        <span>Engine: PX-LLM v2.6</span>
        <span>Duration: {scan.scanDurationMs}ms</span>
      </div>
    </div>
  );
};
