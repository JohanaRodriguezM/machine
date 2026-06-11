export default function KpiGrid({ resumen }) {
  if (!resumen) return null
  const entries = Object.entries(resumen)

  return (
    <div style={{
      display:'grid',
      gridTemplateColumns:'repeat(auto-fill, minmax(175px, 1fr))',
      gap:12, marginTop:20
    }}>
      {entries.map(([venture, data]) => (
        <div key={venture} style={{
          background:'var(--surface-2)', borderRadius:10,
          padding:'14px 16px', border:'1px solid var(--border)',
          borderLeft:'3px solid var(--blue)',
          transition:'box-shadow .15s'
        }}>
          <div style={{ fontSize:22, fontWeight:700, color:'var(--navy)', lineHeight:1 }}>
            {data.total.toLocaleString('es-CO')}
          </div>
          <div style={{ fontSize:11, fontWeight:600, color:'var(--text-muted)',
            marginTop:4, textTransform:'uppercase', letterSpacing:'.3px' }}>
            {venture}
          </div>
          <div style={{ marginTop:8, display:'flex', gap:8 }}>
            <span style={{ fontSize:11, background:'var(--blue-light)',
              color:'var(--blue)', borderRadius:4, padding:'2px 7px', fontWeight:500 }}>
              Máx {data.ftes_max} FTEs
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
