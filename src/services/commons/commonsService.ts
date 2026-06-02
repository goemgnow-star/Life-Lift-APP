export type ContentDepth = "grounding" | "building" | "growing";

export interface CommonsItem {
  id: number; pillar: string; depth: ContentDepth; title: string; source: string;
  duration_minutes: number; has_captions: boolean; offline_available: boolean;
}

const COMMONS_CONTENT: CommonsItem[] = [
  { id: 1, pillar: "mental", depth: "grounding", title: "5-Minute Breathing Exercise", source: "/content/breathing-exercise.mp4", duration_minutes: 5, has_captions: true, offline_available: true },
  { id: 2, pillar: "mental", depth: "grounding", title: "Understanding Your Nervous System", source: "/content/nervous-system.mp4", duration_minutes: 12, has_captions: true, offline_available: true },
  { id: 3, pillar: "mental", depth: "building", title: "Cognitive Reframing Techniques", source: "/content/cognitive-reframing.mp4", duration_minutes: 15, has_captions: true, offline_available: true },
  { id: 4, pillar: "mental", depth: "growing", title: "Advanced Emotional Regulation", source: "/content/emotional-regulation.mp4", duration_minutes: 20, has_captions: true, offline_available: true },
  { id: 5, pillar: "physical", depth: "grounding", title: "Gentle Morning Stretch Routine", source: "/content/morning-stretch.mp4", duration_minutes: 8, has_captions: true, offline_available: true },
  { id: 6, pillar: "physical", depth: "building", title: "Bodyweight Exercises for Small Spaces", source: "/content/bodyweight.mp4", duration_minutes: 15, has_captions: true, offline_available: true },
  { id: 7, pillar: "spiritual", depth: "grounding", title: "Finding Stillness in Chaos", source: "/content/stillness.mp3", duration_minutes: 10, has_captions: false, offline_available: true },
  { id: 8, pillar: "spiritual", depth: "building", title: "Exploring Your Values", source: "/content/values-exploration.mp3", duration_minutes: 20, has_captions: false, offline_available: true },
  { id: 9, pillar: "financial", depth: "grounding", title: "Tracking Your First Dollar", source: "/content/tracking-money.mp4", duration_minutes: 8, has_captions: true, offline_available: true },
  { id: 10, pillar: "financial", depth: "building", title: "Creating Your First Budget", source: "/content/first-budget.mp4", duration_minutes: 15, has_captions: true, offline_available: true },
  { id: 11, pillar: "financial", depth: "growing", title: "Introduction to Saving and Investing", source: "/content/saving-investing.mp4", duration_minutes: 25, has_captions: true, offline_available: true },
];

export const getCommonsContent = (pillar?: string, depth?: ContentDepth): CommonsItem[] => {
  let filtered = COMMONS_CONTENT;
  if (pillar) filtered = filtered.filter((item) => item.pillar === pillar);
  if (depth) filtered = filtered.filter((item) => item.depth === depth);
  return filtered;
};

export const getSuggestedContent = (pillar: string, tier: number): CommonsItem[] => {
  const depth: ContentDepth = tier <= 2 ? "grounding" : tier === 3 ? "building" : "growing";
  return getCommonsContent(pillar, depth);
};
