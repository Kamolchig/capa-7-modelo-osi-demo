import { useMemo, useState } from 'react'
import { Copy } from 'lucide-react'
import { Reveal } from './Reveal'

const simulations = {
  '200': { meaning: 'Respuesta de ejemplo exitosa.', check: 'Observa cómo se ven Method, URL, Status y Response.' },
  '401': { meaning: 'Falta autenticación válida.', check: 'Observa que la respuesta ya no representa éxito.' },
  '403': { meaning: 'Sin permisos suficientes.', check: 'Compara con 401 para entender la diferencia.' },
  '404': { meaning: 'Ruta o recurso no encontrado.', check: 'Relaciona URL incorrecta con resultado.' },
  '500': { meaning: 'Error interno del servidor.', check: 'Aprende a reconocer respuestas de fallo de servicio.' }
}

export default function DemoSection() {
  const [mode, setMode] = useState('200')
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const requestPreview = useMemo(() => `GET /demo.json?v=${counter + 1}\nAccept: application/json\nCache-Control: no-store`, [counter])
  const responsePreview = useMemo(() => (result ? JSON.stringify(result.body, null, 2) : ''), [result])

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // noop
    }
  }

  const run = async () => {
    setLoading(true)
    const n = counter + 1
    setCounter(n)

    if (mode !== '200') {
      setResult({
        method: 'GET',
        url: `/simulate/${mode}?v=${n}`,
        status: mode,
        contentType: 'application/json (simulado)',
        body: { code: Number(mode), meaning: simulations[mode].meaning, check: simulations[mode].check }
      })
      setLoading(false)
      return
    }

    const url = `/demo.json?v=${n}`
    try {
      const res = await fetch(url, { cache: 'no-store' })
      const body = await res.json()
      setResult({ method: 'GET', url: res.url, status: res.status, contentType: res.headers.get('content-type') || 'N/A', body })
    } catch {
      setResult({ method: 'GET', url, status: 'NETWORK_ERROR', contentType: 'N/A', body: { error: 'No disponible' } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="demo" className="scroll-mt-28 py-24">
      <Reveal>
        <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">Demo interactiva</h2>
        <p className="mt-3 max-w-4xl text-slate-600">Actividad de aprendizaje: elige un escenario y observa qué cambia en Network.</p>
      </Reveal>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <article className="card p-7">
            <label htmlFor="status-select" className="text-sm font-medium text-slate-700">Escenario de status</label>
            <select id="status-select" value={mode} onChange={(e) => setMode(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
              <option value="200">200 (real con /demo.json)</option>
              <option value="401">401 (simulado)</option>
              <option value="403">403 (simulado)</option>
              <option value="404">404 (simulado)</option>
              <option value="500">500 (simulado)</option>
            </select>
            <button onClick={run} disabled={loading} className="btn-primary mt-4 w-full justify-center" aria-label="Generar tráfico de Capa 7">{loading ? 'Generando...' : 'Generar tráfico de Capa 7'}</button>
            <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 text-sm text-indigo-900">
              {simulations[mode].meaning} {simulations[mode].check}
            </div>
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-slate-600">
              <li>Ejecuta la prueba.</li>
              <li>Abre la request en Network.</li>
              <li>Compara Method, URL, Status y Response.</li>
            </ol>
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="card p-7">
            {result ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="result-item"><span>Método</span><strong>{result.method}</strong></div>
                <div className="result-item"><span>Status</span><strong>{result.status}</strong></div>
                <div className="result-item sm:col-span-2 break-all"><span>URL</span><strong>{result.url}</strong></div>
                <div className="result-item sm:col-span-2 break-all"><span>Content-Type</span><strong>{result.contentType}</strong></div>
                <div className="sm:col-span-2 grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="mb-2 flex items-center justify-between"><span className="text-xs uppercase text-slate-500">Request</span><button className="text-xs text-indigo-600" onClick={() => copyText(requestPreview)}><Copy className="mr-1 inline h-3.5 w-3.5" />Copiar</button></div>
                    <pre className="code-block">{requestPreview}</pre>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between"><span className="text-xs uppercase text-slate-500">Response</span><button className="text-xs text-indigo-600" onClick={() => copyText(responsePreview)}><Copy className="mr-1 inline h-3.5 w-3.5" />Copiar</button></div>
                    <pre className="code-block">{responsePreview}</pre>
                  </div>
                </div>
              </div>
            ) : <p className="text-sm text-slate-600">Elige un escenario y genera una request para verla en detalle.</p>}
          </article>
        </Reveal>
      </div>
    </section>
  )
}
