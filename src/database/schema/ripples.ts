import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const ripples = pgTable("ripples", {
  id: serial("id").primaryKey(),
  source_user_id_hash: varchar("source_user_id_hash", { length: 255 }),
  milestone_type: varchar("milestone_type", { length: 50 }),
  pillar: varchar("pillar", { length: 50 }),
  testimony_text: text("testimony_text").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
