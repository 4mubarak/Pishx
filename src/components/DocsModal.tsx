import React from 'react';
import { X, BookOpen, ShieldCheck, Cpu, Code2, Terminal, Check, Copy } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [copiedCurl, setCopiedCurl] = React.useState(false);

  if (!isOpen) return null;

  const curlExample = `curl -X POST https://api.px-defense.internal/v2/analyze \\
  -H "Authorization: Bearer px_live_9f81a7b8e..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://paypal-security-verification.acc-recovery-928.top/login",
    "options": {
      "check_dom": true,
      "use_vision": true,
      "deep_whois": true
    }
  }'`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlExample);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              PX Phishing Intelligence Engine Documentation
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
          {/* Architecture Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-2">
              1. Multi-Modal Detection Architecture
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              PX operates a hybrid detection pipeline combining four synchronized inspection layers to intercept novel phishing kits before threat feeds catalog them:
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="font-bold text-white block mb-1">Layer 1: Lexical Entropy & DNS</span>
                <p className="text-slate-400">
                  Calculates Shannon entropy, punycode conversions, nested subdomain depths, and registrar trust scoring.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="font-bold text-white block mb-1">Layer 2: Real-time DOM Sandbox</span>
                <p className="text-slate-400">
                  Parses HTML input fields, form POST endpoints, cloaked external iframes, and anti-debugging scripts.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="font-bold text-white block mb-1">Layer 3: Computer Vision Cosine Match</span>
                <p className="text-slate-400">
                  Renders headless viewport screenshots, extracting brand logos and layout embeddings to calculate visual usurpation distance.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="font-bold text-white block mb-1">Layer 4: PX-LLM Semantic Synthesis</span>
                <p className="text-slate-400">
                  Evaluates psychological urgency, social engineering hooks, and AiTM session-relay proxies (Evilginx2/Modlishka).
                </p>
              </div>
            </div>
          </div>

          {/* Threat Taxonomy */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-2">
              2. Threat Classification Taxonomy
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="rounded bg-red-950 px-2 py-0.5 font-bold text-red-400 border border-red-800/60 uppercase">
                  MALICIOUS
                </span>
                <p className="text-slate-300">
                  Confirmed active phishing lure, credential harvester, brand spoofing attack, or malicious smart contract drainer.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="rounded bg-amber-950 px-2 py-0.5 font-bold text-amber-400 border border-amber-800/60 uppercase">
                  SUSPICIOUS
                </span>
                <p className="text-slate-300">
                  High-entropy disposable domain, missing SSL lineage, or unverified asset embedding requiring caution or interstitial gating.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="rounded bg-emerald-950 px-2 py-0.5 font-bold text-emerald-400 border border-emerald-800/60 uppercase">
                  CLEAN
                </span>
                <p className="text-slate-300">
                  Cryptographically verified origin, intact DNSSEC, high-reputation historical infrastructure, and safe DOM actions.
                </p>
              </div>
            </div>
          </div>

          {/* API Integration */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                3. REST API Integration
              </h3>
              <button
                type="button"
                onClick={handleCopyCurl}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copiedCurl ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedCurl ? 'Copied curl' : 'Copy curl'}</span>
              </button>
            </div>
            <pre className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
              {curlExample}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-800 px-6 py-3.5 bg-slate-950/60">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
