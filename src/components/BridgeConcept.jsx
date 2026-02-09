import { Reveal } from './Reveal'
import { GitBranch } from 'lucide-react'

export default function BridgeConcept() {
  return (
    <section className="py-20" aria-labelledby="bridge-title">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Puente conceptual</p>
        <h2 id="bridge-title" className="text-4xl font-semibold leading-tight text-[#0B1220] sm:text-5xl lg:text-6xl">
          ¿Por qué la Capa 7 es especial? <span className="text-indigo-600">(El Cartero vs. El Mensaje)</span>
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700 sm:text-lg">
          Imagina que internet es un sistema de mensajería mundial. Separamos el transporte del significado.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <Reveal>
          <article className="card border-blue-200 bg-blue-50/60 p-7 transition hover:ring-1 hover:ring-blue-300">
            <div className="mb-2 inline-flex rounded-full border border-blue-200 bg-blue-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
              Capas 1 a 6
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Mundo del transporte</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">🚚 El Trabajo del Cartero</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Se encarga de los cables, el Wi-Fi y las direcciones IP. Su única misión es que el &apos;sobre&apos; llegue a su destino intacto. No sabe qué hay dentro, solo sabe leer direcciones.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="flex items-center justify-center">
            <div className="flex h-full min-h-20 items-center justify-center rounded-2xl border border-indigo-200 bg-white/80 px-4 py-3">
              <GitBranch aria-hidden="true" className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.07}>
          <article className="card border-violet-200 bg-gradient-to-br from-violet-50/80 via-fuchsia-50/55 to-orange-50/65 p-7 transition hover:ring-1 hover:ring-violet-300">
            <div className="mb-2 inline-flex rounded-full border border-violet-200 bg-violet-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">
              Capa 7
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">Mundo de la aplicación</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">📄 El Contenido de la Carta</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Es el lenguaje de tu App. Aquí es donde se entiende si pediste ver una foto o borrar un comentario. Es la única capa que traduce los datos en acciones humanas.
            </p>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.09}>
        <p className="mt-6 text-center text-lg font-medium text-purple-600 sm:text-xl">
          <strong>Las capas 1 a 6 se encargan de que el mensaje llegue. La Capa 7 se encarga de entender qué significa ese mensaje.</strong>
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <article className="card mt-6 p-6">
          <p className="text-sm font-semibold text-slate-800">Micro-diagrama</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Acción del usuario</p>
              <p className="mt-1 text-sm text-slate-700">Tú tocas: “Ver mi perfil”</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Mensaje en lenguaje humano</p>
              <p className="mt-1 text-sm text-slate-700">La App pide: “Tráeme los datos de @usuario”</p>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
              <p className="text-xs uppercase tracking-wide text-violet-700">Respuesta del servidor</p>
              <p className="mt-1 text-sm text-slate-800">El servidor dice: “¡Aquí los tienes! (Código 200)”</p>
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
