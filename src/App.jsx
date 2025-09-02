import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/index';
import { Dashboard } from './pages/index';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;