export interface TTSConfig { rate: number; pitch: number; volume: number; darkMode: boolean; fontSize: "small" | "medium" | "large"; }

let ttsConfig: TTSConfig = { rate: 0.9, pitch: 1.0, volume: 1.0, darkMode: false, fontSize: "medium" };

export const configureTTS = (c: Partial<TTSConfig>): TTSConfig => { ttsConfig = { ...ttsConfig, ...c }; return ttsConfig; };
export const getTTSConfig = (): TTSConfig => ({ ...ttsConfig });

export const prepareTextForSpeech = (text: string, chunkSize: number = 500): string[] => {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";
  for (const s of sentences) {
    if (current.length + s.length > chunkSize && current.length > 0) { chunks.push(current.trim()); current = ""; }
    current += s + " ";
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
};
