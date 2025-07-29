import React, { useState } from 'react';
import { Message, User } from '@shared/schema';
import { MoreHorizontal, Smile } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  user: User;
  isCurrentUser: boolean;
  showAvatar: boolean;
  theme: 'light' | 'dark';
  onAddReaction: (messageId: string, emoji: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  user,
  isCurrentUser,
  showAvatar,
  theme,
  onAddReaction
}) => {
  const [showReactions, setShowReactions] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const commonEmojis = ['👍', '❤️', '😂', '😮', '😢', '🔥', '🎉', '👏'];

  const reactionCounts = message.reactions.reduce((acc, reaction) => {
    acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={`group flex ${isCurrentUser ? 'justify-end' : 'justify-start'} relative`}>
      <div className={`flex max-w-[70%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} space-x-3`}>
        {/* Avatar */}
        {!isCurrentUser && (
          <div className="flex-shrink-0">
            {showAvatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8" />
            )}
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
          {/* User name and time */}
          {showAvatar && !isCurrentUser && (
            <div className="flex items-center space-x-2 mb-1">
              <span className={`font-semibold text-sm ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {user.name}
              </span>
              <span className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </span>
            </div>
          )}

          {/* Message bubble */}
          <div
            className={`relative px-4 py-2 rounded-2xl max-w-full break-words message-bubble ${
              isCurrentUser
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-900'
            } ${showAvatar ? '' : 'ml-0'}`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            
            {/* Edited indicator */}
            {message.edited && (
              <span className={`text-xs italic ml-2 ${
                isCurrentUser 
                  ? 'text-blue-100' 
                  : theme === 'dark' 
                    ? 'text-gray-400' 
                    : 'text-gray-500'
              }`}>
                (edited)
              </span>
            )}
          </div>

          {/* Time for current user messages */}
          {isCurrentUser && showAvatar && (
            <span className={`text-xs mt-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatTime(message.timestamp)}
            </span>
          )}

          {/* Reactions */}
          {Object.keys(reactionCounts).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(reactionCounts).map(([emoji, count]) => (
                <button
                  key={emoji}
                  onClick={() => onAddReaction(message.id, emoji)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all ${
                    message.reactions.some(r => r.emoji === emoji)
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <span>{emoji}</span>
                  <span className="font-medium">{count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions (visible on hover) */}
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-start space-x-1 ${
          isCurrentUser ? 'flex-row-reverse mr-2' : 'ml-2'
        }`}>
          {/* Reaction button */}
          <div className="relative">
            <button
              onClick={() => setShowReactions(!showReactions)}
              className={`p-1.5 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-200 text-gray-500'
              }`}
            >
              <Smile className="w-4 h-4" />
            </button>

            {/* Reaction picker */}
            {showReactions && (
              <div className={`absolute ${isCurrentUser ? 'right-0' : 'left-0'} bottom-full mb-2 p-2 rounded-lg shadow-lg border z-10 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex space-x-1">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        onAddReaction(message.id, emoji);
                        setShowReactions(false);
                      }}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* More actions */}
          <button className={`p-1.5 rounded-full transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-gray-700 text-gray-400' 
              : 'hover:bg-gray-200 text-gray-500'
          }`}>
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};