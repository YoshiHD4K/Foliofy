import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import '../assets/css/inicio.css'; 
import EditableText from '../components/EditableText.jsx';
import { loadContent, saveContent } from '../lib/contentStore.js';

export default function EditorInicio() {
  const navigate = useNavigate();
  const PAGE_TYPE = 'designer';
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState({});
  
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
  // Aplicar color de texto a un posible logo o enlaces si existen
  const logoEl = document.getElementById('logo');
  if (logoEl) logoEl.style.color = textColor;
  const navLinks = document.querySelectorAll('.hero-nav-link');
  navLinks.forEach(link => { link.style.color = textColor; });
    
    document.documentElement.style.setProperty('--primary-action-color', primaryActionColor);
    
    const tagEl = document.getElementById('tag1');
    if (tagEl) {
      tagEl.style.backgroundColor = surfaceColor;
      tagEl.style.color = primaryActionColor;
    }
    
    document.querySelectorAll('.cta-button').forEach(btn => {
      btn.style.backgroundColor = primaryActionColor;
      btn.style.color = '#ffffff';
    });
    
    document.getElementById('circle-1').style.backgroundColor = primaryActionColor;
    document.getElementById('circle-2').style.backgroundColor = secondaryActionColor;
    document.getElementById('circle-3').style.backgroundColor = surfaceColor;

    const fontStack = `${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  document.body.style.fontFamily = fontStack;

  if (logoEl) logoEl.style.fontSize = `${baseFontSize * 1.5}px`;
  navLinks.forEach(link => { link.style.fontSize = `${baseFontSize * 0.95}px`; });
  if (tagEl) tagEl.style.fontSize = `${baseFontSize * 0.85}px`;
  const titleEl = document.getElementById('title1');
  if (titleEl) titleEl.style.fontSize = `${baseFontSize * 4}px`;
  const pEl = document.getElementById('paragraph1');
  if (pEl) pEl.style.fontSize = `${baseFontSize * 1.25}px`;
  document.querySelectorAll('.cta-button').forEach(btn => { btn.style.fontSize = `${baseFontSize}px`; });

  if (logoEl) logoEl.textContent = config.designer_name || defaultConfig.designer_name;
  if (tagEl) tagEl.textContent = config.tagline || defaultConfig.tagline;
  if (titleEl) titleEl.textContent = config.hero_title || defaultConfig.hero_title;
  if (pEl) pEl.textContent = config.hero_description || defaultConfig.hero_description;
  const btn1 = document.getElementById('button1');
  if (btn1) btn1.textContent = config.cta_button || defaultConfig.cta_button;
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
    // Cargar contenido guardado
    (async () => {
      const { content: stored } = await loadContent(PAGE_TYPE);
      if (stored && Object.keys(stored).length) setContent(stored);
    })();
  }, []);

  return (
    <div className="main-wrapper"> 
      <Header />

      <div className="container" style={{ flex: 1 }}>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-tag">
              <EditableText
                id="tag1"
                as="div"
                editing={editing}
                value={content.tag1 ?? defaultConfig.tagline}
                onChange={(v) => setContent((c) => ({ ...c, tag1: v }))}
              />
            </div>
            <EditableText
              id="title1"
              as="h1"
              editing={editing}
              value={content.title1 ?? defaultConfig.hero_title}
              onChange={(v) => setContent((c) => ({ ...c, title1: v }))}
            />
            <EditableText
              id="paragraph1"
              as="p"
              editing={editing}
              value={content.paragraph1 ?? defaultConfig.hero_description}
              onChange={(v) => setContent((c) => ({ ...c, paragraph1: v }))}
            />
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              <button type="button" className="cta-button" id="button1">
                <EditableText
                  id="button1"
                  as="span"
                  editing={editing}
                  value={content.button1 ?? defaultConfig.cta_button}
                  onChange={(v) => setContent((c) => ({ ...c, button1: v }))}
                />
              </button>
              <button type="button" className="cta-button" id="button2">
                <EditableText
                  id="button2"
                  as="span"
                  editing={editing}
                  value={content.button2 ?? 'Contactame'}
                  onChange={(v) => setContent((c) => ({ ...c, button2: v }))}
                />
              </button>
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
          // Icono guardar (check)
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z" fill="currentColor"/>
          </svg>
        ) : (
          // Icono lápiz
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor"/>
            <path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
          </svg>
        )}
      </button>
    </div>
  );
}
