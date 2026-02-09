import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Reveal'

const LABEL_KEY_POINTS = 'PUNTOS CLAVE'

function SectionLabel({ children }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{children}</p>
}

function CodeBlock({ children }) {
  return (
    <pre className="mt-2 h-28 overflow-x-auto rounded-xl bg-slate-950 p-3 text-xs leading-relaxed text-cyan-200">
      {children}
    </pre>
  )
}

function DevtoolsChips({ items }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
          {item}
        </span>
      ))}
    </div>
  )
}

function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-3 border-t border-slate-200/80 pt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-xs font-semibold text-indigo-700 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
      >
        {open ? 'Ocultar detalles' : title}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 text-sm text-slate-700">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CardBlock({ title, idea, bullets, example, devtools, extra }) {
  return (
    <article className="card p-6 transition hover:ring-1 hover:ring-indigo-300">
      <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>

      <div className="mt-4 border-t border-slate-200/80 pt-3">
        <SectionLabel>Idea clave</SectionLabel>
        <p className="mt-2 text-sm text-slate-700">{idea}</p>
      </div>

      <div className="mt-4 border-t border-slate-200/80 pt-3">
        <SectionLabel>{LABEL_KEY_POINTS}</SectionLabel>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />{b}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t border-slate-200/80 pt-3">
        <SectionLabel>Ejemplo</SectionLabel>
        <CodeBlock>{example}</CodeBlock>
      </div>

      <div className="mt-4 border-t border-slate-200/80 pt-3">
        <SectionLabel>En DevTools mira</SectionLabel>
        <DevtoolsChips items={devtools} />
      </div>

      <Collapsible title="Ver más">{extra}</Collapsible>
    </article>
  )
}

