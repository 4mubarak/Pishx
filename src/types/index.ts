export type VerdictType = 'MALICIOUS' | 'SUSPICIOUS' | 'CLEAN';

export type SeverityType = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type IndicatorCategory = 
  | 'DOM_STRUCTURE' 
  | 'VISION_MISMATCH' 
  | 'TYPOSQUATTING' 
  | 'NETWORK_INFRA' 
  | 'SSL_HEURISTIC' 
  | 'CONTENT_ANALYSIS';

export interface RiskIndicator {
  id: string;
  category: IndicatorCategory;
  severity: SeverityType;
  title: string;
  description: string;
  evidence?: string;
  mitigation?: string;
}

export interface ImpersonatedBrand {
  name: string;
  officialDomain: string;
  similarityScore: number; // 0 - 100
  targetSector: string;
  logoDetected: boolean;
  brandIdentity: string;
}

export interface TechnicalMetrics {
  domainAgeDays: number;
  registrar: string;
  ipAddress: string;
  asn: string;
  country: string;
  sslIssuer: string;
  sslValid: boolean;
  sslDaysRemaining: number;
  dnssecEnabled: boolean;
  hasLoginForm: boolean;
  formActionExternal: boolean;
  externalFormEndpoint?: string;
  hasHiddenIframes: boolean;
  hasObfuscatedJs: boolean;
  tldTrustScore: number; // 0 - 100
  lexicalEntropy: number; // 0 - 10
}

export interface LLMRationale {
  summary: string;
  attackVector: string;
  deceptiveTactics: string[];
  evasionMechanisms: string[];
  recommendedAction: string;
  technicalAnalysis: string;
}

export interface ScanOptions {
  checkDom: boolean;
  useVision: boolean;
  deepWhois: boolean;
}

export interface DomInspectionData {
  formActionTarget?: string;
  inputFieldCount: number;
  hasPasswordField: boolean;
  hasCreditCardInputs: boolean;
  hiddenElementsCount: number;
  externalScriptDomains: string[];
  snippet: string;
}

export interface VisionInspectionData {
  screenshotUrl?: string;
  titleRendered: string;
  logoConfidence: number;
  layoutVisualMatch: string;
  homoglyphDetected: boolean;
  brandSimilarityPct: number;
}

export interface ScanResult {
  id: string;
  url: string;
  displayUrl: string;
  timestamp: string;
  verdict: VerdictType;
  confidenceScore: number; // e.g. 96.4
  scanDurationMs: number;
  impersonatedBrand: ImpersonatedBrand | null;
  optionsUsed: ScanOptions;
  scoreBreakdown: {
    heuristicScore: number; // 0 - 100
    visionScore: number; // 0 - 100
    llmSemanticScore: number; // 0 - 100
    infraScore: number; // 0 - 100
  };
  indicators: RiskIndicator[];
  rationale: LLMRationale;
  metrics: TechnicalMetrics;
  domData: DomInspectionData;
  visionData: VisionInspectionData;
  rawJson: Record<string, any>;
}

export interface SystemSettings {
  engineSensitivity: 'balanced' | 'aggressive' | 'strict';
  llmModelVersion: string;
  visionCheckResolution: 'standard' | 'high_definition';
  whoisTimeoutSec: number;
  alertWebhookUrl: string;
  autoLogScans: boolean;
  apiKey: string;
}
