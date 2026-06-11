const VENTURES = [
  { id:'FACL',        label:'FACL',         note:'Chile F.com',       default:123009 },
  { id:'FACO',        label:'FACO',         note:'Colombia F.com',    default:27446  },
  { id:'FAPE',        label:'FAPE',         note:'Perú F.com',        default:35412  },
  { id:'SOCL_SODCOM', label:'SOCL SODCOM',  note:'Sodimac Chile',     default:20518  },
  { id:'SOPE',        label:'SOPE',         note:'Sodimac Perú',      default:11965  },
  { id:'SOCL_TIENDAS',label:'SOCL TIENDAS', note:'Tiendas CH',        default:32520  },
  { id:'SOCL_TS',     label:'SOCL TS',      note:'TS Chile',          default:25894  },
  { id:'TOCL',        label:'TOCL',         note:'Tottus Chile',      default:5679   },
  { id:'TOPE',        label:'TOPE',         note:'Tottus Perú',       default:4072   },
]

export default function MetasForm({ metas, onChange }) {
  return (
    <div>
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill, minmax(185px,1fr))',
        gap:10
      }}>
        {VENTURES.map(v => (
          <div key={v.id} style={{
            background:'var(--surface-2)', borderRadius:8,
            padding:'10px 12px', border:'1px solid var(--border)'
          }}>
            <label style={{
              fontSize:10, fontWeight:700, color:'var(--text-muted)',
              textTransform:'uppercase', letterSpacing:'.4px', display:'block', marginBottom:5
            }}>{v.label}</label>
            <input type="number"
              value={metas[v.id] ?? v.default}
              onChange={e => onChange({ ...metas, [v.id]: +e.target.value })}
              style={{
                width:'100%', padding:'7px 10px',
                border:'1px solid var(--border-2)', borderRadius:6,
                fontSize:13, outline:'none', fontWeight:600
              }}
            />
            <div style={{ fontSize:10, color:'var(--text-light)', marginTop:4 }}>{v.note}</div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop:12, padding:'8px 12px', background:'var(--warn-bg)',
        borderRadius:6, fontSize:11, color:'var(--warn-text)',
        border:'1px solid #FDE68A'
      }}>
        ⚡ SAC_AR · SAC_UY · SOPE_INST · VENTAS_AR/UY · MAT_AR/UY → proyectados por comportamiento histórico
      </div>
    </div>
  )
}

export { VENTURES }
