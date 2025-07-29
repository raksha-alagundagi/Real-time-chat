import { 
  User, 
  Message, 
  ChatRoom, 
  InsertUser, 
  InsertMessage, 
  InsertChatRoom 
} from '@shared/schema';

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
  updateUserStatus(id: string, status: User['status']): Promise<User | null>;
  
  // Room operations
  createRoom(room: InsertChatRoom): Promise<ChatRoom>;
  getRooms(): Promise<ChatRoom[]>;
  getRoomById(id: string): Promise<ChatRoom | null>;
  updateRoomActivity(id: string): Promise<void>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesByRoomId(roomId: string, limit?: number, offset?: number): Promise<Message[]>;
  addReaction(messageId: string, emoji: string, userId: string): Promise<Message | null>;
  removeReaction(messageId: string, emoji: string, userId: string): Promise<Message | null>;
  
  // Search operations
  searchMessages(query: string, roomId?: string): Promise<Message[]>;
  searchUsers(query: string): Promise<User[]>;
}

// In-memory storage implementation
class MemStorage implements IStorage {
  private users: User[] = [];
  private rooms: ChatRoom[] = [];
  private messages: Message[] = [];
  
  private nextUserId = 1;
  private nextRoomId = 1;
  private nextMessageId = 1;

  constructor() {
    this.seedData();
  }

