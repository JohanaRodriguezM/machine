export default function Header() {
  return (
    <header style={{
      background:'var(--navy)',
      padding:'0 32px',
      height:56,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      flexShrink:0,
      boxShadow:'0 2px 8px rgba(0,0,0,0.18)'
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
        {/* Dots from Falabella logo */}
        <div style={{ display:'flex', gap:5, alignItems:'center' }}>
          {['#8B8F96','#CC2936','#1A6BAD','#4DAA57'].map((c,i) => (
            <div key={i} style={{ width:8, height:8, borderRadius:'50%', background:c }} />
          ))}
        </div>
        <span style={{
          fontWeight:700, fontSize:16, color:'white', letterSpacing:'.5px',
          fontFamily:'Inter', textTransform:'uppercase'
        }}>
          FALABELLA
        </span>
        <div style={{ width:1, height:20, background:'rgba(255,255,255,0.2)', margin:'0 4px' }} />
        <span style={{ color:'#8BACC8', fontSize:13, fontWeight:400 }}>
          Workforce Management
        </span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{
          background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)',
          borderRadius:6, padding:'4px 12px', fontSize:12, color:'#8BACC8'
        }}>
          v2.0 · React
        </div>
      </div>
    </header>
  )
}
