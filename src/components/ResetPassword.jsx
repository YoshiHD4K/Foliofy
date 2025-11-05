import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [canReset, setCanReset] = useState(false);

  useEffect(() => {
    // Verifica si hay sesión de recuperación activa
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setCanReset(!!data.session);
    };
    checkSession();

    // También escucha el evento de recuperación por si llega después
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setCanReset(true);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirm) {
      toast.error('Completa ambos campos');
      return;
    }
    if (password.length < 8) {
      toast.error('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (password !== confirm) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    if (!canReset) {
      toast('Abre este enlace desde el correo de recuperación', { icon: '✉️' });
      return;
    }
    const tId = toast.loading('Actualizando contraseña...');
    const { error } = await supabase.auth.updateUser({ password });
    toast.dismiss(tId);
    if (error) {
      toast.error(error.message || 'No se pudo actualizar la contraseña');
      return;
    }
    toast.success('Contraseña actualizada. Inicia sesión de nuevo.');
    navigate('/');
  };

  return (
    <div className="main-container">
      <div className="login-box">
        <div className="auth-panel">
          <div className="logo-section">
            <img src="/images/logo_foliofy.png" alt="Foliofy" className="auth-logo" draggable="false" />
          </div>
          <h1 className="auth-title">Restablecer contraseña</h1>
          {!canReset && (
            <p style={{ marginBottom: 12, color: '#888' }}>
              Abre esta página usando el enlace de recuperación que te enviamos al correo.
            </p>
          )}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">Actualizar contraseña</button>
          </form>
          <div className="switch-auth-link" style={{ marginTop: 8 }}>
            <a href="#" onClick={() => navigate('/')}>Volver al inicio</a>
          </div>
        </div>
        <div className="decorative-panel">
          <h2 className="decorative-text">Protege tu cuenta con una clave fuerte</h2>
          <div className="abstract-shape shape-a"></div>
          <div className="abstract-shape shape-b"></div>
          <div className="abstract-shape shape-c"></div>
          <div className="abstract-shape shape-d"></div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
