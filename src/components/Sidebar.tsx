import React from 'react';
import { ChatRoom, User } from '../types';
import { Hash, Lock, MessageCircle, Users, Settings, Moon, Sun, Plus } from 'lucide-react';

interface SidebarProps {
  rooms: ChatRoom[];
  users: User[];
  activeRoomId: string | null;
  currentUser: User;
  theme: 'light' | 'dark';
  onRoomSelect: (roomId: string) => void;
  onThemeToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  rooms,
  users,
  activeRoomId,
  currentUser,
  theme,
  onRoomSelect,
  onThemeToggle
}) => {
  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const formatLastActivity = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <div className={`w-80 h-full flex flex-col border-r ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`font-bold text-lg ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ChatFlow
              </h1>
            </div>
          </div>
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-300' 
                : 'hover:bg-gray-200 text-gray-600'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full"
            />
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${
              theme === 'dark' ? 'border-gray-900' : 'border-white'
            } ${getStatusColor(currentUser.status)}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-medium text-sm truncate ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {currentUser.name}
            </p>
            <p className={`text-xs capitalize ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {currentUser.status}
            </p>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className={`font-semibold text-sm uppercase tracking-wide ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Channels
            </h2>
            <button className={`p-1 rounded hover:bg-opacity-20 ${
              theme === 'dark' ? 'hover:bg-white text-gray-400' : 'hover:bg-gray-900 text-gray-500'
            }`}>
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onRoomSelect(room.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
                  activeRoomId === room.id
                    ? theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : theme === 'dark'
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div className="flex-shrink-0">
                  {room.type === 'private' ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Hash className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate">{room.name}</span>
                    <div className="flex items-center space-x-2">
                      {room.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[1.25rem] text-center">
                          {room.unreadCount > 99 ? '99+' : room.unreadCount}
                        </span>
                      )}
                      <span className={`text-xs ${
                        activeRoomId === room.id
                          ? 'text-blue-200'
                          : theme === 'dark'
                            ? 'text-gray-500'
                            : 'text-gray-400'
                      }`}>
                        {formatLastActivity(room.lastActivity)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Online Users Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className={`font-semibold text-sm uppercase tracking-wide ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Online ({users.filter(u => u.status === 'online').length})
            </h2>
            <Users className={`w-4 h-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>

          <div className="space-y-2">
            {users
              .filter(user => user.status === 'online' && user.id !== currentUser.id)
              .map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${
                      theme === 'dark' ? 'border-gray-900' : 'border-white'
                    } ${getStatusColor(user.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user.name}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className={`p-4 border-t ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
          theme === 'dark' 
            ? 'hover:bg-gray-800 text-gray-300' 
            : 'hover:bg-gray-200 text-gray-700'
        }`}>
          <Settings className="w-4 h-4" />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};