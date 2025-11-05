import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';
import RoleSelector from '../components/RoleSelector';
import '../assets/css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

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

  const goNext = () => {
    if (!selectedRole) return; // Safety
    const routeByRole = {
      artist: '/editor/artista',
      writer: '/editor/escritor',
      photographer: '/editor/fotografo',
      // diseñador u otros caen al inicio genérico
      designer: '/editor/inicio',
    };
    const target = routeByRole[selectedRole] || '/editor/inicio';
    navigate(target);
  };

  if (loading) {
    return (
      <div className="main-container"><div className="login-box"><div className="auth-panel"><p>Cargando...</p></div></div></div>
    );
  }

  return (
    <div className="main-container">
      <div className="login-box">
        {/* Panel izquierdo: Selector 2x2 */}
        <div className="auth-panel">
          <p style={{ marginTop: 0, color: '#6b7280' }}>Selecciona tu rol para continuar</p>
          <RoleSelector
            showNext={false}
            onSelect={(role) => {
              setSelectedRole(role);
              console.log('Rol seleccionado:', role);
            }}
          />
        </div>
        {/* Panel derecho: Hola invitado, Siguiente y Cerrar sesión */}
        <div className="decorative-panel" style={{ position: 'relative' }}>
          <div style={{ width: '100%', maxWidth: 420 }}>
            <h1 style={{ marginTop: 0, marginBottom: 12 }}>Hola, {email || 'Invitado'}</h1>
            <p style={{ marginTop: 0, color: '#6b7280' }}>Cuando estés listo, continúa.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button
                className="submit-button btn-compact"
                type="button"
                onClick={goNext}
                style={{ flex: '0 0 auto', minWidth: 140 }}
                disabled={!selectedRole}
              >
                Siguiente
              </button>
            </div>
          </div>
          <div className="logout-bottom">
            <button onClick={handleLogout} className="link-button" type="button">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
