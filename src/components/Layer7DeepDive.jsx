import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Key, Link2, MessageSquare, MessageSquareText, Settings2, ShieldCheck, Terminal } from 'lucide-react'
import { Reveal } from './Reveal'
import Layer7ConceptBlocks from './Layer7ConceptBlocks'

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
    <ul className="mt-2 space-y-2 text-sm text-slate-700">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-700">
              {item.label}
            </span>{' '}
            <span className="text-sm text-slate-600">{item.description}</span>
          </span>
        </li>
      ))}
    </ul>
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

function CardBlock({ step, icon, title, idea, badges = [], bullets, example, devtools, extra }) {
  return (
    <article className="card p-6 transition hover:ring-1 hover:ring-indigo-300">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-2.5 text-indigo-700">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Paso {step}</p>
          <h3 className="mt-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-semibold text-transparent">{title}</h3>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-200/80 pt-3">
        <SectionLabel>Idea clave</SectionLabel>
        <p className="mt-2 text-sm leading-relaxed tracking-[0.01em] text-slate-700">{idea}</p>
        {badges.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge.label} className={badge.className}>
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 border-t border-slate-200/80 pt-3">
        <SectionLabel>{LABEL_KEY_POINTS}</SectionLabel>
        <ul className="mt-2 space-y-1 text-sm leading-relaxed tracking-[0.01em] text-slate-700">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2"><span className="text-emerald-600">✔️</span>{b}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t border-slate-200/80 pt-3">
        <SectionLabel>Ejemplo</SectionLabel>
        <CodeBlock>{example}</CodeBlock>
      </div>

      <div className="mt-4 border-t border-slate-200/80 pt-3">
        <SectionLabel>En DevTools mira</SectionLabel>
        <div className="mt-2 rounded-xl border-l-4 border-purple-400 bg-purple-50/50 p-3">
          <DevtoolsChips items={devtools} />
        </div>
      </div>

      <Collapsible title="Ver más">{extra}</Collapsible>
    </article>
  )
}

