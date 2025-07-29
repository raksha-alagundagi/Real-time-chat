import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Real-time Chat Application Development Environment...\n');

// Start the backend server
console.log('📡 Starting backend server...');
const serverProcess = spawn('npm', ['run', 'server'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

// Start the frontend client
console.log('🌐 Starting frontend client...');
const clientProcess = spawn('npm', ['run', 'client'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

// Handle process termination
const cleanup = () => {
  console.log('\n🛑 Shutting down development servers...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Handle server process errors
serverProcess.on('error', (err) => {
  console.error('❌ Backend server error:', err);
});

clientProcess.on('error', (err) => {
  console.error('❌ Frontend client error:', err);
});

// Handle server process exit
serverProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Backend server exited with code ${code}`);
  }
});

clientProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Frontend client exited with code ${code}`);
  }
});

console.log('\n✅ Development environment started!');
console.log('📱 Frontend: http://localhost:3000');
console.log('🔧 Backend API: http://localhost:3001');
console.log('🏥 Health Check: http://localhost:3001/health');
console.log('\n💡 Press Ctrl+C to stop all servers\n');