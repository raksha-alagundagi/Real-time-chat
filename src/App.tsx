import React from 'react';
import { useChat } from './hooks/useChat';
import { LoginScreen } from './components/LoginScreen';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';

function App() {
  const { 
    state, 
    setCurrentUser, 
    sendMessage, 
    setActiveRoom, 
    toggleTheme, 
    addReaction 
  } = useChat();

  if (!state.currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  const activeRoom = state.rooms.find(room => room.id === state.activeRoomId);

  const handleSendMessage = (content: string) => {
    if (state.activeRoomId) {
      sendMessage(state.activeRoomId, content);
    }
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    if (state.activeRoomId) {
      addReaction(state.activeRoomId, messageId, emoji);
    }
  };

  return (
    <div className={`h-screen flex ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Sidebar
        rooms={state.rooms}
        users={state.users}
        activeRoomId={state.activeRoomId}
        currentUser={state.currentUser}
        theme={state.theme}
        onRoomSelect={setActiveRoom}
        onThemeToggle={toggleTheme}
      />
      <ChatArea
        room={activeRoom || null}
        users={state.users}
        currentUser={state.currentUser}
        theme={state.theme}
        onSendMessage={handleSendMessage}
        onAddReaction={handleAddReaction}
      />
    </div>
  );
}

export default App;