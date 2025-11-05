import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/inicio.css'; 

export default function EditorInicio() {
  const navigate = useNavigate();
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
  
  const defaultConfig = {
    background_color: "#0f0f1e",
    surface_color: "#1a1a2e",
    text_color: "#ffffff",
    primary_action_color: "#6366f1",
    secondary_action_color: "#8b5cf6",
    designer_name: "María García",
    tagline: "Diseñadora UI/UX",
    hero_title: "Creando experiencias digitales memorables",
    hero_description: "Transformo ideas en diseños funcionales y estéticamente impactantes que conectan con las personas.",
    cta_button: "Ver mi trabajo",
    font_family: "Inter",
    font_size: 16
  };

  const onConfigChange = async (config) => {
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const surfaceColor = config.surface_color || defaultConfig.surface_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
    const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;
    const fontFamily = config.font_family || defaultConfig.font_family;
    const baseFontSize = config.font_size || defaultConfig.font_size;

    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
    
    document.getElementById('logo').style.color = textColor;
    const navLinks = document.querySelectorAll('.hero-nav-link');
    navLinks.forEach(link => { link.style.color = textColor; });
    
    document.documentElement.style.setProperty('--primary-action-color', primaryActionColor);
    
    document.getElementById('hero-tag').style.backgroundColor = surfaceColor;
    document.getElementById('hero-tag').style.color = primaryActionColor;
    
    document.querySelectorAll('.cta-button').forEach(btn => {
      btn.style.backgroundColor = primaryActionColor;
      btn.style.color = '#ffffff';
    });
    
    document.getElementById('circle-1').style.backgroundColor = primaryActionColor;
    document.getElementById('circle-2').style.backgroundColor = secondaryActionColor;
    document.getElementById('circle-3').style.backgroundColor = surfaceColor;

    const fontStack = `${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
    document.body.style.fontFamily = fontStack;

    document.getElementById('logo').style.fontSize = `${baseFontSize * 1.5}px`;
    navLinks.forEach(link => { link.style.fontSize = `${baseFontSize * 0.95}px`; });
    document.getElementById('hero-tag').style.fontSize = `${baseFontSize * 0.85}px`;
    document.querySelector('.hero h1').style.fontSize = `${baseFontSize * 4}px`;
    document.querySelector('.hero p').style.fontSize = `${baseFontSize * 1.25}px`;
    document.querySelectorAll('.cta-button').forEach(btn => { btn.style.fontSize = `${baseFontSize}px`; });

    document.getElementById('logo').textContent = config.designer_name || defaultConfig.designer_name;
    document.getElementById('hero-tag').textContent = config.tagline || defaultConfig.tagline;
    document.getElementById('hero-title').textContent = config.hero_title || defaultConfig.hero_title;
    document.getElementById('hero-description').textContent = config.hero_description || defaultConfig.hero_description;
    document.getElementById('cta-button').textContent = config.cta_button || defaultConfig.cta_button;
  };

  const mapToCapabilities = (config) => {
    return { };
  };

  const mapToEditPanelValues = (config) => {
    return new Map([ ]);
  };
  
  useEffect(() => {
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }
  }, []);

  return (
    <div className="main-wrapper"> 
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '12px 16px',
          display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
        }}
      >
        <button type="button" style={headerBtnStyle}>Inicio</button>
  <button type="button" style={headerBtnStyle} onClick={() => navigate('/editor/blog')}>Blog</button>
        <button type="button" style={headerBtnStyle}>Proyectos</button>
      </div>

      <div style={{ height: 56 }} />

      <div className="container" style={{ flex: 1 }}>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-tag" id="hero-tag">{defaultConfig.tagline}</div>
            <h1 id="hero-title">{defaultConfig.hero_title}</h1>
            <p id="hero-description">{defaultConfig.hero_description}</p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              <button type="button" className="cta-button" id="cta-button">{defaultConfig.cta_button}</button>
              <button type="button" className="cta-button" id="contact-button">Contactame</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="circle circle-1" id="circle-1"></div>
            <div className="circle circle-2" id="circle-2"></div>
            <div className="circle circle-3" id="circle-3"></div>
          </div>
        </section>
      </div>

      <button
        type="button"
        className="floating-edit-button"
        aria-label="Personalizar página"
        title="Personalizar página"
        onClick={() => {
          if (window?.elementSdk?.openEditor) {
            try { window.elementSdk.openEditor(); } catch {}
          }
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor"/>
          <path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
}
