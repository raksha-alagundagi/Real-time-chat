import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  theme: 'light' | 'dark';
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  theme,
  placeholder = 'Type a message...'
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  useEffect(() => {
    if (message.length > 0 && !isTyping) {
      setIsTyping(true);
    } else if (message.length === 0 && isTyping) {
      setIsTyping(false);
    }
  }, [message, isTyping]);

  return (
    <div className={`border-t px-6 py-4 ${
      theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
    }`}>
      <form onSubmit={handleSubmit} className="flex items-end space-x-4">
        {/* Attachment button */}
        <button
          type="button"
          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
            theme === 'dark' 
              ? 'hover:bg-gray-700 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Message input container */}
        <div className={`flex-1 relative rounded-lg border ${
          theme === 'dark' 
            ? 'border-gray-600 bg-gray-700' 
            : 'border-gray-300 bg-gray-50'
        } focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20 transition-all`}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            rows={1}
            className={`w-full px-4 py-3 pr-12 rounded-lg resize-none focus:outline-none ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white placeholder-gray-400' 
                : 'bg-gray-50 text-gray-900 placeholder-gray-500'
            }`}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          
          {/* Emoji button */}
          <button
            type="button"
            className={`absolute right-3 bottom-3 p-1 rounded transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-600 text-gray-400' 
                : 'hover:bg-gray-200 text-gray-500'
            }`}
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        {/* Voice message button */}
        {!message.trim() && (
          <button
            type="button"
            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
              theme === 'dark' 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
        )}

        {/* Send button */}
        {message.trim() && (
          <button
            type="submit"
            className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 flex-shrink-0 shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Typing indicator */}
      {isTyping && (
        <div className={`mt-2 text-xs ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="inline-flex items-center">
            <span className="mr-2">You are typing</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </span>
        </div>
      )}
    </div>
  );
};