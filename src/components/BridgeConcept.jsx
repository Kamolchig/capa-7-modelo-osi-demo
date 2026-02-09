import { Reveal } from './Reveal'

export default function BridgeConcept() {
  return (
    <section className="py-20" aria-labelledby="bridge-title">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Puente conceptual</p>
        <h2 id="bridge-title" className="text-4xl font-semibold leading-tight text-[#0B1220] sm:text-5xl lg:text-6xl">
          Las capas 1 a 6 transportan. <span className="text-indigo-600">La capa 7 da significado.</span>
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700 sm:text-lg">
          Las capas bajas se enfocan en mover datos de un punto a otro. En Capa 7, HTTP expresa qué se pidió y la aplicación interpreta si puede responder.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="card p-7 transition hover:ring-1 hover:ring-indigo-300">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">Entrega (capas 1-6)</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Mueve datos por cable, Wi-Fi, IP y puertos.</li>
              <li>Su objetivo es que el paquete llegue al destino.</li>
              <li>Puede haber conexión aunque no haya respuesta útil.</li>
            </ul>
            <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
              Analogía: es como llevar un sobre a una dirección.
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.07}>
          <article className="card p-7 transition hover:ring-1 hover:ring-indigo-300">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Semántica (capa 7)</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Define método, ruta, headers y contenido del mensaje.</li>
              <li>La respuesta trae status y datos con significado.</li>
              <li>Aquí sabemos si la solicitud fue comprendida.</li>
            </ul>
            <p className="mt-4 rounded-xl bg-indigo-50 px-3 py-2 text-sm text-indigo-900">
              Analogía: no solo llega el sobre, también se entiende el mensaje.
            </p>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <article className="card mt-6 p-6">
          <p className="text-sm font-semibold text-slate-800">Micro-diagrama</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">UI Action</p>
              <p className="mt-1 text-sm text-slate-700">Tap en “refresh feed”</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">HTTP Request</p>
              <p className="mt-1 font-mono text-sm text-slate-800">GET /v1/feed</p>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3">
              <p className="text-xs uppercase tracking-wide text-indigo-600">HTTP Response</p>
              <p className="mt-1 text-sm text-slate-800"><span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">200 OK</span> JSON</p>
            </div>
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50/80 p-4 text-sm text-indigo-900">
          Que haya conexión no significa que el servicio ya “entienda” tu solicitud.
        </div>
      </Reveal>
    </section>
  )
}
