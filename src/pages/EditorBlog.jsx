import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/inicio.css';
import '../assets/css/CrearBlog.css';
import CrearBlogModal from '../components/CrearBlogModal';

export default function EditorBlog() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [post, setPost] = useState(null);
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
  return (
    <div className="main-wrapper">
      {/* Header fijo con opciones */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '12px 16px',
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button type="button" style={headerBtnStyle} onClick={() => navigate('/editor/inicio')}>Inicio</button>
        <button type="button" style={headerBtnStyle} onClick={() => navigate('/editor/blog')}>Blog</button>
        <button type="button" style={headerBtnStyle}>Proyectos</button>
      </div>
      <div style={{ height: 56 }} />
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
              <h1 id="hero-title">Crea y personaliza tu blog</h1>
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
        aria-label="Personalizar blog"
        title="Personalizar blog"
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
