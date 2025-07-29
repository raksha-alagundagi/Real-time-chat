import React from 'react';
import { Link } from 'wouter';
import { MessageCircle, Users, Zap, Shield, Smartphone, Globe } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Real-time Messaging',
      description: 'Instant message delivery with typing indicators and read receipts'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Multiple chat rooms for organized team discussions'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with minimal latency'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption for all your conversations'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Responsive design that works on all devices'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Connect with team members from anywhere in the world'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-2xl">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ChatFlow
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect and collaborate in real-time with our modern chat application. 
              Experience seamless communication with your team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Start Chatting
                </button>
              </Link>
              
              <Link href="/profile">
                <button className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ChatFlow?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built with modern technology and designed for the best user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Communication?
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using ChatFlow to stay connected and productive.
          </p>
          
          <Link href="/chat">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">ChatFlow</span>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 ChatFlow. All rights reserved.</p>
              <p className="mt-1">Built with ❤️ for better communication</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;