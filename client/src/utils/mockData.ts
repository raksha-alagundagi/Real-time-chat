import { AppState, User, ChatRoom, Message } from '@shared/schema';

export const generateMockData = (): AppState => {
  const users: User[] = [
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
    },
    {
      id: 'user_5',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      status: 'online',
      lastSeen: new Date(),
      createdAt: new Date()
    },
    {
      id: 'user_6',
      name: 'Lisa Zhang',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      status: 'away',
      lastSeen: new Date(Date.now() - 30 * 60 * 1000),
      createdAt: new Date()
    }
  ];

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
        { emoji: '🔥', userId: 'user_2', timestamp: new Date(Date.now() - 25 * 60 * 1000) },
        { emoji: '👍', userId: 'user_5', timestamp: new Date(Date.now() - 20 * 60 * 1000) }
      ],
      type: 'text'
    },
    {
      id: 'msg_5',
      content: 'Looking good! I\'ll test it on the staging environment.',
      userId: 'user_5',
      roomId: 'room_2',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      reactions: [],
      type: 'text'
    },
    {
      id: 'msg_6',
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

  const rooms: ChatRoom[] = [
    {
      id: 'room_1',
      name: 'General',
      description: 'Main team discussion',
      members: ['user_1', 'user_2', 'user_3', 'user_4', 'user_5', 'user_6'],
      messages: sampleMessages.filter(msg => msg.roomId === 'room_1'),
      unreadCount: 0,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: 'public',
      createdAt: new Date()
    },
    {
      id: 'room_2',
      name: 'Development',
      description: 'Technical discussions and code reviews',
      members: ['user_1', 'user_2', 'user_3', 'user_5'],
      messages: sampleMessages.filter(msg => msg.roomId === 'room_2'),
      unreadCount: 2,
      lastActivity: new Date(Date.now() - 25 * 60 * 1000),
      type: 'public',
      createdAt: new Date()
    },
    {
      id: 'room_3',
      name: 'Random',
      description: 'Off-topic conversations and fun stuff',
      members: ['user_1', 'user_2', 'user_3', 'user_4', 'user_6'],
      messages: sampleMessages.filter(msg => msg.roomId === 'room_3'),
      unreadCount: 1,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000),
      type: 'public',
      createdAt: new Date()
    },
    {
      id: 'room_4',
      name: 'Design Team',
      description: 'UI/UX discussions and design reviews',
      members: ['user_2', 'user_4', 'user_6'],
      messages: [],
      unreadCount: 0,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'public',
      createdAt: new Date()
    }
  ];

  return {
    currentUser: null,
    users,
    rooms,
    activeRoomId: 'room_1',
    theme: 'light',
    isTyping: {}
  };
};