function DeepDisclosure({ id, activeId, onToggle, title, icon, children }) {
  const open = activeId === id
  return (
    <article className="card p-0">
      <button
        onClick={() => onToggle(id)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
      >
        <span className="flex items-center gap-2">
          <span className="rounded-xl border border-indigo-200 bg-indigo-50 p-1.5 text-indigo-700">{icon}</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">{title}</span>
        </span>
        <span className="text-xs font-semibold text-indigo-700">{open ? 'Ocultar' : 'Expandir'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-slate-200/80"
          >
            <div className="px-5 py-4 text-sm leading-relaxed text-slate-700">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default function Layer7DeepDive() {
  const [activeAdvanced, setActiveAdvanced] = useState('headers')
  const onToggleAdvanced = (id) => {
    setActiveAdvanced((prev) => (prev === id ? '' : id))
  }
  const qrValue = encodeURIComponent('https://donde-la-red-entiende-al-usuario.vercel.app/')
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${qrValue}`

  return (
    <section id="capa-7" className="scroll-mt-28 py-24">
      <Reveal>
        <motion.h2
          initial={{ opacity: 0, y: 8, textShadow: '0 0 0 rgba(147,51,234,0)' }}
          whileInView={{ opacity: 1, y: 0, textShadow: '0 0 18px rgba(147,51,234,0.12)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl"
        >
          Capa 7 en profundidad
        </motion.h2>
        <p className="mt-3 max-w-4xl text-base text-slate-700 sm:text-lg">
          Así es como tu teléfono le pide cosas a Internet: intención, recurso y respuesta.
        </p>
      </Reveal>

      <Reveal delay={0.01}>
        <article className="card mx-auto mt-5 w-full max-w-xs p-4 text-center">
          <div className="mx-auto w-fit rounded-2xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] p-[2px]">
            <div className="rounded-2xl bg-white p-2">
              <img
                src={qrSrc}
                alt="QR para abrir la guía en móvil"
                width="160"
                height="160"
                className="mx-auto block h-auto max-w-full rounded-lg"
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">Escanea para llevar la guía a tu móvil 🚀</p>
        </article>
      </Reveal>

      <Reveal delay={0.02}>
        <article className="card mt-6 border-purple-200 bg-purple-50 p-6">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-semibold text-transparent">Guía de conversación Humano-Servidor</h3>
          <p className="mt-3 text-sm leading-relaxed tracking-[0.01em] text-slate-700">
            Antes de pedir datos, la Capa 7 usa <span className="font-semibold text-purple-600">DNS</span>: es la guía telefónica que traduce nombres (google.com) en direcciones que internet entiende. Sin esto, tendrías que memorizar números complejos para entrar a cualquier red social.
          </p>
          <p className="mt-2 text-sm leading-relaxed tracking-[0.01em] text-slate-700">
            DNS es el traductor: tú escribes <code>instagram.com</code> y él te entrega una IP como <code>157.240.x.x</code>. Sin él, estaríamos perdidos en un mar de números.
          </p>
        </article>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <Reveal>
          <CardBlock
            step={1}
            icon={<FileText className="h-6 w-6" />}
            title="Intención (método HTTP)"
            idea={<><span className="font-semibold text-purple-600">GET</span>, <span className="font-semibold text-purple-600">POST</span>, <span className="font-semibold text-purple-600">PUT</span> y <span className="font-semibold text-purple-600">PATCH</span> definen la intención real de la operación sobre el recurso.</>}
            badges={[
              { label: 'GET', className: 'rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600' },
              { label: 'POST', className: 'rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600' },
              { label: 'PUT', className: 'rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600' },
              { label: 'PATCH', className: 'rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600' }
            ]}
            bullets={[
              'Idempotencia: GET y PUT son idempotentes (puedes repetirlos sin causar efectos secundarios extra), mientras que POST no lo es (cada click puede crear un duplicado).',
              'PATCH actualiza solo un pedacito del recurso; PUT reemplaza el recurso completo.',
              'En diseño de APIs, elegir bien el método evita errores de negocio y efectos no deseados.'
            ]}
            example={`GET /v1/feed\nPUT /v1/users/42\nPATCH /v1/users/42 { "bio": "Actualizada" }\nPOST /v1/messages { "text": "Hola" }`}
            devtools={[
              { label: 'Method', description: '¿Qué acción pedí?' },
              { label: 'Payload', description: '¿Qué datos envié?' },
              { label: 'Headers', description: 'La letra chiquita del mensaje.' }
            ]}
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
            step={2}
            icon={<Link2 className="h-6 w-6" />}
            title="Recurso (URL y parámetros)"
            idea={<>La <span className="font-semibold text-purple-600">URL</span> define exactamente a qué servidor, por qué canal y a qué recurso quieres acceder.</>}
            badges={[
              { label: 'https://ejemplo.com:443/api/v1/users?id=10', className: 'rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700' }
            ]}
            bullets={[
              'Esquema: https (define el nivel de seguridad).',
              'Host: ejemplo.com (apunta al servidor vía DNS) y puerto :443 (canal por defecto para HTTPS).',
              'Path: /api/v1/users (jerarquía lógica de los datos) + Query String: ?id=10 (filtrar o buscar).',
              'Nota técnica: El puerto vive en la Capa 4, pero la Capa 7 lo usa para decidir si la conexión será segura (HTTPS) o no.'
            ]}
            example={`https://ejemplo.com:443/api/v1/users?id=10\nhttps://api.redes.edu:443/v1/feed?limit=10&cursor=abc`}
            devtools={[
              { label: 'Method', description: '¿Qué acción pedí?' },
              { label: 'URL', description: '¿A qué recurso se lo pedí?' },
              { label: 'Headers', description: 'La letra chiquita del mensaje.' }
            ]}
            extra={
              <>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-purple-200 bg-white p-4 shadow-lg shadow-purple-100/50">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                      <h4 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-sm font-semibold text-transparent">
                        El Idioma de la Aplicación
                      </h4>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Para que dos computadoras se entiendan en la Capa 7, deben seguir un acuerdo. Si una pide una foto, la otra debe saber entregar una foto y no un video. A este acuerdo lo llamamos el lenguaje de la aplicación.
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      Sin un <span className="font-bold text-purple-600">Lenguaje común</span>, se pierde el <span className="font-bold text-purple-600">Significado de los datos</span>.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-purple-200 bg-white p-4 shadow-lg shadow-purple-100/50">
                    <div className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-purple-600" />
                      <h4 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-sm font-semibold text-transparent">
                        Seguridad para Humanos
                      </h4>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Aquí es donde se decide la privacidad. La Capa 7 es la encargada de revisar que tú seas quien dices ser antes de mostrarte tus mensajes privados.
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      En esta capa se protege tu <span className="font-bold text-purple-600">Privacidad</span> con reglas comprensibles para la aplicación.
                    </p>
                  </div>
                </div>
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.12}>
          <CardBlock
            step={3}
            icon={<MessageSquareText className="h-6 w-6" />}
            title="Significado (status + headers + payload)"
            idea={<>El código de estado no es decoración: expresa la semántica de la respuesta del servidor en un rango bien definido.</>}
            badges={[
              { label: '1xx', className: 'rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600' },
              { label: '2xx', className: 'rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600' },
              { label: '3xx', className: 'rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600' },
              { label: '4xx', className: 'rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600' },
              { label: '5xx', className: 'rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600' }
            ]}
            bullets={[
              '1xx: informativos (el proceso continúa); 2xx: éxito (todo salió como se esperaba).',
              '3xx: redirección (el recurso se movió o se sirve desde caché).',
              '4xx: error del cliente (formato, autenticación o permisos); 5xx: error del servidor (falló backend).'
            ]}
            example={`HTTP/1.1 200 OK\nHTTP/1.1 302 Found\nHTTP/1.1 404 Not Found\nHTTP/1.1 500 Internal Server Error`}
            devtools={[
              { label: 'Status', description: '¿Me hicieron caso?' },
              { label: 'Headers', description: 'La letra chiquita del mensaje.' },
              { label: 'Payload', description: '¿Qué datos envié o recibí?' }
            ]}
            extra={
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cheat-sheet de status</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li><span className="font-medium">2xx:</span> la solicitud fue aceptada correctamente (ejemplo: <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">200</span> / 204).</li>
                  <li><span className="font-medium">3xx:</span> redirección o caché; <span className="font-medium">304</span> significa “sin cambios”, no error.</li>
                  <li><span className="font-medium">4xx:</span> el problema está en la solicitud del cliente o sus permisos.</li>
                  <li><span className="font-medium">401:</span> falta autenticación válida (token ausente, vencido o incorrecto).</li>
                  <li><span className="font-medium">403:</span> el usuario está autenticado, pero no tiene autorización.</li>
                  <li><span className="font-medium">5xx:</span> el servidor falló al procesar una solicitud válida.</li>
                  <li><span className="font-medium">418 - I&apos;m a teapot:</span> un código real creado como broma que demuestra que HTTP es un lenguaje vivo.</li>
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

      <Reveal delay={0.2}>
        <section className="mt-8 space-y-4" aria-label="Profundización avanzada de Capa 7">
          <DeepDisclosure
            id="headers"
            activeId={activeAdvanced}
            onToggle={onToggleAdvanced}
            title="Headers: El ADN de la Solicitud"
            icon={<Settings2 className="h-4 w-4" />}
          >
            <p>
              Aquí está el contexto que define cómo debe comportarse la conversación entre cliente y servidor.
            </p>
            <ul className="mt-3 space-y-2">
              <li><span className="font-semibold"><code>User-Agent</code>:</span> le dice al servidor si eres un iPhone o un PC para que te envíe la versión correcta de la web.</li>
              <li><span className="font-semibold"><code>Authorization: Bearer ...</code>:</span> es como mostrar un carnet VIP en la puerta de una discoteca.</li>
              <li><span className="font-semibold"><code>Content-Type</code> vs <code>Accept</code>:</span> uno dice qué envío y el otro dice qué espero recibir. Si no coinciden, la comunicación falla.</li>
            </ul>
          </DeepDisclosure>

          <DeepDisclosure
            id="payload"
            activeId={activeAdvanced}
            onToggle={onToggleAdvanced}
            title="Payload: La Carne del Mensaje"
            icon={<Terminal className="h-4 w-4" />}
          >
            <p>
              Aquí viaja el dato real de negocio, más allá de los metadatos de control.
            </p>
            <ul className="mt-3 space-y-2">
              <li><span className="font-semibold">Request Body:</span> solo existe en métodos como <code>POST</code>/<code>PUT</code>/<code>PATCH</code>. Es donde viaja tu contraseña o el texto de tu tweet.</li>
              <li><span className="font-semibold">Response Body:</span> es lo que el servidor devuelve, por ejemplo JSON con fotos o HTML de la página.</li>
              <li><span className="font-semibold">JSON y lenguaje agnóstico:</span> un servidor en Java puede hablar con un cliente en JavaScript gracias a este formato.</li>
            </ul>
          </DeepDisclosure>

          <DeepDisclosure
            id="tls"
            activeId={activeAdvanced}
            onToggle={onToggleAdvanced}
            title="Seguridad y el Túnel SSL/TLS"
            icon={<ShieldCheck className="h-4 w-4" />}
          >
            <p>
              El handshake no es magia: es un acuerdo matemático. Cliente y servidor eligen una llave de sesión para que nadie en el camino pueda leer el mensaje.
            </p>
            <ul className="mt-2 space-y-1">
              <li><span className="font-semibold">Handshake:</span> negociación de parámetros criptográficos antes del HTTP real.</li>
              <li><span className="font-semibold">El candado:</span> HTTPS es HTTP viajando dentro de un sobre cifrado.</li>
              <li><span className="font-semibold">Sin TLS:</span> tus contraseñas podrían viajar en texto plano por el Wi-Fi.</li>
            </ul>
            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">
              🔒 Conexión Segura
            </div>
          </DeepDisclosure>

          <DeepDisclosure
            id="cors"
            activeId={activeAdvanced}
            onToggle={onToggleAdvanced}
            title="CORS: El Guardaespaldas del Navegador"
            icon={<ShieldCheck className="h-4 w-4" />}
          >
            <p>
              Antes de enviar tus datos, el navegador hace una pregunta invisible: <span className="font-semibold">preflight <code>OPTIONS</code></span>.
              Básicamente pregunta: “¿Tienes permiso para recibir esto?”.
              Si el servidor no responde con headers CORS válidos, el navegador bloquea la respuesta por tu seguridad.
            </p>
          </DeepDisclosure>
        </section>
      </Reveal>

      <Layer7ConceptBlocks />

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
