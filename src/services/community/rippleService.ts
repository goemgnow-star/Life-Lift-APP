import { db } from "../../database/connection";
import { ripples } from "../../database/schema/ripples";
import { sql } from "drizzle-orm";

export const getRandomRipple = async () => {
  const rows = await db.select().from(ripples).orderBy(sql`RANDOM()`).limit(1);
  return rows[0] ?? null;
};

export const getAllRipples = async (limit: number = 50) => {
  return db.query.ripples.findMany({ orderBy: (ripples, { desc }) => desc(ripples.created_at), limit });
};

export const generateTestimonyTemplate = (milestoneType: string): string => {
  const templates: Record<string, string> = {
    "24h": "One day. When you're starting over, one day is everything.",
    "3d": "Three days. Small steps are still steps.",
    "7d": "A week. The routines are forming. I'm forming.",
    "30d": "Thirty days. A month of showing up for myself.",
    "90d": "Ninety days. I am not the same person who started.",
  };
  return templates[milestoneType] ?? "I'm still here. That's what counts.";
};
