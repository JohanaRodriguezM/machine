const PAGES = [
  { id:'proyeccion', label:'Proyección Mensual', icon:'📊' },
  { id:'mallas',     label:'Mallas de Turno',   icon:'🗓️', disabled:true },
  { id:'dashboard',  label:'Real vs Proyectado', icon:'📈', disabled:true },
]

export default function Sidebar({ active, onChange }) {
  return (
    <nav style={{
      width:220, background:'var(--navy)', flexShrink:0,
      display:'flex', flexDirection:'column', padding:'20px 12px',
      borderRight:'1px solid rgba(255,255,255,0.06)'
    }}>
      <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontWeight:600,
        textTransform:'uppercase', letterSpacing:1, padding:'0 8px', marginBottom:8 }}>
        Módulos
      </div>
      {PAGES.map(p => (
        <button key={p.id} onClick={() => !p.disabled && onChange(p.id)}
          style={{
            display:'flex', alignItems:'center', gap:10,
            padding:'10px 12px', borderRadius:7, border:'none',
            background: active===p.id ? 'rgba(26,107,173,0.25)' : 'transparent',
            borderLeft: active===p.id ? '3px solid var(--blue)' : '3px solid transparent',
            color: p.disabled ? 'rgba(255,255,255,0.25)' : active===p.id ? 'white' : 'rgba(255,255,255,0.65)',
            fontSize:13, fontWeight: active===p.id ? 600 : 400,
            cursor: p.disabled ? 'not-allowed' : 'pointer',
            marginBottom:2, textAlign:'left', width:'100%',
            transition:'all .15s'
          }}>
          <span style={{ fontSize:15 }}>{p.icon}</span>
          <span>{p.label}</span>
          {p.disabled && <span style={{ marginLeft:'auto', fontSize:9,
            background:'rgba(255,255,255,0.1)', borderRadius:4, padding:'2px 6px',
            color:'rgba(255,255,255,0.3)' }}>Pronto</span>}
        </button>
      ))}
    </nav>
  )
}
