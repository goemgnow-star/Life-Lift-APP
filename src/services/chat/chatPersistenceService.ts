import { db } from "../../database/connection";
import { chatHistory } from "../../database/schema/chat_history";
import { eq, desc } from "drizzle-orm";

export interface StoreMessageInput {
  user_id: number;
  role: "user" | "assistant";
  content: string;
  tokens_used?: number;
}

export interface StoreMessageOutput {
  id: number;
  created_at: string;
}

export interface GetHistoryInput {
  user_id: number;
  limit?: number;
}

export interface ChatMessage {
  role: string;
  content: string;
  created_at: string;
}

export interface GetHistoryOutput {
  messages: ChatMessage[];
}

export const storeMessage = async (input: StoreMessageInput): Promise<StoreMessageOutput> => {
  const [row] = await db.insert(chatHistory).values({
    user_id: input.user_id,
    role: input.role,
    content: input.content,
    tokens_used: input.tokens_used ?? null,
  }).returning({ id: chatHistory.id, created_at: chatHistory.created_at });

  return {
    id: row.id,
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
  };
};

export const getHistory = async (input: GetHistoryInput): Promise<GetHistoryOutput> => {
  const limit = input.limit ?? 50;

  const rows = await db.query.chatHistory.findMany({
    where: eq(chatHistory.user_id, input.user_id),
    orderBy: (chatHistory, { desc }) => desc(chatHistory.created_at),
    limit,
  });

  const messages: ChatMessage[] = rows.map((row) => ({
    role: row.role,
    content: row.content,
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
  }));

  messages.reverse();

  return { messages };
};
