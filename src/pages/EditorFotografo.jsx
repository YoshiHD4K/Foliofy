import React, { useEffect, useState } from 'react';
import '../assets/css/photographer.css';
import EditableText from '../components/EditableText.jsx';
import { loadContent, saveContent } from '../lib/contentStore.js';
import Header from '../components/Header.jsx';

export default function EditorFotografo() {
  const PAGE_TYPE = 'photographer';
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState({});
  

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

  const name = document.getElementById('title1');
    if (name) name.textContent = config.designer_name || defaultConfig.designer_name;
  const tag = document.getElementById('tag1');
    if (tag) tag.textContent = config.tagline || defaultConfig.tagline;
  const loc = document.getElementById('item1');
    if (loc) loc.textContent = config.location || defaultConfig.location;
  const exp = document.getElementById('item2');
    if (exp) exp.textContent = config.experience || defaultConfig.experience;
  const spec = document.getElementById('item3');
    if (spec) spec.textContent = config.specialties || defaultConfig.specialties;
  const cta1 = document.getElementById('button1');
    if (cta1) cta1.textContent = config.cta_button || defaultConfig.cta_button;
  const cta2 = document.getElementById('button2');
    if (cta2) cta2.textContent = config.cta_secondary || defaultConfig.cta_secondary;
  };

  useEffect(() => {
    if (window.elementSdk) {
      window.elementSdk.init({ defaultConfig, onConfigChange });
    } else {
      onConfigChange(defaultConfig);
    }
    (async () => {
      console.log('[Fotografo] Cargando contenido inicial para', PAGE_TYPE);
      const { content: stored } = await loadContent(PAGE_TYPE);
      console.log('[Fotografo] Contenido cargado:', stored);
      if (stored && Object.keys(stored).length) setContent(stored);
    })();
  }, []);

  // Logs del modo edición y listeners para saber qué campo entra/sale de edición
  useEffect(() => {
    console.log('[Fotografo] Toggle edición ->', editing);
    if (!editing) return;
    const nodes = Array.from(document.querySelectorAll('[data-editable]'));
    console.log('[Fotografo] Campos en edición:', nodes.map(n => n.id || n.tagName));
    const onFocus = (e) => console.log('[Fotografo] Focus en', e.target.id || e.target.tagName, 'valor:', e.target.textContent);
    const onBlur = (e) => console.log('[Fotografo] Blur en', e.target.id || e.target.tagName, 'valor:', e.target.textContent);
    const onInput = (e) => console.log('[Fotografo] Cambiando', e.target.id || e.target.tagName, '->', e.target.textContent);
    nodes.forEach(n => {
      n.addEventListener('focus', onFocus, true);
      n.addEventListener('blur', onBlur, true);
      n.addEventListener('input', onInput, true);
    });
    return () => {
      nodes.forEach(n => {
        n.removeEventListener('focus', onFocus, true);
        n.removeEventListener('blur', onBlur, true);
        n.removeEventListener('input', onInput, true);
      });
    };
  }, [editing]);

  return (
    <div className="photo-page">
      <Header />
      {editing && <div className="edit-badge">EDITANDO</div>}

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
          <span className="photo-tag">
            <EditableText id="tag1" as="span" editing={editing} value={content.tag1 ?? defaultConfig.tagline} onChange={(v) => setContent((c) => ({ ...c, tag1: v }))} />
          </span>
          <EditableText id="title1" as="h1" className="photo-name" editing={editing} value={content.title1 ?? defaultConfig.designer_name} onChange={(v) => setContent((c) => ({ ...c, title1: v }))} />
          <ul className="photo-meta">
            <li id="item1"><EditableText id="item1" as="span" editing={editing} value={content.item1 ?? defaultConfig.location} onChange={(v) => setContent((c) => ({ ...c, item1: v }))} /></li>
            <li id="item2"><EditableText id="item2" as="span" editing={editing} value={content.item2 ?? defaultConfig.experience} onChange={(v) => setContent((c) => ({ ...c, item2: v }))} /></li>
            <li id="item3"><EditableText id="item3" as="span" editing={editing} value={content.item3 ?? defaultConfig.specialties} onChange={(v) => setContent((c) => ({ ...c, item3: v }))} /></li>
          </ul>
          <div className="photo-actions">
            {editing ? (
              <div className="photo-btn" id="button1" role="button" aria-disabled="true">
                <EditableText id="button1" as="span" editing={editing} value={content.button1 ?? defaultConfig.cta_button} onChange={(v) => setContent((c) => ({ ...c, button1: v }))} />
              </div>
            ) : (
              <button type="button" className="photo-btn" id="button1">
                <EditableText id="button1" as="span" editing={editing} value={content.button1 ?? defaultConfig.cta_button} onChange={(v) => setContent((c) => ({ ...c, button1: v }))} />
              </button>
            )}

            {editing ? (
              <div className="photo-btn photo-btn--ghost" id="button2" role="button" aria-disabled="true">
                <EditableText id="button2" as="span" editing={editing} value={content.button2 ?? defaultConfig.cta_secondary} onChange={(v) => setContent((c) => ({ ...c, button2: v }))} />
              </div>
            ) : (
              <button type="button" className="photo-btn photo-btn--ghost" id="button2">
                <EditableText id="button2" as="span" editing={editing} value={content.button2 ?? defaultConfig.cta_secondary} onChange={(v) => setContent((c) => ({ ...c, button2: v }))} />
              </button>
            )}
          </div>
        </div>
        </div>
      </section>
      <button
        type="button"
        className="floating-edit-button"
        aria-label={editing ? 'Guardar cambios' : 'Editar contenidos'}
        title={editing ? 'Guardar cambios' : 'Editar contenidos'}
        onClick={async () => {
          console.group('[Fotografo] Click botón flotante');
          console.log('Estado actual editing =', editing);
          if (editing) {
            console.log('[Fotografo] Guardando contenido', { type: PAGE_TYPE, keys: Object.keys(content || {}) });
            try {
              await saveContent(PAGE_TYPE, content);
              console.log('[Fotografo] Guardado OK');
            } catch (err) {
              console.error('[Fotografo] Error al guardar', err);
            }
          } else {
            console.log('[Fotografo] Entrando a modo edición');
          }
          setEditing((e) => !e);
          console.groupEnd();
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
      <button
        type="button"
        className="floating-edit-button floating-secondary-button"
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
