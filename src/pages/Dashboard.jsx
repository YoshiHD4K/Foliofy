import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) {
        // Fallback temporal: datos genéricos si no hay sesión
        setEmail('Invitado');
      } else {
        setEmail(user.email || 'Usuario');
      }
      setLoading(false);
    };
    load();
  }, [navigate]);

  const handleLogout = async () => {
    const tId = toast.loading('Cerrando sesión...');
    const { error } = await supabase.auth.signOut();
    toast.dismiss(tId);
    if (error) return toast.error(error.message || 'No se pudo cerrar sesión');
    toast.success('Sesión cerrada');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="main-container"><div className="login-box"><div className="auth-panel"><p>Cargando...</p></div></div></div>
    );
  }

  return (
    <div className="main-container">
      <div className="login-box">
        <div className="auth-panel">
          <h1 className="auth-title">Bienvenido</h1>
          <p style={{ marginBottom: 16 }}>Has iniciado sesión como <strong>{email}</strong>.</p>
          <button className="submit-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
        <div className="decorative-panel">
          <h2 className="decorative-text">Tu espacio para crear</h2>
          <div className="abstract-shape shape-a"></div>
          <div className="abstract-shape shape-b"></div>
          <div className="abstract-shape shape-c"></div>
          <div className="abstract-shape shape-d"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
