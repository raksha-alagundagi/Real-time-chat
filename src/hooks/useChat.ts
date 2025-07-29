import { useState, useEffect, useCallback } from 'react';
import { AppState, User, ChatRoom, Message } from '../types';
import { generateMockData } from '../utils/mockData';

export const useChat = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('chatApp');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        users: parsed.users.map((u: any) => ({ ...u, lastSeen: new Date(u.lastSeen) })),
        rooms: parsed.rooms.map((r: any) => ({
          ...r,
          lastActivity: new Date(r.lastActivity),
          messages: r.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
            reactions: m.reactions.map((react: any) => ({
              ...react,
              timestamp: new Date(react.timestamp)
            }))
          }))
        }))
      };
    }
    return generateMockData();
  });

  const saveToStorage = useCallback((newState: AppState) => {
    localStorage.setItem('chatApp', JSON.stringify(newState));
  }, []);

  const setCurrentUser = useCallback((user: User) => {
    setState(prev => {
      const newState = {
        ...prev,
        currentUser: user,
        users: prev.users.some(u => u.id === user.id) 
          ? prev.users.map(u => u.id === user.id ? user : u)
          : [...prev.users, user]
      };
      saveToStorage(newState);
      return newState;
    });
  }, [saveToStorage]);

  const sendMessage = useCallback((roomId: string, content: string) => {
    if (!state.currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      userId: state.currentUser.id,
      timestamp: new Date(),
      reactions: [],
      type: 'text'
    };

    setState(prev => {
      const newState = {
        ...prev,
        rooms: prev.rooms.map(room => 
          room.id === roomId 
            ? {
                ...room,
                messages: [...room.messages, newMessage],
                lastActivity: new Date(),
                unreadCount: room.id === prev.activeRoomId ? 0 : room.unreadCount + 1
              }
            : room
        )
      };
      saveToStorage(newState);
      return newState;
    });

    // Simulate responses in some rooms
    if (Math.random() > 0.7) {
      setTimeout(() => {
        const responses = [
          "That's a great point!",
          "I totally agree with that.",
          "Interesting perspective 🤔",
          "Thanks for sharing that!",
          "Let me think about this...",
          "Good question! 👍"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const randomUser = state.users.find(u => u.id !== state.currentUser?.id);
        
        if (randomUser) {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: randomResponse,
            userId: randomUser.id,
            timestamp: new Date(),
            reactions: [],
            type: 'text'
          };

          setState(prev => {
            const newState = {
              ...prev,
              rooms: prev.rooms.map(room => 
                room.id === roomId 
                  ? {
                      ...room,
                      messages: [...room.messages, botMessage],
                      lastActivity: new Date()
                    }
                  : room
              )
            };
            saveToStorage(newState);
            return newState;
          });
        }
      }, 1000 + Math.random() * 3000);
    }
  }, [state.currentUser, state.users, saveToStorage]);

  const setActiveRoom = useCallback((roomId: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        activeRoomId: roomId,
        rooms: prev.rooms.map(room => 
          room.id === roomId 
            ? { ...room, unreadCount: 0 }
            : room
        )
      };
      saveToStorage(newState);
      return newState;
    });
  }, [saveToStorage]);

  const toggleTheme = useCallback(() => {
    setState(prev => {
      const newState = { ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' as const };
      saveToStorage(newState);
      return newState;
    });
  }, [saveToStorage]);

  const addReaction = useCallback((roomId: string, messageId: string, emoji: string) => {
    if (!state.currentUser) return;

    setState(prev => {
      const newState = {
        ...prev,
        rooms: prev.rooms.map(room => 
          room.id === roomId 
            ? {
                ...room,
                messages: room.messages.map(msg => 
                  msg.id === messageId 
                    ? {
                        ...msg,
                        reactions: msg.reactions.some(r => r.userId === state.currentUser!.id && r.emoji === emoji)
                          ? msg.reactions.filter(r => !(r.userId === state.currentUser!.id && r.emoji === emoji))
                          : [...msg.reactions, { emoji, userId: state.currentUser!.id, timestamp: new Date() }]
                      }
                    : msg
                )
              }
            : room
        )
      };
      saveToStorage(newState);
      return newState;
    });
  }, [state.currentUser, saveToStorage]);

  return {
    state,
    setCurrentUser,
    sendMessage,
    setActiveRoom,
    toggleTheme,
    addReaction
  };
};