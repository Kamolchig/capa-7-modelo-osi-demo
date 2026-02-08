import { Reveal } from './Reveal'

export default function SecuritySection() {
  return (
    <section id="seguridad" className="scroll-mt-28 py-24">
      <Reveal><h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Seguridad en Capa 7</h2></Reveal>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="card p-6">
            <h3 className="text-xl font-semibold">AuthN vs AuthZ</h3>
            <p className="mt-3 text-sm text-slate-600">AuthN responde “quién eres” (401 cuando falla). AuthZ responde “qué puedes hacer” (403 cuando no hay permisos).</p>
          </article>
        </Reveal>
        <Reveal delay={0.07}>
          <article className="card p-6">
            <h3 className="text-xl font-semibold">Controles recomendados</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>WAF para patrones maliciosos en HTTP.</li>
              <li>Rate limiting para abuso (429).</li>
              <li>Validación de entrada para reducir inyección.</li>
              <li>Observabilidad: logs, tracing, métricas.</li>
              <li>OWASP Top 10 como marco de referencia.</li>
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
