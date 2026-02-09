import { useMemo, useState } from 'react'
import { ArrowRight, Braces, Copy, Download, Send } from 'lucide-react'
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
      <div className="w-full max-w-full overflow-hidden px-2">
      <Reveal>
        <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">Demo interactiva</h2>
        <p className="mt-3 max-w-4xl text-slate-600">Actividad de aprendizaje: elige un escenario y observa qué cambia en Network.</p>
      </Reveal>

      <Reveal delay={0.02}>
        <article className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">¿Qué estamos simulando?</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Al pulsar el botón, tu navegador genera una solicitud real de Capa 7. No es una animación; es una petición HTTP auténtica que viaja a un servidor para pedir información.
          </p>
        </article>
      </Reveal>

      <Reveal delay={0.04}>
        <article className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">El Ciclo de Vida del Clic</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-indigo-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4 text-indigo-700" />
                <p className="text-sm font-semibold text-indigo-700">LA SOLICITUD (The Request)</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Al presionar, el navegador emite un mensaje HTTP. Este incluye el <code>MÉTODO</code> (<code>GET</code>),
                la <code>URL</code> (el destino) y los <code>HEADERS</code> (como <code>Accept: application/json</code>,
                que le dice al servidor que esperamos datos, no una página completa).
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-emerald-700" />
                <p className="text-sm font-semibold text-emerald-700">LA RESPUESTA (The Response)</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                El servidor procesa la petición y devuelve un <code>STATUS</code> (<code>200 OK</code>) y un <code>PAYLOAD</code>.
                El payload es el <code>JSON</code> que ves en pantalla: una estructura de datos organizada que la aplicación usa
                para mostrarte información real.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <ArrowRight className="h-3.5 w-3.5" />
            Flujo de datos: Cliente <code>GET</code> → Servidor <code>200 OK</code> + <code>JSON</code>
          </div>
        </article>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 px-2 md:px-6 lg:grid-cols-2">
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
            <button onClick={run} disabled={loading} className="btn-primary mt-4 w-full justify-center md:w-auto" aria-label="Generar tráfico de Capa 7">{loading ? 'Generando...' : 'Generar tráfico de Capa 7'}</button>
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
                <div className="result-item sm:col-span-2 break-all"><span>URL</span><strong className="break-all">{result.url}</strong></div>
                <div className="result-item sm:col-span-2 break-all"><span>Content-Type</span><strong>{result.contentType}</strong></div>
                <div className="sm:col-span-2 flex w-full flex-col lg:flex-row">
                  <div className="w-full lg:w-1/2">
                    <div className="mb-2 flex items-center justify-between"><span className="text-xs uppercase text-slate-500">Request</span><button className="text-xs text-indigo-600" onClick={() => copyText(requestPreview)}><Copy className="mr-1 inline h-3.5 w-3.5" />Copiar</button></div>
                    <div className="w-full max-w-full overflow-x-auto rounded-lg bg-slate-900">
                      <pre className="code-block custom-scrollbar w-full break-all whitespace-pre-wrap text-xs md:text-sm">{requestPreview}</pre>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="mb-2 flex items-center justify-between"><span className="text-xs uppercase text-slate-500">Response</span><button className="text-xs text-indigo-600" onClick={() => copyText(responsePreview)}><Copy className="mr-1 inline h-3.5 w-3.5" />Copiar</button></div>
                    <div className="w-full max-w-full overflow-x-auto rounded-lg bg-slate-900">
                      <pre className="code-block custom-scrollbar w-full break-all whitespace-pre-wrap text-xs md:text-sm">{responsePreview}</pre>
                    </div>
                  </div>
                </div>
              </div>
            ) : <p className="text-sm text-slate-600">Elige un escenario y genera una request para verla en detalle.</p>}
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <article className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Guía de Lectura de la Respuesta</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li><span className="font-semibold">Status 200:</span> significa &quot;OK&quot;. El servidor procesó tu solicitud y aquí tienes tus datos.</li>
            <li className="flex gap-2">
              <Braces className="mt-0.5 h-4 w-4 text-violet-700" />
              <span><span className="font-semibold">El JSON:</span> fíjate en la estructura <code>{`{ "clave": "valor" }`}</code>.
                Es como una lista de etiquetas. Es el estándar de oro de la Capa 7 porque es ligero, fácil de leer para
                humanos y perfecto para que las computadoras lo procesen sin errores.</span>
            </li>
          </ul>
          <p className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-800">
            ¡El secreto revelado!: Lo que ves en el cuadro de &quot;Respuesta del Servidor&quot; de esta demo es exactamente lo mismo
            que verías en la pestaña &quot;Response&quot; de DevTools si inspeccionaras esta petición. La Capa 7 es transparente cuando
            sabes dónde mirar.
          </p>
        </article>
      </Reveal>
      </div>
    </section>
  )
}
