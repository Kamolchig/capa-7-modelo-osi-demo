import { Reveal } from './Reveal'

export default function Layer7DeepDive() {
  return (
    <section id="capa-7" className="scroll-mt-28 py-24">
      <Reveal><h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Capa 7 en profundidad</h2></Reveal>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <Reveal>
          <article className="card p-6">
            <h3 className="text-2xl font-semibold">Intención</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Safe: GET, HEAD, OPTIONS no deberían modificar estado.</li>
              <li>Idempotentes: PUT/DELETE (mismo resultado tras repetir).</li>
              <li>POST no siempre es idempotente.</li>
              <li>PATCH aplica cambios parciales.</li>
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.06}>
          <article className="card p-6">
            <h3 className="text-2xl font-semibold">Recurso</h3>
            <p className="mt-3 text-sm text-slate-600">URL + path params + query params modelan el recurso y la consulta.</p>
            <p className="mt-3 rounded-xl bg-slate-50 p-2 text-sm"><code>/v1/users/42/profile?fields=public</code></p>
            <p className="mt-2 text-sm text-slate-600">Versionado recomendado: <code>/v1</code>, <code>/v2</code>.</p>
          </article>
        </Reveal>
        <Reveal delay={0.12}>
          <article className="card p-6">
            <h3 className="text-2xl font-semibold">Significado</h3>
            <p className="mt-3 text-sm text-slate-600">Status + headers + body describen resultado funcional.</p>
            <p className="mt-2 text-sm text-slate-600">Accept/Content-Type habilitan content negotiation.</p>
            <p className="mt-2 text-sm text-slate-600">Body puede ser JSON (API) o HTML (render server-side).</p>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
