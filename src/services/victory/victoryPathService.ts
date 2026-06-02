import { db } from "../../database/connection";
import { victoryPaths } from "../../database/schema/victory_paths";
import { eq, and } from "drizzle-orm";

export type VictoryPathType = "24h" | "3d" | "7d" | "30d" | "90d";

const DAYS_REQUIRED: Record<VictoryPathType, number> = { "24h": 1, "3d": 3, "7d": 7, "30d": 30, "90d": 90 };

export const startVictoryPath = async (userId: number, pathType: VictoryPathType) => {
  const [row] = await db.insert(victoryPaths).values({
    user_id: userId, path_type: pathType, start_date: new Date().toISOString(),
  }).returning({ id: victoryPaths.id });
  return { id: row.id, path_type: pathType, status: "active" };
};

export const getUserPaths = async (userId: number) => {
  return db.query.victoryPaths.findMany({
    where: eq(victoryPaths.user_id, userId),
    orderBy: (victoryPaths, { desc }) => desc(victoryPaths.created_at),
  });
};

export const completePath = async (pathId: number) => {
  await db.update(victoryPaths).set({ status: "completed", completion_date: new Date().toISOString() }).where(eq(victoryPaths.id, pathId));
};

export const pausePath = async (pathId: number) => {
  await db.update(victoryPaths).set({ status: "paused" }).where(eq(victoryPaths.id, pathId));
};

export const hasCompleted90DayPath = async (userId: number): Promise<boolean> => {
  const row = await db.query.victoryPaths.findFirst({
    where: and(eq(victoryPaths.user_id, userId), eq(victoryPaths.path_type, "90d"), eq(victoryPaths.status, "completed")),
  });
  return !!row;
};
