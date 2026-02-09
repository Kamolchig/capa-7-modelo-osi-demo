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
              <p className="font-semibold text-indigo-700">HTTP/HTTPS</p>
              <p className="mt-1">El protocolo de transferencia. La “S” indica que los datos viajan cifrados mediante TLS.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-indigo-700">DNS (Domain Name System)</p>
              <p className="mt-1">El traductor de internet. Convierte “google.com” en una dirección IP.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-indigo-700">TLS/SSL</p>
              <p className="mt-1">La capa de seguridad que crea el túnel cifrado entre tu móvil y el servidor.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-indigo-700">Idempotencia</p>
              <p className="mt-1">Propiedad de algunos métodos (como GET o PUT) donde repetir la acción no cambia el resultado final.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-indigo-700">JWT (JSON Web Token)</p>
              <p className="mt-1">El formato estándar para los tokens de seguridad que viajan en el header “Authorization”.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-indigo-700">Endpoint</p>
              <p className="mt-1">La dirección específica (URL) de un recurso en el servidor (ej: /api/v1/user).</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-indigo-700">JSON</p>
              <p className="mt-1">Formato ligero de intercambio de datos basado en texto, fácil de leer para humanos y máquinas.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-indigo-700">API (Application Programming Interface)</p>
              <p className="mt-1">El conjunto de reglas que permite que tu app y el servidor se entiendan.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-indigo-700">Status Code</p>
              <p className="mt-1">Código de 3 dígitos que resume el resultado de la petición (2xx éxito, 4xx error cliente, 5xx error servidor).</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-semibold text-indigo-700">Payload</p>
              <p className="mt-1">La “carga útil” o el cuerpo del mensaje que contiene la información real.</p>
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

      <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
        Proyecto académico —
        <span className="ml-2 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 font-semibold tracking-wide text-indigo-700">
          EQUIPO 7
        </span>
      </footer>
    </section>
  )
}
