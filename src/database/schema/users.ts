import { pgTable, serial, integer, varchar, boolean, date, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  oauth_id: varchar("oauth_id", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  stability_tier: integer("stability_tier"),
  faith_mode: boolean("faith_mode").default(false),
  involvement_mode: varchar("involvement_mode", { enum: ['independent', 'supported', 'guided'] }).default('guided'),
  alumni_mode: boolean("alumni_mode").default(false),
  current_plan_id: integer("current_plan_id"),
  current_victory_path_id: integer("current_victory_path_id"),
  checkin_streak: integer("checkin_streak").default(0),
  plant_stage: integer("plant_stage").default(0),
  last_checkin_date: date("last_checkin_date"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
