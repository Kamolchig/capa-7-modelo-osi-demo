import { Reveal } from './Reveal'

const chips = ['HTTP', 'HTTPS', 'DNS', 'APIs', 'Auth', 'Status Codes']
const learnCards = [
  { t: 'Request y Response', d: 'Verás que una app "conversa" con un servidor: primero solicita (request) y luego recibe respuesta (response).' },
  { t: 'Método, URL y Status', d: 'Aprenderás qué significa cada parte básica de una solicitud y por qué el status cambia.' },
  { t: 'DevTools básico', d: 'Usaremos Network para leer lo esencial: Method, URL, Status, Headers y Response.' }
]

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="inicio" className="scroll-mt-28 pt-36 pb-16">
      <Reveal>
        <div className="hero-shell p-8 sm:p-12 lg:p-16">
          <h1 className="text-[40px] font-semibold leading-[1.05] text-[#0B1220] sm:text-[56px] lg:text-[78px]">
            Cuando abres <span className="insta-highlight">Instagram</span>, la red no ve “posts”.
            <br className="hidden lg:block" /> Ve solicitudes y respuestas.
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg">
            HTTP es el idioma principal de la Capa 7: permite pedir recursos y recibir respuestas con significado.
            En esta guía veremos ejemplos simples y cómo leerlos paso a paso en DevTools → Network.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => <button key={c} className="chip-chip">{c}</button>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => go('demo')}>Ver demo en vivo</button>
            <button className="btn-secondary" onClick={() => go('modelo-osi')}>Explorar OSI</button>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {learnCards.map((c, i) => (
          <Reveal key={c.t} delay={i * 0.06}>
            <article className="card p-5"><p className="font-semibold text-slate-900">{c.t}</p><p className="mt-2 text-sm text-slate-600">{c.d}</p></article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
