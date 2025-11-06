import React, { useEffect, useRef } from 'react';

function EditableText({
  id,
  value,
  onChange,
  editing = false,
  as: Tag = 'span',
  className,
  style,
  placeholder,
}) {
  const ref = useRef(null);

  // Mantén el DOM como fuente de la verdad mientras editas para no perder el caret.
  // Cuando NO estás editando, sincroniza el contenido con `value`.
  useEffect(() => {
    if (!editing && ref.current) {
      const next = (value ?? '').toString();
      if (ref.current.textContent !== next) {
        ref.current.textContent = next;
      }
    }
  }, [value, editing]);

  const minimalStyle = editing
    ? {
        outline: 'none',
        borderBottom: '1px dashed rgba(0,0,0,0.15)',
        cursor: 'text',
        direction: 'ltr',
        unicodeBidi: 'plaintext',
      }
    : { direction: 'ltr', unicodeBidi: 'plaintext' };

  const handleInput = (e) => {
    // No actualizamos estado local para no forzar re-render y mover el caret.
    const text = e.currentTarget.textContent;
    if (onChange) onChange(text);
  };

  return (
    <Tag
      id={id}
      ref={ref}
      className={className}
      style={{ ...style, ...minimalStyle }}
      contentEditable={editing}
      suppressContentEditableWarning
      onInput={editing ? handleInput : undefined}
      aria-label={editing ? 'Editar texto' : undefined}
      data-editable
    >
      {/* Cuando no editamos, React controla el contenido; cuando editamos, lo controla el DOM */}
      {!editing ? (value ?? '') : (ref.current?.textContent || placeholder || '')}
    </Tag>
  );
}

// Evita re-renderizar mientras estás editando, para que React no toque el DOM y mueva el caret.
export default React.memo(EditableText, (prev, next) => {
  // Si cambia el modo de edición, debemos re-renderizar.
  if (prev.editing !== next.editing) return false;
  // Si no estamos editando y cambia el value, debemos re-renderizar para pintar el nuevo valor.
  if (!next.editing && prev.value !== next.value) return false;
  // Si cambian props estructurales, re-renderiza.
  if (prev.id !== next.id || prev.as !== next.as || prev.className !== next.className) return false;
  // Estilo/placeholder rara vez cambian dinámicamente; si cambian y estamos editando, es seguro omitir.
  return true;
});
