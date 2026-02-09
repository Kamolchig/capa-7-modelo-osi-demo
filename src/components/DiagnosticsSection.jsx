import { Reveal } from './Reveal'

export default function DiagnosticsSection() {
  return (
    <section id="diagnostico" className="scroll-mt-28 py-24">
      <Reveal>
        <h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Cómo leer Network </h2>
        <p className="mt-3 max-w-4xl text-slate-600">Qué es: una vista de solicitudes y respuestas del navegador. Para qué sirve: entender qué pidió la app y qué recibió.</p>
      </Reveal>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="card p-6">
            <p className="text-sm font-semibold text-slate-800">Guía paso a paso</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Abrir DevTools y entrar a la pestaña Network.</li>
              <li>Recargar la página y elegir una request.</li>
              <li>Leer Method y URL para saber qué se pidió.</li>
              <li>Leer Status y Response para saber qué devolvió el servidor.</li>
            </ol>
          </article>
        </Reveal>
        <Reveal delay={0.07}>
          <article className="card p-6">
            <p className="text-sm font-semibold text-slate-800">Lectura rápida</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><span className="font-medium text-slate-700">Method:</span> acción (GET, POST, etc.).</li>
              <li><span className="font-medium text-slate-700">URL:</span> recurso solicitado.</li>
              <li><span className="font-medium text-slate-700">Status:</span> resultado HTTP.</li>
              <li><span className="font-medium text-slate-700">Response:</span> datos devueltos.</li>
            </ul>
            <details className="mt-3 text-xs text-slate-600">
              <summary className="cursor-pointer font-medium text-indigo-700">Para profundizar</summary>
              <p className="mt-2">Puedes explorar luego códigos como 304, 401 o 5xx para entender escenarios más avanzados.</p>
            </details>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
