import { db } from "../../database/connection";
import { users } from "../../database/schema/users";
import { eq } from "drizzle-orm";

export type PlantStage = 0 | 1 | 2 | 3 | 4;

export const STAGE_NAMES: Record<PlantStage, string> = { 0: "Seed", 1: "Sprout", 2: "Seedling", 3: "Young Plant", 4: "Mature Plant" };

export const calculatePlantStage = (streak: number): PlantStage => {
  if (streak >= 30) return 4;
  if (streak >= 15) return 3;
  if (streak >= 8) return 2;
  if (streak >= 4) return 1;
  return 0;
};

export const updatePlantStage = async (userId: number): Promise<PlantStage> => {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) return 0;
  const streak = user.checkin_streak ?? 0;
  const newStage = calculatePlantStage(streak);
  if (newStage !== (user.plant_stage ?? 0)) {
    await db.update(users).set({ plant_stage: newStage }).where(eq(users.id, userId));
  }
  return newStage;
};
