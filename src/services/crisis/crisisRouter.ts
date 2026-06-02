export type CrisisCategory = "suicide" | "self_harm" | "domestic_violence" | "overdose";

export interface CrisisDetectionInput {
  message: string;
}

export interface CrisisDetectionOutput {
  crisisDetected: boolean;
  category: CrisisCategory | null;
  response: string | null;
}

const CRISIS_PATTERNS: Record<CrisisCategory, RegExp[]> = {
  suicide: [
    /kill\s*myself/i, /end\s*my\s*life/i, /don't\s*want\s*to\s*(be\s*here|living|live|exist|go\s*on)/i,
    /suicide/i, /want\s*to\s*die/i, /better\s*off\s*dead/i, /take\s*my\s*(own\s*)?life/i,
    /no\s*reason\s*to\s*(live|go\s*on|be\s*here)/i,
  ],
  self_harm: [/cut\s*myself/i, /hurt\s*myself/i, /self\s*harm/i, /burn\s*myself/i, /harm\s*myself/i],
  domestic_violence: [
    /(he|she|they|partner|spouse|husband|wife)\s*(hit|hits|beat|beats|abuse|abuses|hurt|hurts)\s*(me|my)/i,
    /domestic\s*violence/i, /afraid\s*(of|for)\s*(my|our)\s*(safety|life)/i, /(he|she|they)\s*won't\s*let\s*me/i,
  ],
  overdose: [
    /overdose/i, /took\s*too\s*(many|much)/i,
    /(pills?|drugs?|substance)\s*and\s*(i|i'm|i\s*am)\s*(scared|worried|not\s*ok)/i,
    /can't\s*breathe\s*after/i, /naloxone/i, /narcan/i,
  ],
};

export const detectCrisis = (input: CrisisDetectionInput): CrisisDetectionOutput => {
  for (const [category, patterns] of Object.entries(CRISIS_PATTERNS)) {
    for (const pattern of patterns as RegExp[]) {
      if (pattern.test(input.message)) {
        return {
          crisisDetected: true,
          category: category as CrisisCategory,
          response: getCrisisResponse(category as CrisisCategory),
        };
      }
    }
  }
  return { crisisDetected: false, category: null, response: null };
};

import { getCrisisResponse } from "./crisisResponseFactory";
