import { Reveal } from './Reveal'
import { CheckCircle, Info, Search } from 'lucide-react'

export default function DiagnosticsSection() {
  return (
    <section id="diagnostico" className="scroll-mt-28 py-24">
      <Reveal>
        <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">Cómo leer Network</h2>
        <p className="mt-3 max-w-4xl text-slate-600">
          Guía técnica para interpretar tráfico de Capa 7 sin adivinar.
        </p>
      </Reveal>

      <Reveal delay={0.02}>
        <article className="card mt-6 p-6">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">¿Qué es DevTools → Network?</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Es la &quot;Caja Negra&quot; de tu navegador. Aquí se registra cada interacción entre tu aplicación y el mundo
            exterior (servidores). Si algo no carga o da error, la respuesta SIEMPRE está aquí.
          </p>
          <p className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-800">
            Dato clave: Network es la herramienta #1 de los desarrolladores para arreglar internet.
          </p>
        </article>
      </Reveal>

      <div className="mt-8 space-y-5">
        <Reveal>
          <article className="card p-6">
            <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">Guía Paso a Paso para el Diagnóstico</h3>
            <ol className="mt-3 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>
                  <span className="font-medium text-slate-800">Paso 1:</span> Abrir (F12 o clic derecho → Inspeccionar →
                  pestaña Network).
                </span>
              </li>
              <li className="flex gap-2">
                <Search className="mt-0.5 h-4 w-4 text-indigo-600" />
                <span>
                  <span className="font-medium text-slate-800">Paso 2:</span> Filtrar. Haz clic en <code>Fetch/XHR</code> para
                  ver solo peticiones de datos de Capa 7, ignorando imágenes o estilos.
                </span>
              </li>
              <li className="flex gap-2">
                <Info className="mt-0.5 h-4 w-4 text-sky-600" />
                <span>
                  <span className="font-medium text-slate-800">Paso 3:</span> Capturar. Recarga (Ctrl+R) o realiza una acción
                  (como dar un Like) para ver la petición aparecer en tiempo real.
                </span>
              </li>
            </ol>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="card p-6">
            <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">Anatomía de una Fila (¿Qué estamos viendo?)</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><span className="font-medium text-slate-800">Name/URL:</span> el nombre del recurso y la dirección exacta.</li>
              <li><span className="font-medium text-slate-800">Method:</span> la intención (GET para pedir, POST para enviar).</li>
              <li><span className="font-medium text-slate-800">Status:</span> el resultado (200 es éxito, 404 es que no existe).</li>
              <li><span className="font-medium text-slate-800">Type:</span> el formato (busca <code>fetch</code> o <code>json</code>).</li>
              <li><span className="font-medium text-slate-800">Time:</span> cuánto tardó el servidor en procesar y enviarte los datos.</li>
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.07}>
          <article className="card p-6">
            <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">El Panel de Detalles (La Verdad del Mensaje)</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><span className="font-medium text-slate-700">Headers:</span> aquí ves la negociación; revisa si el token de autorización está presente.</li>
              <li><span className="font-medium text-slate-700">Payload:</span> aquí ves EXACTAMENTE lo que tú enviaste (por ejemplo, texto de formulario).</li>
              <li><span className="font-medium text-slate-700">Response:</span> aquí ves lo que el servidor te devolvió (JSON con datos).</li>
              <li><span className="font-medium text-slate-700">Preview:</span> versión visual y más legible del JSON.</li>
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.09}>
          <article className="card p-6">
            <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">Tips de Experto</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><span className="font-medium text-rose-700">Rojo = Problema:</span> si la fila está en rojo, suele haber error 4xx o 5xx.</li>
              <li><span className="font-medium text-slate-800">Waterfall:</span> esa barra de colores te dice si el retraso fue por tu internet o porque el servidor es lento.</li>
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
