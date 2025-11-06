import React, { useState, useEffect } from 'react';
import '../assets/css/LoginRegister.css';
import { toast } from 'react-hot-toast';
import { supabase, getSupabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

// Componente principal de Login y Registro
const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre Iniciar sesión y Registrarse
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // Checkbox para "Mantener sesión iniciada"
  const navigate = useNavigate();

  // Si ya hay sesión (persistida o de la pestaña), redirige automáticamente al dashboard
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate('/dashboard', { replace: true });
      }
    };
    checkSession();
    // Opcional: escucha cambios de auth (ej. si llega una sesión por deep-link)
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard', { replace: true });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const formatLoginError = (error) => {
    const msg = (error?.message || '').toLowerCase();
    if (msg.includes('invalid login credentials')) return 'Credenciales inválidas. Verifica tu correo y contraseña.';
    if (msg.includes('email not confirmed') || msg.includes('not confirmed')) return 'Tu correo aún no está confirmado. Revisa tu bandeja de entrada.';
    if (msg.includes('rate limit') || msg.includes('too many')) return 'Demasiados intentos. Inténtalo de nuevo en unos minutos.';
    if (msg.includes('network') || msg.includes('fetch')) return 'Problema de conexión. Revisa tu internet e inténtalo nuevamente.';
    return error?.message || 'No se pudo iniciar sesión';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Completa tu correo y contraseña');
      return;
    }

    const client = getSupabase(keepLoggedIn);
    if (isLogin) {
      const tId = toast.loading('Ingresando...');
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      toast.dismiss(tId);
      if (error) {
        toast.error(formatLoginError(error));
        return;
      }
      toast.success(`Bienvenido${data?.user?.email ? `, ${data.user.email}` : ''}`);
      navigate('/dashboard');
    } else {
      const tId = toast.loading('Creando cuenta...');
      const { data, error } = await client.auth.signUp({ email, password });
      toast.dismiss(tId);
      if (error) {
        toast.error(error.message || 'No se pudo registrar');
        return;
      }
      if (data?.user && !data.session) {
        // Cuando se requiere confirmación de email, no hay sesión activa
        toast.success('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
      } else {
        toast.success('Cuenta creada e iniciada sesión');
        navigate('/dashboard');
      }
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast('Ingresa tu correo para recuperar la contraseña', { icon: '✉️' });
      return;
    }
    const tId = toast.loading('Enviando email de recuperación...');
  const redirectTo = `${window.location.origin}/reset`; // Página de restablecimiento en esta app
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    toast.dismiss(tId);
    if (error) {
      toast.error(error.message || 'No se pudo enviar el email de recuperación');
      return;
    }
    toast.success('Si el correo existe, recibirás un enlace para restablecer tu contraseña.');
  };

  return (
    <div className="main-container">
      {/* Contenedor principal de la caja de acceso */}
      <div className="login-box">
        {/* Panel izquierdo con formulario */}
        <div className="auth-panel">
          <div className="logo-section">
            <img src="/images/logo_foliofy.png" alt="Foliofy" className="auth-logo" draggable="false" />
          </div>
          <h1 className="auth-title">{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Campo de Email */}
            <div className="input-group">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo de Contraseña con icono de visibilidad (simulado) */}
            <div className="input-group password-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon">👁️</span>
            </div>

            <div className="form-options">
              {/* Opciones solo visibles en Login */}
              {isLogin ? (
                <>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={keepLoggedIn}
                      onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Mantener sesión iniciada
                  </label>
                  <a href="#" className="forgot-password" onClick={handleRecoverPassword}>
                    ¿Olvidaste tu contraseña?
                  </a>
                </>
              ) : (
                // En registro puedes poner términos y condiciones, si es necesario
                <a href="#" className="forgot-password terms-link">
                  Al registrarte aceptas nuestros términos.
                </a>
              )}
            </div>

            <button type="submit" className="submit-button">
              {isLogin ? 'Ingresar' : 'Registrarse'}
            </button>
          </form>

          <div className="switch-auth-link">
            {isLogin ? (
              <span>
                ¿No tienes cuenta?
                <a href="#" onClick={() => setIsLogin(false)}>
                  Crea una
                </a>
              </span>
            ) : (
              <span>
                ¿Ya tienes cuenta?
                <a href="#" onClick={() => setIsLogin(true)}>
                  Inicia sesión
                </a>
              </span>
            )}
          </div>
        </div>

        {/* Panel derecho con texto y formas abstractas */}
        <div className="decorative-panel">
          <h2 className="decorative-text">
            Cambiando la forma en que el mundo escribe
          </h2>
          {/* Formas geométricas */}
          <div className="abstract-shape shape-a"></div>
          <div className="abstract-shape shape-b"></div>
          <div className="abstract-shape shape-c"></div>
          <div className="abstract-shape shape-d"></div>
        </div>
      </div>
      {/* Fin del login-box */}
    </div>
  );
};

export default LoginRegister;