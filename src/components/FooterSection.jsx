import { Reveal } from './Reveal'
import { Code2, Wind, Cpu, Globe } from 'lucide-react'

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
          <h4 className="text-lg font-semibold text-slate-900">Detrás de escena: ¿Cómo creamos esta guía?</h4>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="mb-2 inline-flex rounded-xl border border-indigo-200 bg-indigo-50 p-2.5 text-indigo-700">
                <Code2 size={20} />
              </div>
              <p className="font-semibold text-slate-800">Estructura: React + Vite</p>
              <p className="mt-1">
                Usamos React para que la página sea rápida y responda al instante cuando haces clic en la demo, sin recargas molestas.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="mb-2 inline-flex rounded-xl border border-indigo-200 bg-indigo-50 p-2.5 text-indigo-700">
                <Wind size={20} />
              </div>
              <p className="font-semibold text-slate-800">Estilo: Tailwind CSS</p>
              <p className="mt-1">
                Es lo que nos permite que todo se vea bonito y se adapte perfectamente a tu celular o computadora.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="mb-2 inline-flex rounded-xl border border-indigo-200 bg-indigo-50 p-2.5 text-indigo-700">
                <Cpu size={20} />
              </div>
              <p className="font-semibold text-slate-800">Animaciones: Framer Motion</p>
              <p className="mt-1">
                Para que las capas OSI y los textos aparezcan con suavidad, haciendo que la lectura sea más entretenida.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="mb-2 inline-flex rounded-xl border border-indigo-200 bg-indigo-50 p-2.5 text-indigo-700">
                <Cpu size={20} />
              </div>
              <p className="font-semibold text-slate-800">Datos reales: Fetch API</p>
              <p className="mt-1">
                Usamos la tecnología estándar del navegador para conectarnos a un servidor real y mostrarte cómo viaja la información.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 md:col-span-2 xl:col-span-1">
              <div className="mb-2 inline-flex rounded-xl border border-indigo-200 bg-indigo-50 p-2.5 text-indigo-700">
                <Globe size={20} />
              </div>
              <p className="font-semibold text-slate-800">Hosting: Vercel</p>
              <p className="mt-1">
                Donde vive nuestra página para que sea accesible desde cualquier parte del mundo con solo un link.
              </p>
            </div>
          </div>
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
