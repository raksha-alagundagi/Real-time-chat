import React, { useState } from 'react';
import { User } from '@shared/schema';
import { MessageCircle, Users, Zap } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const avatars = [
    'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const user: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        avatar: avatars[selectedAvatar],
        status: 'online',
        lastSeen: new Date(),
        createdAt: new Date()
      };
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">ChatFlow</h1>
          <p className="text-gray-600 dark:text-gray-300">Connect and collaborate in real-time</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
            <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Real-time</p>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
            <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Team Chat</p>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
            <Zap className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Fast</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Choose Avatar
              </label>
              <div className="grid grid-cols-6 gap-3">
                {avatars.map((avatar, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedAvatar(index)}
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                      selectedAvatar === index
                        ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 scale-110'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Join Chat
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          Join thousands of teams already using ChatFlow
        </p>
      </div>
    </div>
  );
};