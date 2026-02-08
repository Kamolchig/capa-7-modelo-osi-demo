import { useState } from 'react'
import { Reveal } from './Reveal'

const layers = [
  { n: 7, t: 'Aplicación', d: 'HTTP/HTTPS, DNS, SMTP, APIs.', ex: 'Semántica del servicio.' },
  { n: 6, t: 'Presentación', d: 'Formato, serialización, compresión.', ex: 'JSON, encoding, cifrado conceptual.' },
  { n: 5, t: 'Sesión', d: 'Control de sesión y estado.', ex: 'Apertura/cierre de contexto conversacional.' },
  { n: 4, t: 'Transporte', d: 'TCP/UDP, puertos y confiabilidad.', ex: 'Retransmisión, control de flujo.' },
  { n: 3, t: 'Red', d: 'IP y routing.', ex: 'Selección de camino entre redes.' },
  { n: 2, t: 'Enlace', d: 'MAC, switching, VLAN.', ex: 'Tramas y dominio local.' },
  { n: 1, t: 'Física', d: 'Medio y señal.', ex: 'Bits sobre cobre, fibra o radio.' }
]

export default function OsiOverview() {
  const [open, setOpen] = useState(7)
  return (
    <section id="modelo-osi" className="scroll-mt-28 py-24">
      <Reveal><h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Modelo OSI (acordeón de contexto)</h2></Reveal>
      <div className="mt-8 space-y-3">
        {layers.map((l, i) => (
          <Reveal key={l.n} delay={i * 0.03}>
            <article className={`card p-5 ${open === l.n ? 'ring-1 ring-indigo-300' : ''}`}>
              <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen(open === l.n ? 0 : l.n)} aria-label={`Abrir capa ${l.n}`}>
                <span className={`font-semibold ${l.n === 7 ? 'text-indigo-700' : 'text-slate-900'}`}>Capa {l.n} · {l.t}</span>
                <span className="text-sm text-slate-500">{open === l.n ? 'Ocultar' : 'Ver'}</span>
              </button>
              {open === l.n && (
                <div className="mt-3 text-sm text-slate-600">
                  <p>{l.d}</p>
                  <p className="mt-2 text-slate-700">Ejemplo: {l.ex}</p>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
