import React, { useState, useRef, useEffect } from 'react';
import { ChatRoom, Message, User } from '../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Hash, Lock, Users, Search, MoreVertical } from 'lucide-react';

interface ChatAreaProps {
  room: ChatRoom | null;
  users: User[];
  currentUser: User;
  theme: 'light' | 'dark';
  onSendMessage: (content: string) => void;
  onAddReaction: (messageId: string, emoji: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  room,
  users,
  currentUser,
  theme,
  onSendMessage,
  onAddReaction
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [room?.messages]);

  const filteredMessages = room?.messages.filter(message =>
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = message.timestamp.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  if (!room) {
    return (
      <div className={`flex-1 flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <Hash className={`w-8 h-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to ChatFlow
          </h3>
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Select a channel to start chatting
          </p>
        </div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate(filteredMessages);

  return (
    <div className={`flex-1 flex flex-col ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between ${
        theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              {room.type === 'private' ? (
                <Lock className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              ) : (
                <Hash className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              )}
            </div>
            <div>
              <h2 className={`font-semibold text-lg ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {room.name}
              </h2>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {room.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className={`pl-10 pr-4 py-2 rounded-lg border text-sm w-64 transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
            />
          </div>

          {/* Member count */}
          <div className="flex items-center space-x-2">
            <Users className={`w-4 h-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {room.members.length}
            </span>
          </div>

          <button className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-gray-700 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}>
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-6"
      >
        {Object.entries(messageGroups).map(([date, messages]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex items-center justify-center mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {formatDateHeader(date)}
              </div>
            </div>

            {/* Messages for this date */}
            <div className="space-y-4">
              {messages.map((message, index) => {
                const user = users.find(u => u.id === message.userId);
                const isCurrentUser = message.userId === currentUser.id;
                const showAvatar = index === 0 || 
                  messages[index - 1].userId !== message.userId ||
                  message.timestamp.getTime() - messages[index - 1].timestamp.getTime() > 300000; // 5 minutes

                return (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    user={user || currentUser}
                    isCurrentUser={isCurrentUser}
                    showAvatar={showAvatar}
                    theme={theme}
                    onAddReaction={onAddReaction}
                  />
                );
              })}
            </div>
          </div>
        ))}
        
        {filteredMessages.length === 0 && searchQuery && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Search className={`w-12 h-12 mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-lg font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No messages found
              </p>
              <p className={`${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Try searching with different keywords
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        theme={theme}
        placeholder={`Message #${room.name}`}
      />
    </div>
  );
};