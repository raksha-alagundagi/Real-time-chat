# Real-time Chat Application

A modern, feature-rich real-time chat application built with React, TypeScript, and Express. Experience seamless communication with multiple chat rooms, user presence indicators, message reactions, and a beautiful responsive interface.

## 🚀 Features

- **Multi-room Chat System**: Join different channels for organized conversations
- **Real-time Messaging**: Instant message delivery with typing indicators
- **User Presence**: See who's online, away, or offline in real-time
- **Message Reactions**: Express yourself with emoji reactions
- **Search Functionality**: Find messages and users quickly
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Message History**: Persistent chat history with timestamps
- **User Profiles**: Customizable avatars and status indicators

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **State Management**: React Query for server state
- **Routing**: Wouter for lightweight routing
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/realtime-chat-application.git
   cd realtime-chat-application
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development environment:**
   ```bash
   ./start-dev.sh
   ```

   Or manually:
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🏗️ Project Structure

```
realtime-chat-application/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── dev-server.mjs
├── start-dev.sh
├── shared/
│   └── schema.ts          # Shared types and schemas
├── server/
│   ├── index.ts           # Express server setup
│   ├── routes.ts          # API routes
│   └── storage.ts         # In-memory storage with sample data
└── client/
    ├── index.html
    ├── src/
    │   ├── App.tsx        # Main React application
    │   ├── main.tsx       # React entry point
    │   ├── index.css      # Global styles
    │   ├── lib/
    │   │   └── queryClient.ts
    │   ├── components/
    │   │   ├── ui/
    │   │   │   └── navigation.tsx
    │   │   ├── LoginScreen.tsx
    │   │   ├── Sidebar.tsx
    │   │   ├── ChatArea.tsx
    │   │   ├── MessageBubble.tsx
    │   │   └── MessageInput.tsx
    │   ├── hooks/
    │   │   └── useChat.ts
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── ChatPage.tsx
    │   │   └── ProfilePage.tsx
    │   └── utils/
    │       └── mockData.ts
    └── types/
        └── index.ts
```

## 🎯 Usage

1. **Join the Chat**: Enter your name and select an avatar
2. **Choose a Room**: Select from available chat channels
3. **Start Chatting**: Send messages, react with emojis, and engage with others
4. **Search Messages**: Use the search bar to find specific conversations
5. **Toggle Theme**: Switch between light and dark modes
6. **View Online Users**: See who's currently active in the sidebar

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development servers (both client and server)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend client
- `npm run lint` - Run ESLint for code quality

### API Endpoints

- `GET /api/rooms` - Get all chat rooms
- `GET /api/rooms/:id` - Get specific room details
- `POST /api/rooms/:id/messages` - Send a message to a room
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id/status` - Get user status

## 🎨 Design System

The application uses a carefully crafted design system with:

- **Primary Colors**: Blue gradient (#3B82F6 to #1D4ED8)
- **Secondary Colors**: Purple accent (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Typography**: System fonts with proper hierarchy
- **Spacing**: 8px grid system
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Deployment

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/client` folder to Netlify

### Deploy to Heroku

1. Create a Heroku app
2. Set the start script to serve the built application
3. Push to Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Images from [Pexels](https://pexels.com/)
- Built with [React](https://reactjs.org/) and [Express](https://expressjs.com/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Happy Chatting! 💬**