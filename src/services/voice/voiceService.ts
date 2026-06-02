export interface VoiceConfig { rate: number; pitch: number; volume: number; }

let config: VoiceConfig = { rate: 0.9, pitch: 1.0, volume: 1.0 };

export const configureVoice = (c: Partial<VoiceConfig>): VoiceConfig => { config = { ...config, ...c }; return config; };
export const getVoiceConfig = (): VoiceConfig => ({ ...config });

export const getVoiceSystemPrompt = (): string => {
  return `VOICE MODE — ACTIVE. Slightly slower pace. Pause after key points. Confirm understanding: "Does that make sense?" Keep sentences shorter. One thought per breath.`;
};
