export interface CaptionSettings { enabled: boolean; fontSize: "small" | "medium" | "large"; }

let settings: CaptionSettings = { enabled: true, fontSize: "medium" };

export const getCaptionSettings = (): CaptionSettings => ({ ...settings });
export const updateCaptionSettings = (s: Partial<CaptionSettings>): CaptionSettings => { settings = { ...settings, ...s }; return settings; };
export const enforceCaptionsByDefault = (source: string): boolean => source.endsWith(".mp4");
