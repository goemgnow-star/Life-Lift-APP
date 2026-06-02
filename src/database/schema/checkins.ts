import { pgTable, serial, integer, boolean, timestamp, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { plans } from "./plans";

export const checkins = pgTable("checkins", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  plan_id: integer("plan_id").references(() => plans.id, { onDelete: "set null" }),
  state_response: text("state_response"),
  action_completed: boolean("action_completed").default(false),
  mood_score: integer("mood_score"),
  notes: text("notes"),
  streak_at_time: integer("streak_at_time"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
