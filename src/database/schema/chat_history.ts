import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const chatHistory = pgTable("chat_history", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  role: varchar("role", { enum: ["user", "assistant"] }).notNull(),
  content: text("content").notNull(),
  tokens_used: integer("tokens_used"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
