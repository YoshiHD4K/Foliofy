import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase, supabaseSession } from '../lib/supabaseClient';
import RoleSelector from '../components/RoleSelector';
import '../assets/css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [savingRole, setSavingRole] = useState(false);

  useEffect(() => {
    const load = async () => {
      // Comprobar sesión en ambos clientes (persistente y de pestaña)
      const [{ data: s1 }, { data: s2 }] = await Promise.all([
        supabase.auth.getSession(),
        supabaseSession.auth.getSession(),
      ]);
      const session = s1?.session || s2?.session;
      const client = s1?.session ? supabase : s2?.session ? supabaseSession : null;
      if (!session || !client) {
        // Redirige silenciosamente al login sin mostrar toast de error aquí
        navigate('/', { replace: true });
        return;
      }

      const user = session.user;
  setEmail(user.email || 'Usuario');
      // Lee el type del usuario (si existe)
      const { data: profile, error } = await client
        .from('users')
        .select('type')
        .eq('id', user.id)
        .single();
      if (!error && profile?.type) {
        const routeByRole = {
          artist: '/editor/artista',
          writer: '/editor/escritor',
          photographer: '/editor/fotografo',
          designer: '/editor/inicio',
        };
        const target = routeByRole[profile.type] || '/editor/inicio';
        navigate(target, { replace: true });
        return; // evita renderizar el selector
      }
      setLoading(false);
    };
    load();
  }, [navigate]);

  const handleLogout = async () => {
    const tId = toast.loading('Cerrando sesión...');
    const [r1, r2] = await Promise.all([
      supabase.auth.signOut(),
      supabaseSession.auth.signOut(),
    ]);
    toast.dismiss(tId);
    const error = r1?.error || r2?.error;
    if (error) return toast.error(error.message || 'No se pudo cerrar sesión');
    toast.success('Sesión cerrada');
    navigate('/');
  };

  const goNext = async () => {
    if (!selectedRole || savingRole) return; // Safety
    setSavingRole(true);
    const tId = toast.loading('Guardando tu rol y creando tu página...');
    try {
      // Detectar sesión en cualquiera de los dos clientes y usar el correcto
      const [{ data: s1 }, { data: s2 }] = await Promise.all([
        supabase.auth.getSession(),
        supabaseSession.auth.getSession(),
      ]);
      const session = s1?.session || s2?.session;
      const client = s1?.session ? supabase : s2?.session ? supabaseSession : null;
      if (!session || !client) {
        toast.dismiss(tId);
        toast.error('No hay usuario autenticado');
        setSavingRole(false);
        return;
      }

      const userId = session.user.id;
      // Guarda el type en users (upsert asegura la fila si aún no existiera)
      const { error: upsertErr } = await client
        .from('users')
        .upsert({ id: userId, type: selectedRole }, { onConflict: 'id' });
      if (upsertErr) {
        toast.dismiss(tId);
        toast.error(upsertErr.message || 'No se pudo guardar tu rol');
        setSavingRole(false);
        return;
      }

      // Inserta la página en public.pages
      const { error: pageErr } = await client
        .from('pages')
        .insert([{ user_id: userId, type: selectedRole, created_at: new Date().toISOString() }]);
      if (pageErr) {
        toast.dismiss(tId);
        toast.error(pageErr.message || 'No se pudo crear tu página');
        setSavingRole(false);
        return;
      }

      toast.dismiss(tId);
      toast.success('Listo. Redirigiendo...');
      const routeByRole = {
        artist: '/editor/artista',
        writer: '/editor/escritor',
        photographer: '/editor/fotografo',
        // diseñador u otros caen al inicio genérico
        designer: '/editor/inicio',
      };
      const target = routeByRole[selectedRole] || '/editor/inicio';
      navigate(target);
    } finally {
      setSavingRole(false);
    }
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
                disabled={!selectedRole || savingRole}
              >
                {savingRole ? 'Guardando...' : 'Siguiente'}
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
