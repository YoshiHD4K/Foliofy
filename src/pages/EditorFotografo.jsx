import React, { useEffect } from 'react';
import '../assets/css/photographer.css';
import Header from '../components/Header.jsx';

export default function EditorFotografo() {
  

  const defaultConfig = {
    background_color: '#0b0b0b',
    text_color: '#e5e7eb',
    primary_action_color: '#00d4ff',
    secondary_action_color: '#6ee7b7',
    designer_name: 'Camila Rojas',
    tagline: 'Fotógrafa',
    location: 'Buenos Aires, AR',
    experience: '8 años de experiencia',
    specialties: 'Retrato · Documental · Eventos',
    cta_button: 'Ver galerías',
    cta_secondary: 'Contactarme',
    font_family: 'Inter',
    font_size: 16,
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
    document.body.style.fontFamily = `${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
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
      <Header />

      <section className="photo-card" aria-label="Carta de presentación del fotógrafo">
        <div className="photo-card__inner">
        <div className="photo-visual" aria-hidden="true">
          <img className="camera-img" src="/images/camera.png" alt="Cámara fotográfica" loading="lazy" />

          <div className="prints">
            <figure className="polaroid p1"><img src="https://picsum.photos/seed/print1/340/420" alt="Foto impresa 1" loading="lazy" /></figure>
            <figure className="polaroid p2"><img src="https://picsum.photos/seed/print2/340/420" alt="Foto impresa 2" loading="lazy" /></figure>
            <figure className="polaroid p3"><img src="https://picsum.photos/seed/print3/340/420" alt="Foto impresa 3" loading="lazy" /></figure>
          </div>
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
