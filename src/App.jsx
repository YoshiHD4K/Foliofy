import React from 'react';
import LoginRegister from './components/LoginRegister.jsx';
import './assets/css/App.css';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './components/ResetPassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EditorInicio from './pages/EditorInicio.jsx';
import EditorBlog from './pages/EditorBlog.jsx';
import EditorArtista from './pages/EditorArtista.jsx';
import EditorEscritor from './pages/EditorEscritor.jsx';
import EditorFotografo from './pages/EditorFotografo.jsx';

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
  <Route path="/editor/inicio" element={<EditorInicio />} />
  <Route path="/editor/blog" element={<EditorBlog />} />
        <Route path="/editor/inicio" element={<EditorInicio />} />
        <Route path="/editor/artista" element={<EditorArtista />} />
        <Route path="/editor/escritor" element={<EditorEscritor />} />
        <Route path="/editor/fotografo" element={<EditorFotografo />} />
      </Routes>
    </div>
  );
}

export default App;