import React, { useEffect } from 'react';
import '../assets/css/artist.css';

export default function EditorArtista() {
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
    background_color: '#14121f',
    text_color: '#ffffff',
    primary_action_color: '#ff6b6b',
    secondary_action_color: '#ffd166',
    designer_name: 'Alicia Torres',
    tagline: 'Artista Visual',
    hero_title: 'Presentación',
    hero_description:
      'Artista enfocada en el color y la composición. Trabajo con medios mixtos y una estética contemporánea, buscando equilibrio entre energía y sobriedad.',
    cta_button: 'Contactar',
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
  root.style.setProperty('--artist-bg', bg);
  root.style.setProperty('--artist-fg', fg);
  root.style.setProperty('--artist-accent', acc);
  root.style.setProperty('--artist-accent-2', acc2);

    document.body.style.fontFamily = `${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
    root.style.setProperty('--artist-text-xl', `${base * 4}px`);
    root.style.setProperty('--artist-text-md', `${base * 1.1}px`);
    root.style.setProperty('--artist-text-base', `${base}px`);

    const nameEl = document.getElementById('ar-name');
    if (nameEl) nameEl.textContent = config.designer_name || defaultConfig.designer_name;
    const tagEl = document.getElementById('ar-tag');
    if (tagEl) tagEl.textContent = config.tagline || defaultConfig.tagline;
    const h1 = document.getElementById('ar-title');
    if (h1) h1.textContent = config.hero_title || defaultConfig.hero_title;
    const p = document.getElementById('ar-desc');
    if (p) p.textContent = config.hero_description || defaultConfig.hero_description;
    const cta = document.getElementById('ar-cta');
    if (cta) cta.textContent = config.cta_button || defaultConfig.cta_button;
  };

  useEffect(() => {
    if (window.elementSdk) {
      window.elementSdk.init({ defaultConfig, onConfigChange });
    } else {
      // aplicar config por defecto si no hay SDK
      onConfigChange(defaultConfig);
    }
  }, []);

  return (
    <div className="artist-page">
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

      <section className="artist-hero artist-hero--center" aria-label="Presentación del artista">
        <div className="artist-visual">
          <svg viewBox="0 0 680 420" preserveAspectRatio="xMidYMid meet" className="palette-svg" aria-hidden="true">
            <defs>
              <linearGradient id="p1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--artist-accent)" />
                <stop offset="100%" stopColor="var(--artist-accent-2)" />
              </linearGradient>
            </defs>
            {/* Paleta de dibujo estilizada */}
            <path d="M350,60 C480,60 600,140 600,240 C600,330 520,370 430,360 C420,345 410,325 385,325 C350,325 340,350 315,360 C220,360 120,320 100,235 C80,150 185,60 350,60 Z" fill="#1c1a2e" opacity="0.85" />
            {/* Agujeros de pintura */}
            <circle cx="460" cy="150" r="18" fill="url(#p1)" />
            <circle cx="500" cy="210" r="14" fill="var(--artist-accent-2)" />
            <circle cx="420" cy="230" r="16" fill="var(--artist-accent)" />
            <circle cx="520" cy="260" r="12" fill="#9b87f5" />
            {/* Pincel simple */}
            <rect x="160" y="270" width="240" height="10" rx="5" fill="#3b3a55" />
            <rect x="370" y="265" width="60" height="20" rx="10" fill="#d1b38b" />
          </svg>

          <div className="artist-avatar">
            <img id="ar-photo" src="https://picsum.photos/seed/artist-portrait/420/420" alt="Retrato del artista" loading="lazy" />
          </div>
        </div>

        <div className="artist-intro">
          <span className="artist-tag" id="ar-tag">{defaultConfig.tagline}</span>
          <h1 className="artist-name" id="ar-name">{defaultConfig.designer_name}</h1>
          <p className="artist-desc" id="ar-desc">{defaultConfig.hero_description}</p>
          <div className="artist-actions">
            <button id="ar-cta" className="artist-btn">{defaultConfig.cta_button}</button>
            <button className="artist-btn artist-btn--ghost">Ver proyectos</button>
          </div>
        </div>
      </section>
    </div>
  );
}
