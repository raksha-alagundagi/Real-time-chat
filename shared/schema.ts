import { z } from 'zod';

// User schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  avatar: z.string().url('Invalid avatar URL'),
  status: z.enum(['online', 'away', 'offline']),
  lastSeen: z.date(),
  createdAt: z.date().optional(),
});

// Message schema
export const messageSchema = z.object({
  id: z.string(),
  content: z.string().min(1, 'Message content is required'),
  userId: z.string(),
  roomId: z.string(),
  timestamp: z.date(),
  edited: z.boolean().optional(),
  reactions: z.array(z.object({
    emoji: z.string(),
    userId: z.string(),
    timestamp: z.date(),
  })),
  type: z.enum(['text', 'image', 'file']).default('text'),
});

// Chat Room schema
export const chatRoomSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Room name is required'),
  description: z.string(),
  members: z.array(z.string()),
  messages: z.array(messageSchema),
  unreadCount: z.number().min(0).default(0),
  lastActivity: z.date(),
  type: z.enum(['public', 'private', 'direct']).default('public'),
  createdAt: z.date().optional(),
});

// Reaction schema
export const reactionSchema = z.object({
  emoji: z.string(),
  userId: z.string(),
  timestamp: z.date(),
});

// App State schema
export const appStateSchema = z.object({
  currentUser: userSchema.nullable(),
  users: z.array(userSchema),
  rooms: z.array(chatRoomSchema),
  activeRoomId: z.string().nullable(),
  theme: z.enum(['light', 'dark']).default('light'),
  isTyping: z.record(z.array(z.string())),
});

// Insert schemas (for creating new records)
export const insertUserSchema = userSchema.omit({ id: true, createdAt: true });
export const insertMessageSchema = messageSchema.omit({ id: true });
export const insertChatRoomSchema = chatRoomSchema.omit({ id: true, createdAt: true });

// Types
export type User = z.infer<typeof userSchema>;
export type Message = z.infer<typeof messageSchema>;
export type ChatRoom = z.infer<typeof chatRoomSchema>;
export type Reaction = z.infer<typeof reactionSchema>;
export type AppState = z.infer<typeof appStateSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertChatRoom = z.infer<typeof insertChatRoomSchema>;

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type LoginRequest = {
  name: string;
  avatar: string;
};

export type SendMessageRequest = {
  content: string;
  roomId: string;
  userId: string;
};

export type AddReactionRequest = {
  messageId: string;
  emoji: string;
  userId: string;
};

export type UpdateUserStatusRequest = {
  userId: string;
  status: User['status'];
};