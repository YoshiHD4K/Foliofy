import React, { useEffect } from 'react';
import '../assets/css/writer.css';

export default function EditorEscritor() {
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
    // Paleta beige y estética de escritor
    background_color: '#f4efe6',
    text_color: '#1a1a1a',
    primary_action_color: '#6b4f2a', // marrón cálido para acciones
    secondary_action_color: '#b08968', // acento suave para etiquetas
    designer_name: 'Camila Rojas',
    tagline: 'Escritora',
    location: 'Buenos Aires, AR',
    experience: '8 años de experiencia',
    specialties: 'Cuento · Ensayo · Crónica',
    cta_button: 'Leer publicaciones',
    cta_secondary: 'Contactarme',
    font_family: 'Georgia', // tipografía de estilo escritor
    font_size: 18,
  };

  const onConfigChange = (config) => {
    const bg = config.background_color || defaultConfig.background_color;
    const fg = config.text_color || defaultConfig.text_color;
    const acc = config.primary_action_color || defaultConfig.primary_action_color;
    const acc2 = config.secondary_action_color || defaultConfig.secondary_action_color;
    const fontFamily = config.font_family || defaultConfig.font_family;
    const base = config.font_size || defaultConfig.font_size;

    const root = document.documentElement;
    root.style.setProperty('--photo-bg', bg);
    root.style.setProperty('--photo-fg', fg);
    root.style.setProperty('--photo-accent', acc);
    root.style.setProperty('--photo-accent-2', acc2);
  document.body.style.fontFamily = `${fontFamily}, 'Times New Roman', serif`;
    root.style.setProperty('--photo-text-xl', `${base * 3.2}px`);
    root.style.setProperty('--photo-text-md', `${base * 1.1}px`);

    const name = document.getElementById('ph-name');
    if (name) name.textContent = config.designer_name || defaultConfig.designer_name;
    const tag = document.getElementById('ph-tag');
    if (tag) tag.textContent = config.tagline || defaultConfig.tagline;
    const loc = document.getElementById('ph-location');
    if (loc) loc.textContent = config.location || defaultConfig.location;
    const exp = document.getElementById('ph-experience');
    if (exp) exp.textContent = config.experience || defaultConfig.experience;
    const spec = document.getElementById('ph-specialties');
    if (spec) spec.textContent = config.specialties || defaultConfig.specialties;
    const cta1 = document.getElementById('ph-cta');
    if (cta1) cta1.textContent = config.cta_button || defaultConfig.cta_button;
    const cta2 = document.getElementById('ph-cta-2');
    if (cta2) cta2.textContent = config.cta_secondary || defaultConfig.cta_secondary;
  };

  useEffect(() => {
    if (window.elementSdk) {
      window.elementSdk.init({ defaultConfig, onConfigChange });
    } else {
      onConfigChange(defaultConfig);
    }
  }, []);

  return (
    <div className="photo-page">
      {/* Header compartido */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '12px 16px',
          display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
        }}
      >
        <button type="button" style={headerBtnStyle}>Inicio</button>
        <button type="button" style={headerBtnStyle}>Blog</button>
        <button type="button" style={headerBtnStyle}>Proyectos</button>
      </div>

      <div style={{ height: 56 }} />

      <section className="photo-card" aria-label="Carta de presentación">
        <div className="photo-card__inner">
        <div className="photo-visual" aria-hidden="true">
          {/* Pluma antigua y tintero desde internet (recursos de dominio público) */}
          <img
            className="quill-img"
            src="https://openclipart.org/download/2821/Feather.svg"
            alt="Pluma antigua"
            loading="lazy"
          />
          <img
            className="inkwell-img"
            src="https://openclipart.org/download/221703/inkwell.svg"
            alt="Tintero"
            loading="lazy"
          />
        </div>

        <div className="photo-info">
          <span className="photo-tag" id="ph-tag">{defaultConfig.tagline}</span>
          <h1 className="photo-name" id="ph-name">{defaultConfig.designer_name}</h1>
          <ul className="photo-meta">
            <li id="ph-location">{defaultConfig.location}</li>
            <li id="ph-experience">{defaultConfig.experience}</li>
            <li id="ph-specialties">{defaultConfig.specialties}</li>
          </ul>
          <div className="photo-actions">
            <button className="photo-btn" id="ph-cta">{defaultConfig.cta_button}</button>
            <button className="photo-btn photo-btn--ghost" id="ph-cta-2">{defaultConfig.cta_secondary}</button>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
