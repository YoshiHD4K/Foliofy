import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import supabase, { supabaseSession } from '../lib/supabaseClient.js';

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '12px 16px',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    gap: 16,
  };

  const navGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    flexWrap: 'wrap',
  };

  const headerBtnStyle = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '6px',
    fontFamily: 'inherit',
  };

  const userBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    background: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: 9999,
    color: '#111827',
    cursor: 'pointer',
  };

  const menuStyle = {
    position: 'fixed',
    top: 56,
    right: 16,
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    boxShadow: '0 10px 20px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)',
    minWidth: 180,
    zIndex: 1100,
    padding: 8,
  };

  const menuItemStyle = {
    width: '100%',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '10px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    color: '#111827',
    fontSize: 14,
  };

  useEffect(() => {
    function onDocClick(e) {
      // Si se hace click fuera del botón/menu, cerrar
      const path = e.composedPath ? e.composedPath() : [];
      const clickedInsideButton = path.some(node => node?.dataset?.id === 'user-btn');
      const clickedInsideMenu = path.some(node => node?.dataset?.id === 'user-menu');
      if (!clickedInsideButton && !clickedInsideMenu) setMenuOpen(false);
    }
    function onEsc(e) { if (e.key === 'Escape') setMenuOpen(false); }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const [{ error: e1 }, { error: e2 }] = await Promise.all([
        supabase.auth.signOut(),
        supabaseSession.auth.signOut(),
      ]);
      const error = e1 || e2;
      if (error) throw error;
      toast.success('Sesión cerrada');
      setMenuOpen(false);
      navigate('/');
    } catch (err) {
      toast.error(err?.message || 'No se pudo cerrar sesión');
    }
  };

  return (
    <>
      <div style={containerStyle}>
        {/* Columna izquierda (vacía) para equilibrio visual y centrar el nav */}
        <div />

        {/* Centro: navegación siempre centrada */}
        <nav style={{ ...navGroupStyle, justifyContent: 'center' }} aria-label="Secciones">
          <button type="button" style={headerBtnStyle} onClick={() => navigate('/editor/inicio')}>Inicio</button>
          <button type="button" style={headerBtnStyle} onClick={() => navigate('/editor/blog')}>Blog</button>
          <button type="button" style={headerBtnStyle}>Proyectos</button>
        </nav>

        {/* Derecha: botón de usuario alineado al borde derecho */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            style={userBtnStyle}
            aria-label="Cuenta de usuario"
            title="Cuenta de usuario"
            onClick={() => setMenuOpen(o => !o)}
            data-id="user-btn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 22c0-3.866 5.373-7 9-7s9 3.134 9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          {menuOpen && (
            <div style={menuStyle} data-id="user-menu" role="menu" aria-label="Menú de usuario">
              <button type="button" style={menuItemStyle} onClick={handleLogout} role="menuitem">
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Espaciador para compensar el header fijo */}
      <div style={{ height: 56 }} />
    </>
  );
}
