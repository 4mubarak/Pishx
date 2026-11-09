import React, { useEffect, useState } from 'react';
import { ShieldAlert, CheckCircle2, Loader2, Sparkles, Binary, Network, Eye } from 'lucide-react';

interface ScanningStateProps {
  targetUrl: string;
}

const STEPS = [
  {
    label: 'Analyzing URL string...',
    sublabel: 'Lexical entropy calculation, punycode & homoglyph tokenization',
    icon: Binary,
  },
  {
    label: 'Fetching DOM elements...',
    sublabel: 'Extracting form submit actions, external script CDNs & hidden iframes',
    icon: Network,
  },
  {
    label: 'Evaluating brand alignment via PX-LLM...',
    sublabel: 'Vision screenshot correlation, logo OCR & semantic prompt heuristics',
    icon: Eye,
  },
  {
    label: 'Compiling final threat score...',
    sublabel: 'Synthesizing multi-modal risk vectors and confidence calibration',
    icon: Sparkles,
  },
];

export const ScanningState: React.FC<ScanningStateProps> = ({ targetUrl }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPct, setProgressPct] = useState(12);

  useEffect(() => {
    // Step progression across 2.5s (2500ms)
    const timers = [
      setTimeout(() => {
        setCurrentStepIndex(1);
        setProgressPct(40);
      }, 600),
      setTimeout(() => {
        setCurrentStepIndex(2);
        setProgressPct(70);
      }, 1300),
      setTimeout(() => {
        setCurrentStepIndex(3);
        setProgressPct(92);
      }, 2000),
      setTimeout(() => {
        setProgressPct(100);
      }, 2400),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-emerald-500/10 blur-[80px]" />

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Radar Sweep Animation Graphic */}
          <div className="relative flex h-48 w-48 shrink-0 items-center justify-center">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/30 bg-slate-950/80" />
            
            {/* Concentric rings */}
            <div className="absolute inset-4 rounded-full border border-emerald-500/20" />
            <div className="absolute inset-10 rounded-full border border-emerald-500/15" />
            <div className="absolute inset-16 rounded-full border border-emerald-500/10" />

            {/* Crosshair lines */}
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-emerald-500/20" />
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-emerald-500/20" />

            {/* Radar rotating sweep gradient */}
            <div className="absolute inset-0 animate-radar-sweep rounded-full overflow-hidden">
              <div 
                className="h-full w-full"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.4) 0deg, rgba(16, 185, 129, 0.05) 60deg, transparent 90deg)',
                }}
              />
            </div>

            {/* Center target icon */}
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400 bg-slate-900 text-emerald-400 shadow-md shadow-emerald-500/30">
              <ShieldAlert className="h-6 w-6 animate-pulse" />
            </div>

            {/* Simulated detected blips */}
            <span className="absolute top-8 right-10 h-2 w-2 rounded-full bg-red-500 shadow-sm shadow-red-500 animate-ping" />
            <span className="absolute bottom-12 left-10 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="absolute top-20 left-8 h-1 w-1 rounded-full bg-amber-400" />
          </div>

          {/* Progress Sequence & Status Details */}
          <div className="flex-1 w-full space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                  PX Multi-Layer Pipeline Execution
                </span>
                <span className="font-mono text-xs font-bold text-slate-300">
                  {progressPct}% Completed
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 transition-all duration-300 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Target URL indicator */}
              <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-400 font-mono truncate">
                <span className="text-slate-500">Target:</span>
                <span className="text-slate-200 font-semibold truncate">{targetUrl}</span>
              </div>
            </div>

            {/* Step list sequence */}
            <div className="space-y-2.5">
              {STEPS.map((step, idx) => {
                const isCompleted = currentStepIndex > idx;
                const isCurrent = currentStepIndex === idx;
                const IconComponent = step.icon;

                return (
                  <div
                    key={step.label}
                    className={`flex items-start gap-3 rounded-lg border px-3 py-2 transition-all ${
                      isCurrent
                        ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300 shadow-sm'
                        : isCompleted
                        ? 'border-slate-800 bg-slate-950/40 text-slate-300'
                        : 'border-slate-850/40 bg-slate-950/20 text-slate-600 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                      ) : (
                        <IconComponent className="h-4 w-4 text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold ${
                            isCurrent ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                          }`}
                        >
                          {step.label}
                        </span>
                        {isCurrent && (
                          <span className="rounded bg-emerald-950 px-1.5 py-0.2 font-mono text-[10px] text-emerald-400 border border-emerald-800/60 animate-pulse">
                            Processing
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-400 truncate">
                        {step.sublabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
