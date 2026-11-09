import React from 'react';
import { ShieldCheck, ShieldAlert, Cpu, BookOpen, Settings, Activity } from 'lucide-react';

interface HeaderProps {
  onOpenDocs: () => void;
  onOpenSettings: () => void;
  activeTab: 'dashboard' | 'history';
  setActiveTab: (tab: 'dashboard' | 'history') => void;
  threatCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDocs,
  onOpenSettings,
  activeTab,
  setActiveTab,
  threatCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('dashboard');
            }}
            className="group flex items-center gap-2.5 text-slate-100 transition-opacity hover:opacity-90"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-sm shadow-emerald-950/50">
              <ShieldAlert className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">PX</span>
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">PhishX</span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">LLM Threat Intelligence</span>
            </div>
          </a>
        </div>

        {/* Center: Quick navigation tabs */}
        <nav className="hidden md:flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/60 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Scanner & Verdict
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Scan Logs</span>
            {threatCount > 0 && (
              <span className="rounded bg-red-950 px-1.5 py-0.2 text-[10px] font-bold text-red-400 border border-red-800/60">
                {threatCount} flagged
              </span>
            )}
          </button>
        </nav>

        {/* Right: Status Indicator & Utility Actions */}
        <div className="flex items-center gap-3">
          {/* Operational Status badge */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 text-xs text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
            <span className="font-mono font-medium text-[11px]">System API: Operational</span>
          </div>

          {/* Docs button */}
          <button
            type="button"
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            title="PX Engine Architecture & API Docs"
          >
            <BookOpen className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Docs</span>
          </button>

          {/* Settings button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            title="Configure PX Sensitivity & Thresholds"
          >
            <Settings className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};
