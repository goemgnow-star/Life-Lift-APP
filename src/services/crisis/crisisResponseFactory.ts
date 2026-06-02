import { CrisisCategory } from "./crisisRouter";

export const getCrisisResponse = (category: CrisisCategory): string => {
  switch (category) {
    case "suicide":
      return "I hear you, and I want you to know you're not alone. The 988 Suicide & Crisis Lifeline is here right now — you can call or text 988 anytime, 24/7.";
    case "self_harm":
      return "I hear you. What you're feeling matters. 988 is here — call or text 988 anytime, 24/7. Can we try grounding together? Name 5 things you can see.";
    case "domestic_violence":
      return "What you're describing sounds unsafe. The National Domestic Violence Hotline is 1-800-799-7233. Call or text them — they are trained and confidential.";
    case "overdose":
      return "This is an emergency. Call 911 immediately. SAMHSA National Helpline: 1-800-662-4357.";
    default:
      return "If you're in crisis, 988 is here 24/7. Call or text 988.";
  }
};

export const getAllCrisisResources = (): string => {
  return "CRISIS RESOURCES:\n988 — Suicide & Crisis Lifeline\n1-800-662-4357 — SAMHSA\n1-800-799-7233 — Domestic Violence\n211 — Community Resources\n911 — Emergency";
};
