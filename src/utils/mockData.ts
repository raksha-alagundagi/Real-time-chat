import { AppState, User, ChatRoom, Message } from '../types';

export const generateMockData = (): AppState => {
  const users: User[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      status: 'online',
      lastSeen: new Date()
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      status: 'online',
      lastSeen: new Date()
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      status: 'away',
      lastSeen: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: '4',
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      status: 'offline',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

  const sampleMessages: Message[] = [
    {
      id: '1',
      content: 'Hey everyone! Welcome to our team chat 🎉',
      userId: '2',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reactions: [
        { emoji: '👋', userId: '1', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { emoji: '🎉', userId: '3', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) }
      ],
      type: 'text'
    },
    {
      id: '2',
      content: 'Thanks Sarah! Excited to be working with this amazing team.',
      userId: '1',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      reactions: [
        { emoji: '❤️', userId: '2', timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000) }
      ],
      type: 'text'
    },
    {
      id: '3',
      content: 'Has anyone seen the latest project updates? The new features look incredible!',
      userId: '3',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      reactions: [],
      type: 'text'
    }
  ];

  const rooms: ChatRoom[] = [
    {
      id: '1',
      name: 'General',
      description: 'Main team discussion',
      members: ['1', '2', '3', '4'],
      messages: sampleMessages,
      unreadCount: 0,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: 'public'
    },
    {
      id: '2',
      name: 'Development',
      description: 'Technical discussions and code reviews',
      members: ['1', '2', '3'],
      messages: [
        {
          id: '4',
          content: 'Just pushed the new authentication system. Ready for review! 🚀',
          userId: '1',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          reactions: [
            { emoji: '🔥', userId: '2', timestamp: new Date(Date.now() - 25 * 60 * 1000) }
          ],
          type: 'text'
        }
      ],
      unreadCount: 2,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
      type: 'public'
    },
    {
      id: '3',
      name: 'Random',
      description: 'Off-topic conversations and fun stuff',
      members: ['1', '2', '3', '4'],
      messages: [
        {
          id: '5',
          content: 'Anyone else excited for the weekend? Planning to try that new restaurant downtown! 🍕',
          userId: '4',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          reactions: [
            { emoji: '🍕', userId: '1', timestamp: new Date(Date.now() - 40 * 60 * 1000) },
            { emoji: '😋', userId: '2', timestamp: new Date(Date.now() - 35 * 60 * 1000) }
          ],
          type: 'text'
        }
      ],
      unreadCount: 1,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000),
      type: 'public'
    }
  ];

  return {
    currentUser: null,
    users,
    rooms,
    activeRoomId: '1',
    theme: 'light',
    isTyping: {}
  };
};