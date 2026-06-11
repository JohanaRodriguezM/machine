export default function ErlangForm({ params, onChange }) {
  const set = (canal, key, val) =>
    onChange({ ...params, [canal]: { ...params[canal], [key]: parseFloat(val) } })

  const Row = ({ label, field, step=0.01 }) => (
    <div style={{ display:'contents' }}>
      <div style={{ fontSize:13, color:'var(--text)', display:'flex', alignItems:'center' }}>
        {label}
      </div>
      {['Whatsapp','Phone'].map(canal => (
        <input key={canal} type="number" step={step}
          value={params[canal][field]}
          onChange={e => set(canal, field, e.target.value)}
          style={{
            padding:'8px 10px', border:'1px solid var(--border-2)',
            borderRadius:6, fontSize:13, textAlign:'center',
            outline:'none', width:'100%'
          }}
        />
      ))}
    </div>
  )

  return (
    <div style={{
      display:'grid', gridTemplateColumns:'2fr 1fr 1fr',
      gap:'8px 12px', alignItems:'center'
    }}>
      {/* Header */}
      <div />
      {['WhatsApp','Phone'].map(c => (
        <div key={c} style={{
          fontSize:11, fontWeight:700, color:'var(--text-muted)',
          textAlign:'center', textTransform:'uppercase', letterSpacing:'.4px'
        }}>{c}</div>
      ))}
      <Row label="TMO (minutos)"         field="tmo"  step={0.1} />
      <Row label="Nivel de servicio"      field="ns"   step={0.01} />
      <Row label="SLA (segundos)"         field="sla"  step={1} />
      <Row label="Ocupación"              field="ocup" step={0.01} />
    </div>
  )
}
