import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/CrearBlogModal.css';

export default function CrearBlogModal({ isOpen, onClose, onPublish }) {
  const [title, setTitle] = useState('');
  const [showContentOptions, setShowContentOptions] = useState(false);
  const [contentBlocks, setContentBlocks] = useState([]);

  if (!isOpen) {
    return null;
  }

  const addContentBlock = (type) => {
    setContentBlocks([...contentBlocks, { type, value: '' }]);
    setShowContentOptions(false); // Oculta las opciones después de seleccionar una
  };

  const handleContentChange = (index, newValue) => {
    const newBlocks = [...contentBlocks];
    if (typeof newValue === 'object' && newValue !== null) { // File object
      newBlocks[index].value = URL.createObjectURL(newValue);
      newBlocks[index].file = newValue; // Store file object
    } else { // Text value
      newBlocks[index].value = newValue;
    }
    setContentBlocks(newBlocks);
  };

  const removeContentBlock = (indexToRemove) => {
    setContentBlocks(contentBlocks.filter((_, index) => index !== indexToRemove));
  };

  const handlePublish = () => {
    // Emite los datos al padre para que renderice el post en la página
    const payload = {
      title: title.trim(),
      content: contentBlocks,
      createdAt: new Date().toISOString(),
    };
    if (typeof onPublish === 'function') {
      onPublish(payload);
    }
    onClose(); // Cierra el modal después de publicar
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => {
        e.stopPropagation();
        setShowContentOptions(false);
      }}>
        <div className="modal-header" onClick={(e) => e.stopPropagation()}>
          <h2>Crear Nueva Publicación</h2>
          <button type="button" className="close-button" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="blog-title">Título</label>
            <input
              id="blog-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="El título de tu publicación"
              maxLength="60"
            />
            <small className="char-counter">{title.length}/60</small>
          </div>

          <div className="content-blocks-container">
            {contentBlocks.map((block, index) => {
              if (block.type === 'text') {
                return (
                  <div key={index} className="content-block">
                    <div className="block-header">
                      <span className="block-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                      </span>
                      <span className="block-title">Texto</span>
                    </div>
                    <button type="button" className="delete-block-btn" onClick={() => removeContentBlock(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                    <textarea
                      value={block.value}
                      onChange={(e) => handleContentChange(index, e.target.value)}
                      placeholder="Escribe tu contenido aquí..."
                      rows="8"
                    ></textarea>
                  </div>
                );
              }
              if (block.type === 'image') {
                return (
                  <div key={index} className="content-block file-block">
                    <div className="block-header">
                      <span className="block-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      </span>
                      <span className="block-title">Imagen</span>
                    </div>
                    <button type="button" className="delete-block-btn" onClick={() => removeContentBlock(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                    <label htmlFor={`file-input-${index}`} className="file-input-label">
                      <span>Seleccionar archivo</span>
                    </label>
                    <input id={`file-input-${index}`} className="file-input-hidden" type="file" accept="image/*" onChange={(e) => handleContentChange(index, e.target.files[0])} />
                    {block.file && <span className="file-name">{block.file.name}</span>}
                    {block.value && <img src={block.value} alt="Vista previa" className="media-preview" />}
                  </div>
                );
              }
              if (block.type === 'video') {
                return (
                  <div key={index} className="content-block file-block">
                    <div className="block-header">
                      <span className="block-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                      </span>
                      <span className="block-title">Video</span>
                    </div>
                    <button type="button" className="delete-block-btn" onClick={() => removeContentBlock(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                    <label htmlFor={`file-input-${index}`} className="file-input-label">
                      <span>Seleccionar archivo</span>
                    </label>
                    <input id={`file-input-${index}`} className="file-input-hidden" type="file" accept="video/*" onChange={(e) => handleContentChange(index, e.target.files[0])} />
                    {block.file && <span className="file-name">{block.file.name}</span>}
                    {block.value && <video src={block.value} controls className="media-preview" />}
                  </div>
                );
              }
              if (block.type === 'audio') {
                return (
                  <div key={index} className="content-block file-block">
                    <div className="block-header">
                      <span className="block-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                      </span>
                      <span className="block-title">Audio</span>
                    </div>
                    <button type="button" className="delete-block-btn" onClick={() => removeContentBlock(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                    <label htmlFor={`file-input-${index}`} className="file-input-label">
                      <span>Seleccionar archivo</span>
                    </label>
                    <input id={`file-input-${index}`} className="file-input-hidden" type="file" accept="audio/*" onChange={(e) => handleContentChange(index, e.target.files[0])} />
                    {block.file && <span className="file-name">{block.file.name}</span>}
                    {block.value && <audio src={block.value} controls className="media-preview" />}
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="add-content-section">
            <button type="button" className="btn btn-add" onClick={(e) => {
              e.stopPropagation();
              setShowContentOptions(!showContentOptions);
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Agregar Contenido</span>
            </button>

            {showContentOptions && (
              <div className="content-options" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="content-option-btn" onClick={() => addContentBlock('image')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <span>Imagen</span>
                </button>
                <button type="button" className="content-option-btn" onClick={() => addContentBlock('video')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                  <span>Video</span>
                </button>
                <button type="button" className="content-option-btn" onClick={() => addContentBlock('audio')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                  <span>Audio</span>
                </button>
                <button type="button" className="content-option-btn" onClick={() => addContentBlock('text')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                  <span>Texto</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>Cancelar</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={handlePublish}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            <span>Publicar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

CrearBlogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPublish: PropTypes.func,
};
