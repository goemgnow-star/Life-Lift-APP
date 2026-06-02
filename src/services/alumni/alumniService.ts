import { db } from "../../database/connection";
import { users } from "../../database/schema/users";
import { victoryPaths } from "../../database/schema/victory_paths";
import { eq, and } from "drizzle-orm";
import { hasCompleted90DayPath } from "../victory/victoryPathService";

export const checkAndActivateAlumniMode = async (userId: number) => {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) return { alumni_mode: false };
  if (user.alumni_mode) return { alumni_mode: true };
  const qualified = await hasCompleted90DayPath(userId);
  if (!qualified) return { alumni_mode: false };
  await db.update(users).set({ alumni_mode: true, involvement_mode: "independent" }).where(eq(users.id, userId));
  return { alumni_mode: true, activated_at: new Date().toISOString() };
};

export const getVictoryArchive = async (userId: number) => {
  return db.query.victoryPaths.findMany({
    where: and(eq(victoryPaths.user_id, userId), eq(victoryPaths.status, "completed")),
    orderBy: (victoryPaths, { desc }) => desc(victoryPaths.completion_date),
  });
};

export const checkEngineLight = async (userId: number) => {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user || !user.last_checkin_date) return { alert: true, message: "No recent check-ins." };
  const daysSince = Math.floor((Date.now() - new Date(user.last_checkin_date).getTime()) / (1000 * 60 * 60 * 24));
  if (daysSince >= 14) return { alert: true, message: "Two weeks since last check-in. Everything okay?" };
  if (daysSince >= 7) return { alert: true, message: "It's been a week. Want to check in?" };
  return { alert: false, message: null };
};
