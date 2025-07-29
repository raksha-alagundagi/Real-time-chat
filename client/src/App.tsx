import { Route, Router } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import Navigation from '@/components/ui/navigation';
import HomePage from '@/pages/HomePage';
import ChatPage from '@/pages/ChatPage';
import ProfilePage from '@/pages/ProfilePage';
import './index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <Router>
            <Route path="/" component={HomePage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/chat/:roomId" component={ChatPage} />
            <Route path="/profile" component={ProfilePage} />
          </Router>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;