export default function Layer7DeepDive() {
  return (
    <section id="capa-7" className="scroll-mt-28 py-24">
      <Reveal>
        <h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Capa 7 en profundidad</h2>
        <p className="mt-3 max-w-4xl text-base text-slate-700 sm:text-lg">
          En Capa 7, HTTP define intención (método), recurso (URL) y significado (respuesta).
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <Reveal>
          <CardBlock
            title="Intención (método HTTP)"
            idea="El método HTTP indica qué quiere hacer el cliente: leer, crear, actualizar o eliminar. Piensa en el método como el verbo de una oración: primero dices la acción y luego el servidor actúa. “Safe” significa que no debería cambiar datos, e “idempotente” que repetir la misma operación no debería cambiar el resultado final."
            bullets={[
              'Si una acción es de lectura (GET), importa porque puedes repetirla sin alterar información.',
              'Si una acción es idempotente (como PUT/DELETE en la práctica), importa porque reintentos no deberían duplicar efectos.',
              'POST y PATCH requieren más cuidado: su comportamiento depende de la implementación de la API y la lógica de negocio.'
            ]}
            example={`GET /v1/feed?limit=10\nPOST /v1/messages { "text": "Hola, clase" }\nPATCH /v1/users/42 { "bio": "Aprendiendo OSI" }`}
            devtools={['Method', 'Payload', 'Initiator']}
            extra={
              <>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600">
                      <tr>
                        <th className="px-2 py-2">Método</th>
                        <th className="px-2 py-2">Propósito</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-100"><td className="px-2 py-2">GET</td><td className="px-2 py-2">Leer recurso</td></tr>
                      <tr className="border-t border-slate-100"><td className="px-2 py-2">POST</td><td className="px-2 py-2">Crear/acción</td></tr>
                      <tr className="border-t border-slate-100"><td className="px-2 py-2">PUT</td><td className="px-2 py-2">Reemplazar</td></tr>
                      <tr className="border-t border-slate-100"><td className="px-2 py-2">PATCH</td><td className="px-2 py-2">Actualizar parcial</td></tr>
                      <tr className="border-t border-slate-100"><td className="px-2 py-2">DELETE</td><td className="px-2 py-2">Eliminar</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-slate-600">Nota: la idempotencia final depende de cómo implemente la API cada operación.</p>
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.06}>
          <CardBlock
            title="Recurso (URL y parámetros)"
            idea="La URL define sobre qué cosa se está operando. El path identifica el recurso principal y los parámetros de query ajustan cómo lo quieres recibir. Es similar a pedir un libro por código y luego elegir edición o cantidad de resultados."
            bullets={[
              'Path params importan porque apuntan a una entidad concreta (por ejemplo, un usuario específico).',
              'Query params importan porque permiten filtrar y paginar sin cambiar la identidad del recurso.',
              'Versionar (por ejemplo /v1) y nombrar de forma consistente ayuda a mantener APIs claras y mantenibles.'
            ]}
            example={`/v1/users/42/profile?fields=public\n/v1/feed?limit=10&cursor=abc`}
            devtools={['Request URL', 'Query String Params', 'Initiator']}
            extra={
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Anti-ejemplos</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>Token sensible en URL/query.</li>
                  <li>Rutas ambiguas como <code>/doStuff</code>.</li>
                </ul>
                <p className="mt-2 text-xs text-slate-600">
                  Un contrato API es el acuerdo entre cliente y servidor sobre rutas, campos y formatos de respuesta. Versionar
                  endpoints (por ejemplo, <code>/v1</code>, <code>/v2</code>) permite evolucionar la API sin romper clientes antiguos.
                  Además, nombres descriptivos de recursos facilitan entender qué hace cada ruta.
                </p>
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.12}>
          <CardBlock
            title="Significado (status + headers + payload)"
            idea="El servidor siempre responde y esa respuesta tiene significado: status, headers y payload cuentan la historia completa. Un 200 indica éxito técnico de la transacción HTTP, pero no garantiza éxito del negocio. Para entender realmente qué pasó, hay que leer también el contenido de la respuesta."
            bullets={[
              'El status importa porque guía el diagnóstico inicial (cliente, permisos, servidor o éxito).',
              'Accept y Content-Type importan porque deben coincidir para interpretar correctamente el formato de datos.',
              'ETag e If-None-Match importan para caché: un 304 evita descargar de nuevo contenido sin cambios.'
            ]}
            example={`HTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: max-age=60\n\n{ "items": ["post1", "post2"], "next": "/v1/feed?cursor=def" }`}
            devtools={['Status', 'Response Headers', 'Response/Preview', 'Time']}
            extra={
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cheat-sheet de status</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li><span className="font-medium">2xx:</span> la solicitud fue aceptada correctamente (ejemplo: 200/204).</li>
                  <li><span className="font-medium">3xx:</span> redirección o caché; <span className="font-medium">304</span> significa “sin cambios”, no error.</li>
                  <li><span className="font-medium">4xx:</span> el problema está en la solicitud del cliente o sus permisos.</li>
                  <li><span className="font-medium">401:</span> falta autenticación válida (token ausente, vencido o incorrecto).</li>
                  <li><span className="font-medium">403:</span> el usuario está autenticado, pero no tiene autorización.</li>
                  <li><span className="font-medium">5xx:</span> el servidor falló al procesar una solicitud válida.</li>
                </ul>
                <p className="mt-2 text-xs text-slate-600">
                  Nota: el caché condicional puede confundir el diagnóstico porque un 304 evita descargar el contenido otra vez;
                  parece que “no pasó nada”, pero en realidad el navegador reutilizó datos válidos almacenados.
                </p>
              </>
            }
          />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-8 grid gap-3 md:grid-cols-3"
        >
          <motion.article variants={{ hidden: { opacity: 0, y: 16, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }} className="card p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">UI Action</p>
            <p className="mt-1 text-sm text-slate-800">Tap en “refresh feed”</p>
          </motion.article>
          <motion.article variants={{ hidden: { opacity: 0, y: 16, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }} className="card p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">HTTP Request</p>
            <p className="mt-1 font-mono text-sm text-slate-800">GET /v1/feed?limit=10</p>
          </motion.article>
          <motion.article variants={{ hidden: { opacity: 0, y: 16, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }} className="card p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">HTTP Response</p>
            <p className="mt-1 text-sm text-slate-800">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">200 OK</span>{' '}
              (JSON)
            </p>
          </motion.article>
        </motion.div>
      </Reveal>
    </section>
  )
}
