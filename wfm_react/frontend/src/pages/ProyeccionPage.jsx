import { useState } from 'react'
import Card from '../components/Card'
import FileDropZone from '../components/FileDropZone'
import MetasForm from '../components/MetasForm'
import ErlangForm from '../components/ErlangForm'
import KpiGrid from '../components/KpiGrid'
import StatusBanner from '../components/StatusBanner'
import { calcularProyeccion, descargarExcel } from '../api/wfm'

const MESES = [
  {v:6,l:'Junio'},{v:7,l:'Julio'},{v:8,l:'Agosto'},{v:9,l:'Septiembre'},
  {v:10,l:'Octubre'},{v:11,l:'Noviembre'},{v:12,l:'Diciembre'}
]

const DEFAULT_ERLANG = {
  Whatsapp: { tmo:8.5, ns:0.85, sla:55, ocup:0.85 },
  Phone:    { tmo:6.5, ns:0.85, sla:15, ocup:0.80 },
}

const DEFAULT_METAS = {
  FACL:123009, FACO:27446, FAPE:35412,
  SOCL_SODCOM:20518, SOPE:11965, SOCL_TIENDAS:32520,
  SOCL_TS:25894, TOCL:5679, TOPE:4072
}

const Step = ({ num, title, subtitle }) => (
  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
    <div style={{
      width:32, height:32, borderRadius:'50%', background:'var(--navy)',
      color:'white', display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:13, fontWeight:700, flexShrink:0
    }}>{num}</div>
    <div>
      <div style={{ fontSize:14, fontWeight:600 }}>{title}</div>
      {subtitle && <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:1 }}>{subtitle}</div>}
    </div>
  </div>
)

export default function ProyeccionPage() {
  const [file, setFile]       = useState(null)
  const [anio, setAnio]       = useState(2026)
  const [mes, setMes]         = useState(6)
  const [metas, setMetas]     = useState(DEFAULT_METAS)
  const [erlang, setErlang]   = useState(DEFAULT_ERLANG)
  const [status, setStatus]   = useState({ type:'', msg:'' })
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)

  const calcular = async () => {
    if (!file) { setStatus({ type:'error', msg:'Selecciona el archivo histórico primero' }); return }
    setLoading(true)
    setResult(null)
    setStatus({ type:'loading', msg:'Calculando proyección... puede tomar 30–60 segundos' })
    try {
      const data = await calcularProyeccion({ fileHist:file, anio, mes, metas, erlang })
      setResult(data)
      setStatus({ type:'ok', msg:`✅ ${data.total_filas.toLocaleString('es-CO')} filas generadas — proyección lista` })
    } catch(e) {
      setStatus({ type:'error', msg: e.message })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    padding:'9px 12px', border:'1px solid var(--border-2)',
    borderRadius:6, fontSize:13, outline:'none',
    background:'var(--surface)', color:'var(--text)', width:'100%'
  }

  const btnStyle = (variant='primary') => ({
    padding:'11px 28px', border:'none', borderRadius:8,
    fontSize:14, fontWeight:600, cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? .6 : 1, transition:'all .15s',
    background: variant==='primary' ? 'var(--navy)' : 'var(--green)',
    color:'white'
  })

  return (
    <div style={{ maxWidth:900 }}>
      {/* Title */}
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:22, fontWeight:700, color:'var(--navy)' }}>
          Proyección Mensual
        </h1>
        <p style={{ fontSize:13, color:'var(--text-muted)', marginTop:4 }}>
          Comportamiento actual 2026 × estacionalidad 2025 × Erlang C
        </p>
      </div>

      {/* Paso 1 */}
      <Card>
        <Step num={1} title="Cargar Histórico" subtitle="Archivo .xlsx con hoja Historico" />
        <FileDropZone file={file} onFile={setFile} />
      </Card>

      {/* Paso 2 */}
      <Card>
        <Step num={2} title="Mes a Proyectar" />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, maxWidth:340 }}>
          <div>
            <label style={{ fontSize:11, fontWeight:600, color:'var(--text-muted)',
              textTransform:'uppercase', letterSpacing:'.4px', display:'block', marginBottom:5 }}>
              Año
            </label>
            <select value={anio} onChange={e => setAnio(+e.target.value)} style={inputStyle}>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize:11, fontWeight:600, color:'var(--text-muted)',
              textTransform:'uppercase', letterSpacing:'.4px', display:'block', marginBottom:5 }}>
              Mes
            </label>
            <select value={mes} onChange={e => setMes(+e.target.value)} style={inputStyle}>
              {MESES.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
            </select>
          </div>
        </div>
      </Card>

      {/* Paso 3 */}
      <Card>
        <Step num={3} title="Metas por Venture"
          subtitle="Actualiza solo los valores que cambien este mes" />
        <MetasForm metas={metas} onChange={setMetas} />
      </Card>

      {/* Paso 4 */}
      <Card>
        <Step num={4} title="Parámetros Erlang C"
          subtitle="Ajusta si el negocio lo solicitó, de lo contrario deja los valores actuales" />
        <ErlangForm params={erlang} onChange={setErlang} />
      </Card>

      {/* Calcular */}
      <Card style={{ textAlign:'center', padding:'32px 28px' }}>
        <button style={btnStyle('primary')} onClick={calcular} disabled={loading}>
          {loading ? '⏳ Calculando...' : '🚀 Calcular Proyección'}
        </button>

        <StatusBanner type={status.type} message={status.msg} />

        {result && (
          <div style={{ marginTop:24 }}>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)',
              textTransform:'uppercase', letterSpacing:'.5px', marginBottom:4 }}>
              Resultado por Venture
            </div>
            <KpiGrid resumen={result.resumen} />
            <div style={{ marginTop:24 }}>
              <button style={btnStyle('success')}
                onClick={() => descargarExcel(result.session_id)}>
                📥 Descargar Excel
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
