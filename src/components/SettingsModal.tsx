import React, { useState } from 'react';
import { X, Settings, Sliders, Bell, Cpu, ShieldCheck, Check } from 'lucide-react';
import { SystemSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SystemSettings;
  onSaveSettings: (settings: SystemSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<SystemSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      engineSensitivity: 'balanced',
      llmModelVersion: 'Gemini-PX-Cyber-2.6',
      visionCheckResolution: 'standard',
      whoisTimeoutSec: 8,
      alertWebhookUrl: 'https://security-ops.internal/webhooks/phish-alerts',
      autoLogScans: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative flex flex-col w-full max-w-xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Settings className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">PX Detection System Settings</h2>
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
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm text-slate-300">
          {/* Engine Sensitivity */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Threat Engine Sensitivity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['balanced', 'aggressive', 'strict'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFormData({ ...formData, engineSensitivity: mode })}
                  className={`rounded-xl border p-2.5 text-center text-xs font-semibold capitalize transition-all ${
                    formData.engineSensitivity === mode
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              {formData.engineSensitivity === 'strict'
                ? 'Flags any newly registered domain with unfamiliar external scripts as Suspicious.'
                : formData.engineSensitivity === 'aggressive'
                ? 'Calibrates for zero false-negatives; highlights any brand logo mismatch.'
                : 'Balanced multi-modal risk threshold optimized for enterprise SOC workflows.'}
            </p>
          </div>

          {/* Model Engine */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              LLM Reasoning Engine
            </label>
            <select
              value={formData.llmModelVersion}
              onChange={(e) => setFormData({ ...formData, llmModelVersion: e.target.value })}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
            >
              <option value="Gemini-PX-Cyber-2.6">Gemini-PX-Cyber-2.6 (Multi-Modal Vision & Heuristics)</option>
              <option value="Gemini-PX-Flash-Fast">Gemini-PX-Flash-Fast (Sub-second Edge Triage)</option>
              <option value="PX-Offline-Airgap">PX-Offline-Airgap (Local Rule Heuristics Only)</option>
            </select>
          </div>

          {/* Vision Resolution */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Vision Snapshot Resolution
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="radio"
                  name="visionResolution"
                  checked={formData.visionCheckResolution === 'standard'}
                  onChange={() => setFormData({ ...formData, visionCheckResolution: 'standard' })}
                  className="text-emerald-500 focus:ring-emerald-400"
                />
                <span>Standard (1080p Desktop)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="radio"
                  name="visionResolution"
                  checked={formData.visionCheckResolution === 'high_definition'}
                  onChange={() => setFormData({ ...formData, visionCheckResolution: 'high_definition' })}
                  className="text-emerald-500 focus:ring-emerald-400"
                />
                <span>Retina / Mobile Responsive Emulation</span>
              </label>
            </div>
          </div>

          {/* WHOIS Timeout */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
              <span>Deep WHOIS Query Timeout</span>
              <span className="font-mono text-emerald-400">{formData.whoisTimeoutSec}s</span>
            </div>
            <input
              type="range"
              min={3}
              max={20}
              step={1}
              value={formData.whoisTimeoutSec}
              onChange={(e) => setFormData({ ...formData, whoisTimeoutSec: Number(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Alert Webhook */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              SIEM / Slack Webhook Integration
            </label>
            <input
              type="text"
              value={formData.alertWebhookUrl}
              onChange={(e) => setFormData({ ...formData, alertWebhookUrl: e.target.value })}
              placeholder="https://hooks.slack.com/services/..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-mono text-xs text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-500">
              Receives immediate JSON webhook alerts whenever a Malicious Phishing verdict is confirmed.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-slate-950/60">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            Reset to Defaults
          </button>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
