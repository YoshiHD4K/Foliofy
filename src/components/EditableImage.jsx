import React from 'react';

export default function EditableImage({ id, src, alt = '', onChange, editing = false, className, style }) {
  const handleClick = () => {
    if (!editing) return;
    const url = window.prompt('Nueva URL de imagen:', src || '');
    if (url != null) {
      onChange && onChange(url.trim());
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img id={id} src={src} alt={alt} className={className} style={style} onClick={handleClick} />
      {editing && (
        <span
          style={{
            position: 'absolute',
            right: 6,
            top: 6,
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            fontSize: 11,
            padding: '2px 6px',
            borderRadius: 4,
          }}
        >
          Cambiar
        </span>
      )}
    </div>
  );
}
