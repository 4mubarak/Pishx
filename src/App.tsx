import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroScanner } from './components/HeroScanner';
import { ScanningState } from './components/ScanningState';
import { VerdictCard } from './components/VerdictCard';
import { IntelligenceMetrics } from './components/IntelligenceMetrics';
import { ScanLogsTable } from './components/ScanLogsTable';
import { DocsModal } from './components/DocsModal';
import { SettingsModal } from './components/SettingsModal';
import { INITIAL_MOCK_SCANS, analyzeTargetUrl } from './data/mockScans';
import { ScanResult, ScanOptions, SystemSettings } from './types';
import { ShieldCheck, ShieldAlert, Sparkles, Activity, Layers, Terminal } from 'lucide-react';

export default function App() {
  const [scanLogs, setScanLogs] = useState<ScanResult[]>(INITIAL_MOCK_SCANS);
  const [activeScan, setActiveScan] = useState<ScanResult | null>(INITIAL_MOCK_SCANS[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanningUrl, setScanningUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard');
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    engineSensitivity: 'balanced',
    llmModelVersion: 'Gemini-PX-Cyber-2.6',
    visionCheckResolution: 'standard',
    whoisTimeoutSec: 8,
    alertWebhookUrl: 'https://security-ops.internal/webhooks/phish-alerts',
    autoLogScans: true,
  });

  const handleStartAnalysis = (url: string, options: ScanOptions) => {
    setScanningUrl(url);
    setIsScanning(true);
    setActiveTab('dashboard');

    // 2.5-second simulated deep scan across the 4 stages
    setTimeout(() => {
      const result = analyzeTargetUrl(url, options);
      setActiveScan(result);
      setIsScanning(false);

      if (systemSettings.autoLogScans) {
        setScanLogs((prev) => [result, ...prev.filter((p) => p.url !== result.url)]);
      }
    }, 2500);
  };

  const handleSelectFromHistory = (scan: ScanResult) => {
    setActiveScan(scan);
    setActiveTab('dashboard');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleClearLogs = () => {
    setScanLogs([]);
  };

  const threatCount = scanLogs.filter((s) => s.verdict === 'MALICIOUS').length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 cyber-grid selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <Header
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        threatCount={threatCount}
      />

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' ? (
          <>
            {/* HERO SCAN SECTION */}
            <HeroScanner
              onAnalyze={handleStartAnalysis}
              isScanning={isScanning}
              activeUrl={activeScan?.url || ''}
            />

            {/* LIVE LOADING / SCANNING STATE */}
            {isScanning && <ScanningState targetUrl={scanningUrl} />}

            {/* RESULTS VISUALIZATION DASHBOARD (2-COLUMN LAYOUT) */}
            {!isScanning && activeScan && (
              <section className="mt-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        Deep Threat Forensics Dashboard
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <span className="text-slate-500">Active Record:</span>
                    <span className="text-emerald-400 font-semibold">{activeScan.id}</span>
                  </div>
                </div>

                {/* 2-Column Responsive Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column (Verdict Card) */}
                  <div className="lg:col-span-5">
                    <VerdictCard scan={activeScan} />
                  </div>

                  {/* Right Column (Technical Intelligence Metrics) */}
                  <div className="lg:col-span-7">
                    <IntelligenceMetrics scan={activeScan} />
                  </div>
                </div>
              </section>
            )}

            {/* RECENT SCAN LOGS TABLE */}
            <section className="mt-14">
              <ScanLogsTable
                logs={scanLogs}
                onSelectScan={handleSelectFromHistory}
                activeScanId={activeScan?.id || null}
                onClearLogs={handleClearLogs}
              />
            </section>
          </>
        ) : (
          /* History View Tab */
          <section className="py-8">
            <ScanLogsTable
              logs={scanLogs}
              onSelectScan={handleSelectFromHistory}
              activeScanId={activeScan?.id || null}
              onClearLogs={handleClearLogs}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 font-mono">PX PhishX</span>
            <span>·</span>
            <span>LLM-Powered Multi-Modal Phishing Detection System</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>SOC 2 Type II Architecture</span>
            <span>·</span>
            <span>Zero-Day Heuristic Shield</span>
          </div>
        </div>
      </footer>

      {/* Documentation Modal */}
      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />

      {/* System Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={systemSettings}
        onSaveSettings={setSystemSettings}
      />
    </div>
  );
}
