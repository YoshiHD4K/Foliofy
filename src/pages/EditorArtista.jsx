import React, { useEffect, useState } from 'react';
import '../assets/css/artist.css';
import EditableText from '../components/EditableText.jsx';
import EditableImage from '../components/EditableImage.jsx';
import { loadContent, saveContent } from '../lib/contentStore.js';
import Header from '../components/Header.jsx';

export default function EditorArtista() {
  const PAGE_TYPE = 'artist';
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState({});
  

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

  const nameEl = document.getElementById('title1');
  if (nameEl) nameEl.textContent = config.designer_name || defaultConfig.designer_name;
  const tagEl = document.getElementById('tag1');
  if (tagEl) tagEl.textContent = config.tagline || defaultConfig.tagline;
  const h1 = document.getElementById('title2');
  if (h1) h1.textContent = config.hero_title || defaultConfig.hero_title;
  const p = document.getElementById('paragraph1');
  if (p) p.textContent = config.hero_description || defaultConfig.hero_description;
  const cta = document.getElementById('button1');
  if (cta) cta.textContent = config.cta_button || defaultConfig.cta_button;
  };

  useEffect(() => {
    if (window.elementSdk) {
      window.elementSdk.init({ defaultConfig, onConfigChange });
    } else {
      // aplicar config por defecto si no hay SDK
      onConfigChange(defaultConfig);
    }
    (async () => {
      const { content: stored } = await loadContent(PAGE_TYPE);
      if (stored && Object.keys(stored).length) setContent(stored);
    })();
  }, []);

  return (
    <div className="artist-page">
      <Header />

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
            <EditableImage
              id="image1"
              src={content.image1 ?? 'https://picsum.photos/seed/artist-portrait/420/420'}
              alt="Retrato del artista"
              editing={editing}
              onChange={(v) => setContent((c) => ({ ...c, image1: v }))}
            />
          </div>
        </div>

        <div className="artist-intro">
          <span className="artist-tag">
            <EditableText id="tag1" as="span" editing={editing} value={content.tag1 ?? defaultConfig.tagline} onChange={(v) => setContent((c) => ({ ...c, tag1: v }))} />
          </span>
          <EditableText id="title1" as="h1" className="artist-name" editing={editing} value={content.title1 ?? defaultConfig.designer_name} onChange={(v) => setContent((c) => ({ ...c, title1: v }))} />
          <EditableText id="paragraph1" as="p" className="artist-desc" editing={editing} value={content.paragraph1 ?? defaultConfig.hero_description} onChange={(v) => setContent((c) => ({ ...c, paragraph1: v }))} />
          <div className="artist-actions">
            <button id="button1" className="artist-btn">
              <EditableText id="button1" as="span" editing={editing} value={content.button1 ?? defaultConfig.cta_button} onChange={(v) => setContent((c) => ({ ...c, button1: v }))} />
            </button>
            <button id="button2" className="artist-btn artist-btn--ghost">
              <EditableText id="button2" as="span" editing={editing} value={content.button2 ?? 'Ver proyectos'} onChange={(v) => setContent((c) => ({ ...c, button2: v }))} />
            </button>
          </div>
        </div>
      </section>
      <button
        type="button"
        className="floating-edit-button"
        aria-label={editing ? 'Guardar cambios' : 'Editar contenidos'}
        title={editing ? 'Guardar cambios' : 'Editar contenidos'}
        onClick={async () => {
          if (editing) {
            try { await saveContent(PAGE_TYPE, content); } catch {}
          }
          setEditing((e) => !e);
        }}
      >
        {editing ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z" fill="currentColor"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor"/>
            <path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
          </svg>
        )}
      </button>
    </div>
  );
}
