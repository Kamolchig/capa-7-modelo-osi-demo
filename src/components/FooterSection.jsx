import { Reveal } from './Reveal'

export default function FooterSection() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="py-24">
      <Reveal>
        <div className="card p-7">
          <h3 className="text-2xl font-semibold text-[#0B1220]">Lo que te llevas</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Capa 7 convierte conectividad en servicio usable.</li>
            <li>Status codes y headers son diagnóstico accionable.</li>
            <li>DevTools Network es herramienta clave para validar hipótesis.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => go('demo')}>Abrir demo</button>
            <button className="btn-secondary" onClick={() => go('capa-7')}>Repasar Capa 7</button>
          </div>
        </div>
      </Reveal>
      <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">Proyecto académico — Kamila García</footer>
    </section>
  )
}
