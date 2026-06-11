const BASE = 'http://localhost:8000'

export async function calcularProyeccion({ fileHist, anio, mes, metas, erlang }) {
  const fd = new FormData()
  fd.append('file_hist', fileHist)
  fd.append('anio', anio)
  fd.append('mes', mes)
  fd.append('metas', JSON.stringify(metas))
  fd.append('erlang', JSON.stringify(erlang))

  const res = await fetch(`${BASE}/calcular`, { method:'POST', body:fd })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data
}

export function descargarExcel(sessionId) {
  window.location.href = `${BASE}/descargar/${sessionId}`
}