  private generateId(prefix: string): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${random}`;
  }

  private seedData() {
    // Sample users
    const sampleUsers: User[] = [
      {
        id: 'user_1',
        name: 'Alex Johnson',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        status: 'online',
        lastSeen: new Date(),
        createdAt: new Date()
      },
      {
        id: 'user_2',
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        status: 'online',
        lastSeen: new Date(),
        createdAt: new Date()
      },
      {
        id: 'user_3',
        name: 'Mike Rodriguez',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        status: 'away',
        lastSeen: new Date(Date.now() - 15 * 60 * 1000),
        createdAt: new Date()
      },
      {
        id: 'user_4',
        name: 'Emma Wilson',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
        status: 'offline',
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
        createdAt: new Date()
      }
    ];

    // Sample rooms
    const sampleRooms: ChatRoom[] = [
      {
        id: 'room_1',
        name: 'General',
        description: 'Main team discussion',
        members: ['user_1', 'user_2', 'user_3', 'user_4'],
        messages: [],
        unreadCount: 0,
        lastActivity: new Date(),
        type: 'public',
        createdAt: new Date()
      },
      {
        id: 'room_2',
        name: 'Development',
        description: 'Technical discussions and code reviews',
        members: ['user_1', 'user_2', 'user_3'],
        messages: [],
        unreadCount: 0,
        lastActivity: new Date(Date.now() - 30 * 60 * 1000),
        type: 'public',
        createdAt: new Date()
      },
      {
        id: 'room_3',
        name: 'Random',
        description: 'Off-topic conversations and fun stuff',
        members: ['user_1', 'user_2', 'user_3', 'user_4'],
        messages: [],
        unreadCount: 0,
        lastActivity: new Date(Date.now() - 45 * 60 * 1000),
        type: 'public',
        createdAt: new Date()
      }
    ];

    // Sample messages
    const sampleMessages: Message[] = [
      {
        id: 'msg_1',
        content: 'Hey everyone! Welcome to our team chat 🎉',
        userId: 'user_2',
        roomId: 'room_1',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        reactions: [
          { emoji: '👋', userId: 'user_1', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
          { emoji: '🎉', userId: 'user_3', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) }
        ],
        type: 'text'
      },
      {
        id: 'msg_2',
        content: 'Thanks Sarah! Excited to be working with this amazing team.',
        userId: 'user_1',
        roomId: 'room_1',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        reactions: [
          { emoji: '❤️', userId: 'user_2', timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000) }
        ],
        type: 'text'
      },
      {
        id: 'msg_3',
        content: 'Has anyone seen the latest project updates? The new features look incredible!',
        userId: 'user_3',
        roomId: 'room_1',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        reactions: [],
        type: 'text'
      },
      {
        id: 'msg_4',
        content: 'Just pushed the new authentication system. Ready for review! 🚀',
        userId: 'user_1',
        roomId: 'room_2',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        reactions: [
          { emoji: '🔥', userId: 'user_2', timestamp: new Date(Date.now() - 25 * 60 * 1000) }
        ],
        type: 'text'
      },
      {
        id: 'msg_5',
        content: 'Anyone else excited for the weekend? Planning to try that new restaurant downtown! 🍕',
        userId: 'user_4',
        roomId: 'room_3',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        reactions: [
          { emoji: '🍕', userId: 'user_1', timestamp: new Date(Date.now() - 40 * 60 * 1000) },
          { emoji: '😋', userId: 'user_2', timestamp: new Date(Date.now() - 35 * 60 * 1000) }
        ],
        type: 'text'
      }
    ];

    this.users = sampleUsers;
    this.rooms = sampleRooms;
    this.messages = sampleMessages;

    // Update room messages
    this.rooms.forEach(room => {
      room.messages = this.messages.filter(msg => msg.roomId === room.id);
    });

    this.nextUserId = 5;
    this.nextRoomId = 4;
    this.nextMessageId = 6;
  }

  // User operations
  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.generateId('user'),
      ...user,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async updateUserStatus(id: string, status: User['status']): Promise<User | null> {
    const user = this.users.find(u => u.id === id);
    if (user) {
      user.status = status;
      user.lastSeen = new Date();
    }
    return user || null;
  }

  // Room operations
  async createRoom(room: InsertChatRoom): Promise<ChatRoom> {
    const newRoom: ChatRoom = {
      id: this.generateId('room'),
      ...room,
      createdAt: new Date()
    };
    this.rooms.push(newRoom);
    return newRoom;
  }

  async getRooms(): Promise<ChatRoom[]> {
    return this.rooms.map(room => ({
      ...room,
      messages: this.messages.filter(msg => msg.roomId === room.id)
    }));
  }

  async getRoomById(id: string): Promise<ChatRoom | null> {
    const room = this.rooms.find(room => room.id === id);
    if (room) {
      return {
        ...room,
        messages: this.messages.filter(msg => msg.roomId === id)
      };
    }
    return null;
  }

  async updateRoomActivity(id: string): Promise<void> {
    const room = this.rooms.find(r => r.id === id);
    if (room) {
      room.lastActivity = new Date();
    }
  }

  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const newMessage: Message = {
      id: this.generateId('msg'),
      ...message
    };
    this.messages.push(newMessage);
    
    // Update room's last activity
    await this.updateRoomActivity(message.roomId);
    
    return newMessage;
  }

  async getMessagesByRoomId(roomId: string, limit = 50, offset = 0): Promise<Message[]> {
    return this.messages
      .filter(msg => msg.roomId === roomId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      .slice(offset, offset + limit);
  }

  async addReaction(messageId: string, emoji: string, userId: string): Promise<Message | null> {
    const message = this.messages.find(msg => msg.id === messageId);
    if (!message) return null;

    // Check if user already reacted with this emoji
    const existingReaction = message.reactions.find(
      r => r.userId === userId && r.emoji === emoji
    );

    if (existingReaction) {
      // Remove existing reaction (toggle)
      message.reactions = message.reactions.filter(
        r => !(r.userId === userId && r.emoji === emoji)
      );
    } else {
      // Add new reaction
      message.reactions.push({
        emoji,
        userId,
        timestamp: new Date()
      });
    }

    return message;
  }

  async removeReaction(messageId: string, emoji: string, userId: string): Promise<Message | null> {
    const message = this.messages.find(msg => msg.id === messageId);
    if (!message) return null;

    message.reactions = message.reactions.filter(
      r => !(r.userId === userId && r.emoji === emoji)
    );

    return message;
  }

  // Search operations
  async searchMessages(query: string, roomId?: string): Promise<Message[]> {
    const searchTerm = query.toLowerCase();
    return this.messages
      .filter(msg => {
        const matchesQuery = msg.content.toLowerCase().includes(searchTerm);
        const matchesRoom = !roomId || msg.roomId === roomId;
        return matchesQuery && matchesRoom;
      })
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 20); // Limit search results
  }

  async searchUsers(query: string): Promise<User[]> {
    const searchTerm = query.toLowerCase();
    return this.users
      .filter(user => user.name.toLowerCase().includes(searchTerm))
      .slice(0, 10); // Limit search results
  }
}

export const storage = new MemStorage();