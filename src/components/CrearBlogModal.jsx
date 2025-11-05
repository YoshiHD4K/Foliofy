import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/CrearBlogModal.css';

export default function CrearBlogModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  if (!isOpen) {
    return null;
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePublish = () => {
    // Lógica para publicar el blog aquí
    console.log({ title, content, image });
    onClose(); // Cierra el modal después de publicar
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Crear Nueva Publicación</h2>
          <button type="button" className="close-button" onClick={onClose}>
            &times;
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
              maxLength="200"
            />
            <small className="char-counter">{title.length}/200</small>
          </div>
          <div className="form-group">
            <label htmlFor="blog-image">Imagen de cabecera</label>
            <input
              id="blog-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && <img src={image} alt="Previsualización" className="image-preview" />}
          </div>
          <div className="form-group">
            <label htmlFor="blog-content">Contenido</label>
            <textarea
              id="blog-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe tu historia..."
              rows="10"
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={handlePublish}>
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}

CrearBlogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
