import React from 'react';
import LoginRegister from './components/LoginRegister.jsx';
import './assets/css/App.css';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './components/ResetPassword.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" toastOptions={{
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
        success: { iconTheme: { primary: '#22c55e', secondary: '#1a1a1a' } },
        error: { iconTheme: { primary: '#ef4444', secondary: '#1a1a1a' } },
      }} />
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;