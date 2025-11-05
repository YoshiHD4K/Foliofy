import React, { useState } from 'react';
import '../assets/css/LoginRegister.css';

// Componente principal de Login y Registro
const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre Iniciar sesión y Registrarse
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // Checkbox para "Mantener sesión iniciada"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Iniciar sesión:', { email, password, keepLoggedIn });
      // Lógica de inicio de sesión
    } else {
      console.log('Registrarse:', { email, password });
      // Lógica de registro
    }
  };

  return (
    <div className="main-container">
      {/* Contenedor principal de la caja de acceso */}
      <div className="login-box">
        {/* Panel izquierdo con formulario */}
        <div className="auth-panel">
          <h1 className="auth-title">{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h1>

          {/* Botón de Google eliminado */}

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
                  <a href="#" className="forgot-password">
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