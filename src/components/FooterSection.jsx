import { Reveal } from './Reveal'

export default function FooterSection() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="py-24">
      <Reveal>
        <div className="card p-7">
          <h3 className="text-2xl font-semibold text-[#0B1220]">Lo que te llevas</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              El modelo OSI te ayuda a separar problemas por niveles: no todo error es de “internet”; cada capa cumple una función concreta.
            </li>
            <li>
              En Capa 7, HTTP permite expresar la intención (método), el recurso (URL) y el resultado (status + headers + body) de una solicitud.
            </li>
            <li>
              DevTools Network te permite observar esta conversación en tiempo real y entender, paso a paso, qué pidió tu app y qué respondió el servidor.
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => go('demo')}>Abrir demo</button>
            <button className="btn-secondary" onClick={() => go('capa-7')}>Repasar Capa 7</button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="card mt-6 p-6">
          <h4 className="text-lg font-semibold text-slate-900">Glosario rápido</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Request</p>
              <p className="mt-1">Petición que envía el cliente al servidor.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Response</p>
              <p className="mt-1">Respuesta del servidor con status, headers y datos.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Header</p>
              <p className="mt-1">Metadato que describe el mensaje HTTP.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Payload / Body</p>
              <p className="mt-1">Contenido principal de la solicitud o respuesta.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Status Code</p>
              <p className="mt-1">Código numérico que resume el resultado HTTP.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">CORS</p>
              <p className="mt-1">Regla del navegador para controlar acceso entre orígenes.</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="card mt-6 p-6">
          <h4 className="text-lg font-semibold text-slate-900">Cómo se hizo esta página</h4>
          <p className="mt-2 text-sm text-slate-600">
            Esta landing fue desarrollada con <strong>React + Vite</strong> para una carga rápida, <strong>Tailwind CSS</strong> para el diseño visual, y <strong>Framer Motion</strong> para animaciones suaves.
            También incluye un fondo de partículas en <strong>Canvas</strong> y una demo interactiva con <strong>fetch</strong> para visualizar tráfico real en DevTools.
          </p>
        </div>
      </Reveal>

      <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">Proyecto académico — Kamila García</footer>
    </section>
  )
}
