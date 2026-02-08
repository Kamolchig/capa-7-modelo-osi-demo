import { Reveal } from './Reveal'

export default function BridgeConcept() {
  return (
    <section className="py-20">
      <Reveal>
        <h2 className="text-4xl font-semibold leading-tight text-[#0B1220] sm:text-5xl lg:text-6xl">
          Las capas 1 a 6 transportan. <span className="text-indigo-600">La capa 7 da significado.</span>
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="card p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Entrega</p>
            <p className="mt-3 text-slate-700">Paquetes, puertos, rutas, latencia y conectividad entre extremos.</p>
            <p className="mt-3 text-sm text-slate-600">Ejemplo: TCP establece conexión, IP elige ruta.</p>
          </article>
        </Reveal>
        <Reveal delay={0.07}>
          <article className="card p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Semántica</p>
            <p className="mt-3 text-slate-700">La app interpreta método, URL, status, headers y payload.</p>
            <p className="mt-3 text-sm text-slate-600">Ejemplo: 401 indica auth, 404 indica ruta/recurso.</p>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
