export default function Card({ title, children, style={} }) {
  return (
    <div style={{
      background:'var(--surface)', borderRadius:'var(--radius-lg)',
      padding:28, marginBottom:24, boxShadow:'var(--shadow)',
      border:'1px solid var(--border)', ...style
    }}>
      {title && (
        <div style={{
          fontSize:14, fontWeight:600, color:'var(--text)',
          marginBottom:20, paddingBottom:12,
          borderBottom:'1px solid var(--border)',
          display:'flex', alignItems:'center', gap:8
        }}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
