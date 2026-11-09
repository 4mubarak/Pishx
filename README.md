# Pishx — LLM-Powered Phishing Website Detection System

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-emerald.svg)](LICENSE)
[![Security](https://img.shields.io/badge/SOC%202-Compliant%20Architecture-10B981.svg)]()

> **Pishx (PX)** is an advanced, multi-modal threat intelligence system engineered to detect zero-day phishing websites, brand impersonation lures, credential harvesters, and Adversary-in-the-Middle (AiTM) reverse proxies before they appear on global blocklists.

---

## ⚡ Key Highlights

- **Multi-Modal Inspection Pipeline**:
  - **Layer 1: Lexical & DNS Heuristics**: Shannon entropy calculation, Punycode/homoglyph decoding, nested subdomain depth analysis, and TLD reputation scoring.
  - **Layer 2: Real-time DOM Sandbox**: Detects external form `action` targets, credential harvesting inputs, cloaked hidden iframes, and anti-debugging scripts.
  - **Layer 3: Computer Vision Cosine Match**: Headless rendering with logo OCR, brand layout embeddings, and visual similarity scoring.
  - **Layer 4: PX-LLM Semantic Synthesis**: Natural language threat rationale evaluating psychological urgency cues, coercion vectors, and session-relay proxies (Evilginx2/Modlishka).
- **Interactive Verdict Dashboard**:
  - Radial SVG gauge for calibrated confidence scores (e.g., 98.4%).
  - Impersonated brand detection with official domain and visual spoof similarity.
  - Infrastructure telemetry (domain age, TLS certificate lineage, ASN, country).
  - Expandable forensic evidence drawers for all risk indicators.
- **Developer Tools**:
  - Formatted JSON response viewer with one-click copy and file download.
  - Searchable, filterable scan logs table with CSV export.
  - Built-in documentation & configuration modals.
  - Pre-loaded sample scenarios for instant 1-click testing (PayPal, Microsoft 365, Solana drainer, Google, GitHub).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or 20+
- npm or bun

### 1. Clone the repository
```bash
git clone https://github.com/4mubarak/Pishx.git
cd Pishx
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🧠 Multi-Modal Architecture

```
                  ┌────────────────────────────────────────┐
                  │          Target URL Input              │
                  └──────────────────┬─────────────────────┘
                                     │
           ┌─────────────────────────┼────────────────────────┐
           ▼                         ▼                        ▼
┌────────────────────┐    ┌─────────────────────┐   ┌──────────────────┐
│  Lexical & DNS     │    │   DOM Sandbox       │   │  Computer Vision │
│  - Shannon Entropy │    │   - Form POST target│   │  - Screenshot OCR│
│  - Homoglyphs      │    │   - Credential inputs│  │  - Cosine Distance│
│  - WHOIS Domain Age│    │   - Obfuscated JS   │   │  - Brand Spoofing│
└──────────┬─────────┘    └──────────┬──────────┘   └─────────┬────────┘
           │                         │                        │
           └─────────────────────────┼────────────────────────┘
                                     ▼
                   ┌──────────────────────────────────┐
                   │    PX-LLM Semantic Reasoning     │
                   │    - Deceptive Tactics Analysis  │
                   │    - AiTM Session Proxy Detection│
                   │    - Coercive Urgency Evaluation │
                   └─────────────────┬────────────────┘
                                     ▼
                   ┌──────────────────────────────────┐
                   │      Final Threat Verdict        │
                   │  (MALICIOUS / SUSPICIOUS / CLEAN)│
                   └──────────────────────────────────┘
```

---

## 📊 Threat Classification Taxonomy

| Verdict | Definition | Typical Signatures |
| :--- | :--- | :--- |
| **MALICIOUS / PHISHING** | Confirmed threat designed to steal credentials, 2FA tokens, or financial assets. | External form exfiltration, zero-day domain age (<48h), exact logo clone on unregistered ASN, AiTM reverse proxy. |
| **SUSPICIOUS / HIGH RISK** | Elevated anomaly heuristics detected; caution required. | Disposable high-entropy domain, missing SSL lineage, airdrop urgency lure without verifiable origin. |
| **CLEAN / LEGITIMATE** | Cryptographically verified origin with historical reputation. | Legitimate enterprise ASN, valid EV/Wildcard certificate, strict CSP, same-origin form actions. |

---

## 🛠️ Tech Stack

- **Framework**: React 19 (SPA) with TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 with custom dark cybersecurity theme
- **Icons**: Lucide React
- **Animations**: CSS Keyframe radar sweeps, scanline pulses, and SVG gauge offsets
- **Fonts**: Plus Jakarta Sans (UI) & JetBrains Mono (Data strings, URLs, JSON)

---

## 🛡️ API Spec Example

```bash
curl -X POST https://api.px-defense.internal/v2/analyze \
  -H "Authorization: Bearer nipost_test_c4121f39a17a871433a3a04822b665e892d1e33ef42dd144" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://paypal-security-verification.acc-recovery-928.top/login",
    "options": {
      "check_dom": true,
      "use_vision": true,
      "deep_whois": true
    }
  }'
```

---

## 📄 License

This project is licensed under the Apache License 2.0.
