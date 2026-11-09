import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Search, 
  ArrowRight, 
  CheckSquare, 
  Square, 
  Sparkles, 
  RefreshCw, 
  AlertTriangle, 
  ShieldCheck, 
  Zap,
  History,
  Clock,
  ChevronDown,
  X,
  ExternalLink
} from 'lucide-react';
import { ScanOptions } from '../types';
import { PRESET_SAMPLE_URLS, INITIAL_MOCK_SCANS } from '../data/mockScans';

interface HeroScannerProps {
  onAnalyze: (url: string, options: ScanOptions) => void;
  isScanning: boolean;
  activeUrl: string;
}

const STORAGE_KEY = 'px_recent_searches_v1';

export const HeroScanner: React.FC<HeroScannerProps> = ({
  onAnalyze,
  isScanning,
  activeUrl,
}) => {
  const [inputUrl, setInputUrl] = useState(activeUrl);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize recent searches from localStorage or fallback to initial mock scans
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 5);
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_MOCK_SCANS.slice(0, 5).map((s) => s.url);
  });

  const [options, setOptions] = useState<ScanOptions>({
    checkDom: true,
    useVision: true,
    deepWhois: false,
  });

  // Keep input in sync with external activeUrl updates if changed
  useEffect(() => {
    if (activeUrl && activeUrl !== inputUrl) {
      setInputUrl(activeUrl);
    }
  }, [activeUrl]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Save to recent searches (max 5 items, unique, most recent first)
  const saveRecentSearch = (urlToSave: string) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((u) => u.toLowerCase() !== urlToSave.toLowerCase());
      const updated = [urlToSave, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore quota errors
      }
      return updated;
    });
  };

  const removeRecentSearch = (urlToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((u) => u !== urlToRemove);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const clearAllRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setValidationError('Please enter a target URL or domain to analyze.');
      return;
    }
    setValidationError(null);
    saveRecentSearch(trimmed);
    setIsDropdownOpen(false);
    onAnalyze(trimmed, options);
  };

  const handleSelectRecent = (url: string) => {
    setInputUrl(url);
    setValidationError(null);
    saveRecentSearch(url);
    setIsDropdownOpen(false);
    onAnalyze(url, options);
  };

  const handleSelectPreset = (presetUrl: string) => {
    setInputUrl(presetUrl);
    setValidationError(null);
    saveRecentSearch(presetUrl);
    setIsDropdownOpen(false);
    onAnalyze(presetUrl, options);
  };

  const toggleOption = (key: keyof ScanOptions) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      {/* Background radial gradient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-[700px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="h-64 w-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Title & Subtitle */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Multi-Modal Deep LLM Phishing Defense</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Autonomous URL & DOM <span className="text-emerald-400">Threat Inspection</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            Detect zero-day phishing kits, brand homoglyphs, credential harvesters, and AiTM proxies using semantic neural analysis and synthetic computer vision.
          </p>
        </div>

        {/* Central Scan Input Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
              {/* URL Input Box & Dropdown Container */}
              <div ref={dropdownRef} className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <Globe className="h-5 w-5" />
                </div>
                
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  disabled={isScanning}
                  placeholder="Enter target URL to analyze (e.g., https://example-secure-login.com)..."
                  className="w-full rounded-xl border border-slate-750 bg-slate-950/90 py-3.5 pr-28 pl-11 font-mono text-sm text-slate-100 placeholder-slate-500 shadow-inner transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:opacity-50"
                />

                {/* Right controls inside input: Clear & Recent Searches Dropdown Trigger */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 gap-1">
                  {inputUrl && !isScanning && (
                    <button
                      type="button"
                      onClick={() => setInputUrl('')}
                      className="px-1.5 py-1 text-[11px] font-medium text-slate-400 hover:text-slate-200 transition-colors"
                      title="Clear input"
                    >
                      Clear
                    </button>
                  )}

                  {/* Recent Searches Dropdown Button */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium transition-all ${
                      isDropdownOpen
                        ? 'border-emerald-500/50 bg-emerald-950/50 text-emerald-300'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-850 hover:text-white'
                    }`}
                    title="Quick-access Recent Searches"
                  >
                    <History className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="hidden md:inline text-[11px]">Recent</span>
                    <ChevronDown
                      className={`h-3 w-3 text-slate-400 transition-transform ${
                        isDropdownOpen ? 'rotate-180 text-emerald-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Quick-Access Recent Searches Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-slate-750 bg-slate-950/95 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between border-b border-slate-800/80 px-3.5 py-2.5 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                        <Clock className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Recent Searches</span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.2 font-mono text-[10px] text-slate-400">
                          {recentSearches.length}/5
                        </span>
                      </div>
                      {recentSearches.length > 0 && (
                        <button
                          type="button"
                          onClick={clearAllRecent}
                          className="text-[11px] font-medium text-slate-500 hover:text-red-400 transition-colors"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {recentSearches.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">
                        No recent searches saved yet.
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-900 max-h-64 overflow-y-auto">
                        {recentSearches.map((url, idx) => (
                          <div
                            key={url}
                            onClick={() => handleSelectRecent(url)}
                            className="group flex items-center justify-between gap-3 px-3.5 py-2.5 text-xs cursor-pointer transition-colors hover:bg-slate-900"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <span className="font-mono text-[11px] text-slate-600 group-hover:text-emerald-400">
                                0{idx + 1}
                              </span>
                              <span className="font-mono text-slate-200 group-hover:text-emerald-300 truncate">
                                {url}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                                Re-analyze ↵
                              </span>
                              <button
                                type="button"
                                onClick={(e) => removeRecentSearch(url, e)}
                                className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-colors"
                                title="Remove from recent searches"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Analyze URL CTA Button */}
              <button
                type="submit"
                disabled={isScanning}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/35 focus:ring-2 focus:ring-emerald-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 sm:w-auto"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>Analyze URL</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="flex items-center gap-2 text-xs font-medium text-red-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Toggle Filters / Checkboxes */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={() => toggleOption('checkDom')}
                  disabled={isScanning}
                  className="flex items-center gap-2 cursor-pointer transition-colors hover:text-slate-200"
                >
                  {options.checkDom ? (
                    <CheckSquare className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-600" />
                  )}
                  <span className={options.checkDom ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                    Check Live DOM
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleOption('useVision')}
                  disabled={isScanning}
                  className="flex items-center gap-2 cursor-pointer transition-colors hover:text-slate-200"
                >
                  {options.useVision ? (
                    <CheckSquare className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-600" />
                  )}
                  <span className={options.useVision ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                    Use Vision (Screenshots)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleOption('deepWhois')}
                  disabled={isScanning}
                  className="flex items-center gap-2 cursor-pointer transition-colors hover:text-slate-200"
                >
                  {options.deepWhois ? (
                    <CheckSquare className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-600" />
                  )}
                  <span className={options.deepWhois ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                    Deep WHOIS Lookup
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                <Zap className="h-3 w-3 text-emerald-400" />
                <span>PX Neural Core active</span>
              </div>
            </div>
          </form>

          {/* Quick preset selector buttons for fast testing */}
          <div className="mt-5 border-t border-slate-800/80 pt-4">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                Instant Test Scenarios:
              </span>
              <span className="text-[11px] text-slate-500">1-click automated threat evaluation</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_SAMPLE_URLS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  disabled={isScanning}
                  onClick={() => handleSelectPreset(preset.url)}
                  className="group flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                >
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase border ${
                      preset.badge === 'MALICIOUS'
                        ? 'bg-red-950/70 text-red-400 border-red-800/50'
                        : preset.badge === 'SUSPICIOUS'
                        ? 'bg-amber-950/70 text-amber-400 border-amber-800/50'
                        : 'bg-emerald-950/70 text-emerald-400 border-emerald-800/50'
                    }`}
                  >
                    {preset.badge}
                  </span>
                  <span className="font-medium text-slate-200 group-hover:text-emerald-300">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
