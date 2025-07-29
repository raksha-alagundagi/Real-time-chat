export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: Date;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  timestamp: Date;
  edited?: boolean;
  reactions: Reaction[];
  type: 'text' | 'image' | 'file';
}

export interface Reaction {
  emoji: string;
  userId: string;
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  members: string[];
  messages: Message[];
  unreadCount: number;
  lastActivity: Date;
  type: 'public' | 'private' | 'direct';
}

export interface AppState {
  currentUser: User | null;
  users: User[];
  rooms: ChatRoom[];
  activeRoomId: string | null;
  theme: 'light' | 'dark';
  isTyping: Record<string, string[]>;
}