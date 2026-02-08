import { Reveal } from './Reveal'

export default function DiagnosticsSection() {
  return (
    <section id="diagnostico" className="scroll-mt-28 py-24">
      <Reveal><h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Diagnóstico práctico (DevTools → Network)</h2></Reveal>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="card p-6">
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Abrir DevTools → pestaña Network.</li>
              <li>Recargar para capturar requests base.</li>
              <li>Abrir una request relevante.</li>
              <li>Leer Method, Status, Headers, Response y Timing.</li>
            </ol>
          </article>
        </Reveal>
        <Reveal delay={0.07}>
          <article className="card p-6">
            <p className="text-sm font-semibold text-slate-800">Checklist rápido</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>304: revisar caché (ETag, If-None-Match, Cache-Control).</li>
              <li>401/403: auth y permisos.</li>
              <li>404: endpoint y ruta.</li>
              <li>429: rate limit y retry/backoff.</li>
              <li>5xx: backend, gateway y correlación con logs.</li>
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
