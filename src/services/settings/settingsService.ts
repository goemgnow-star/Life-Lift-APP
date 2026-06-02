import { db } from "../../database/connection";
import { users } from "../../database/schema/users";
import { eq } from "drizzle-orm";

export interface UserSettings {
  faith_mode: boolean;
  involvement_mode: "independent" | "supported" | "guided";
}

export const getSettings = async (userId: number): Promise<UserSettings> => {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) throw new Error("User not found");
  return {
    faith_mode: user.faith_mode ?? false,
    involvement_mode: (user.involvement_mode as UserSettings["involvement_mode"]) ?? "guided",
  };
};

export const updateSettings = async (userId: number, settings: Partial<UserSettings>): Promise<UserSettings> => {
  const data: Record<string, unknown> = {};
  if (settings.faith_mode !== undefined) data.faith_mode = settings.faith_mode;
  if (settings.involvement_mode !== undefined) data.involvement_mode = settings.involvement_mode;
  if (Object.keys(data).length > 0) await db.update(users).set(data).where(eq(users.id, userId));
  return getSettings(userId);
};

export const deleteAccount = async (userId: number): Promise<void> => {
  await db.delete(users).where(eq(users.id, userId));
};
