import React, { useState } from 'react';
import { User, Settings, Bell, Shield, Palette, Globe } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    messages: true,
    mentions: true,
    reactions: false,
    sounds: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe }
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl border border-border p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Display Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="john@example.com"
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          defaultValue="Software developer passionate about creating amazing user experiences."
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Profile Picture</h3>
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                          Change Picture
                        </button>
                        <p className="text-sm text-muted-foreground mt-2">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Notification Preferences</h2>
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                          <div>
                            <h3 className="font-medium text-foreground capitalize">
                              {key === 'messages' && 'New Messages'}
                              {key === 'mentions' && 'Mentions & Replies'}
                              {key === 'reactions' && 'Message Reactions'}
                              {key === 'sounds' && 'Sound Notifications'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {key === 'messages' && 'Get notified when you receive new messages'}
                              {key === 'mentions' && 'Get notified when someone mentions you'}
                              {key === 'reactions' && 'Get notified when someone reacts to your messages'}
                              {key === 'sounds' && 'Play sounds for notifications'}
                            </p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                              value ? 'bg-primary' : 'bg-muted'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Privacy Settings</h2>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <h3 className="font-medium text-foreground mb-2">Online Status</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Control who can see when you're online
                        </p>
                        <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                          <option>Everyone</option>
                          <option>Friends only</option>
                          <option>Nobody</option>
                        </select>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <h3 className="font-medium text-foreground mb-2">Read Receipts</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Let others know when you've read their messages
                        </p>
                        <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                          <option>Always show</option>
                          <option>Never show</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Appearance</h2>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <h3 className="font-medium text-foreground mb-2">Theme</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Choose your preferred color scheme
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          <button className="p-3 border border-border rounded-lg hover:border-primary transition-colors duration-200">
                            <div className="w-full h-8 bg-white border rounded mb-2"></div>
                            <span className="text-sm">Light</span>
                          </button>
                          <button className="p-3 border border-border rounded-lg hover:border-primary transition-colors duration-200">
                            <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                            <span className="text-sm">Dark</span>
                          </button>
                          <button className="p-3 border border-primary rounded-lg bg-primary/5">
                            <div className="w-full h-8 bg-gradient-to-r from-white to-gray-800 rounded mb-2"></div>
                            <span className="text-sm">Auto</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Language & Region</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Display Language
                        </label>
                        <select className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200">
                          <option>English (US)</option>
                          <option>English (UK)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Japanese</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Time Zone
                        </label>
                        <select className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200">
                          <option>UTC-8 (Pacific Time)</option>
                          <option>UTC-5 (Eastern Time)</option>
                          <option>UTC+0 (GMT)</option>
                          <option>UTC+1 (Central European Time)</option>
                          <option>UTC+9 (Japan Standard Time)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-border">
                <button className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors duration-200">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;