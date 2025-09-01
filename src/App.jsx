import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/index';
import { Dashboard } from './pages/index';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;