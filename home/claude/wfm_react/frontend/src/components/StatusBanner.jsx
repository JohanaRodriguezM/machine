const STYLES = {
  ok:      { bg:'var(--ok-bg)',   color:'var(--ok-text)',   border:'#1A8B3E', icon:'✅' },
  error:   { bg:'var(--err-bg)', color:'var(--err-text)',  border:'#CC2936', icon:'❌' },
  loading: { bg:'var(--info-bg)',color:'var(--info-text)', border:'#1A6BAD', icon:'⏳' },
  warn:    { bg:'var(--warn-bg)',color:'var(--warn-text)',  border:'#D97706', icon:'⚠️' },
}

export default function StatusBanner({ type, message }) {
  if (!message) return null
  const s = STYLES[type] || STYLES.ok
  return (
    <div style={{
      background:s.bg, color:s.color, borderLeft:`4px solid ${s.border}`,
      borderRadius:6, padding:'12px 16px', fontSize:13,
      display:'flex', alignItems:'center', gap:10, marginTop:16
    }}>
      <span>{s.icon}</span>
      <span>{message}</span>
    </div>
  )
}
