const DAILY_VERSES: Record<string, string[]> = {
  mental: ["Philippians 4:6-7", "Isaiah 41:10", "Psalm 23:1-4", "Matthew 11:28-30", "2 Timothy 1:7"],
  physical: ["1 Corinthians 6:19-20", "3 John 1:2", "Proverbs 3:7-8"],
  spiritual: ["Romans 8:28", "Jeremiah 29:11", "Proverbs 3:5-6", "Psalm 46:10", "Hebrews 11:1"],
  financial: ["Malachi 3:10", "Proverbs 3:9-10", "Matthew 6:33", "Philippians 4:19"],
};

const TOPIC_VERSES: Record<string, string> = {
  hope: "Romans 15:13", peace: "John 14:27", strength: "Isaiah 40:31", healing: "Jeremiah 30:17",
  wisdom: "James 1:5", courage: "Joshua 1:9", love: "1 Corinthians 13:4-8", fear: "Psalm 34:4",
  anxiety: "1 Peter 5:7", depression: "Psalm 42:11", loneliness: "Hebrews 13:5", addiction: "1 Corinthians 10:13",
  faith: "Hebrews 11:1", gratitude: "1 Thessalonians 5:18",
};

export const getDailyVerse = (pillar: string, dayOffset: number = 0): string => {
  const verses = DAILY_VERSES[pillar] ?? DAILY_VERSES.mental;
  return verses[dayOffset % verses.length];
};

export const searchVerseByTopic = (topic: string): string | null => {
  return TOPIC_VERSES[topic.toLowerCase().trim()] ?? null;
};

export const fetchVerseText = async (reference: string): Promise<{ reference: string; text: string }> => {
  try {
    const res = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}`);
    if (!res.ok) throw new Error(`Bible API error: ${res.status}`);
    const data = await res.json();
    return { reference: data.reference ?? reference, text: data.text ?? "Verse text unavailable." };
  } catch {
    return { reference, text: "Unable to load verse." };
  }
};
