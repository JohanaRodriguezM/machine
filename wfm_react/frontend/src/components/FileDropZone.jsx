import { useState, useRef } from 'react'

export default function FileDropZone({ file, onFile }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const handleDrop = e => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f && f.name.endsWith('.xlsx')) onFile(f)
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${file ? '#1A8B3E' : dragging ? 'var(--blue)' : 'var(--border-2)'}`,
        borderRadius: 10,
        padding: '28px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        background: file ? 'var(--ok-bg)' : dragging ? 'var(--info-bg)' : 'var(--surface-2)',
        transition: 'all .15s'
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>
        {file ? '✅' : '📂'}
      </div>
      <div style={{
        fontSize: 13, fontWeight: 600,
        color: file ? 'var(--ok-text)' : 'var(--text-muted)'
      }}>
        {file ? file.name : 'Arrastra o clic para seleccionar'}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 4 }}>
        {file ? 'Clic para cambiar archivo' : 'Archivo .xlsx con hoja "Historico"'}
      </div>
      <input ref={inputRef} type="file" accept=".xlsx" style={{ display:'none' }}
        onChange={e => e.target.files[0] && onFile(e.target.files[0])} />
    </div>
  )
}
