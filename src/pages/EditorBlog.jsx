import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/inicio.css';
import '../assets/css/CrearBlog.css';
import CrearBlogModal from '../components/CrearBlogModal';
import Header from '../components/Header.jsx';
import EditableText from '../components/EditableText.jsx';
import { loadContent, saveContent } from '../lib/contentStore.js';

export default function EditorBlog() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [post, setPost] = useState(null);
  const PAGE_TYPE = 'blog';
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState({});
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
  useEffect(() => {
    (async () => {
      const { content: stored } = await loadContent(PAGE_TYPE);
      if (stored && Object.keys(stored).length) setContent(stored);
    })();
  }, []);
  return (
    <div className="main-wrapper">
      <Header />
      <div style={{ 
        position: 'fixed',
        top: '70px', 
        right: '5%',
        zIndex: 999
      }}>
        <button 
          type="button" 
          onClick={() => setModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'linear-gradient(to right, #CA09BC, #7C27C2, #3A41C6)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Crear Publicación
        </button>
      </div>
  <div className="container" style={{ flex: 1, padding: '0 2%' }}>
        {!post ? (
          <section className="hero" style={{ alignItems: 'flex-start', paddingTop: '3rem' }}>
            <div className="hero-content" style={{ maxWidth: 720 }}>
              <EditableText id="title1" as="h1" editing={editing} value={content.title1 ?? 'Crea y personaliza tu blog'} onChange={(v) => setContent((c) => ({ ...c, title1: v }))} />
            </div>
          </section>
        ) : (
          <div className="posts-container">
            <section className="blog-post">
              <article className="post-card">
              {/* Portada: primera imagen si existe */}
              {(() => {
                const cover = post.content?.find((b) => b.type === 'image');
                return cover ? (
                  <div className="post-cover">
                    <img src={cover.value} alt={cover.file?.name || 'portada'} />
                  </div>
                ) : null;
              })()}

              {/* Título */}
              {post.title && <h1 className="post-title">{post.title}</h1>}

              {/* Meta info */}
              <div className="post-meta">
                <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time>
              </div>

              {/* Cuerpo */}
              <div className="post-content">
                {post.content?.map((block, idx) => {
                  if (block.type === 'text') {
                    return (
                      <div key={idx} className="post-block block-text">
                        <p className="post-paragraph">{block.value}</p>
                      </div>
                    );
                  }
                  if (block.type === 'image') {
                    return (
                      <div key={idx} className="post-block block-image">
                        <img src={block.value} alt={block.file?.name || `imagen-${idx}`} className="post-media" />
                      </div>
                    );
                  }
                  if (block.type === 'video') {
                    return (
                      <div key={idx} className="post-block block-video">
                        <video src={block.value} controls className="post-media" />
                      </div>
                    );
                  }
                  if (block.type === 'audio') {
                    return (
                      <div key={idx} className="post-block block-audio">
                        <audio src={block.value} controls className="post-audio" />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              </article>
            </section>
          </div>
        )}
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

      <CrearBlogModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onPublish={(payload) => {
          setPost(payload);
        }}
      />
    </div>
  );
}
