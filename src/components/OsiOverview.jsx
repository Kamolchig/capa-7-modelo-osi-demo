import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Layers, Zap } from 'lucide-react'
import { Reveal } from './Reveal'

const OSI_LAYERS = [
  { id: 7, name: 'Aplicación' },
  { id: 6, name: 'Presentación' },
  { id: 5, name: 'Sesión' },
  { id: 4, name: 'Transporte' },
  { id: 3, name: 'Red' },
  { id: 2, name: 'Enlace' },
  { id: 1, name: 'Física' }
]

const layerMeta = {
  7: { protocols: ['HTTP/HTTPS', 'DNS', 'REST', 'WebSocket'] },
  6: { protocols: ['UTF-8', 'JSON', 'TLS', 'gzip'] },
  5: { protocols: ['Cookies', 'Session ID', 'Keep-Alive', 'WebSocket'] },
  4: { protocols: ['TCP', 'UDP', 'Puertos'] },
  3: { protocols: ['IPv4', 'IPv6', 'ICMP'] },
  2: { protocols: ['Ethernet', 'Wi-Fi', 'ARP', 'VLAN'] },
  1: { protocols: ['Señal eléctrica', 'Fibra', 'Radio'] }
}

const layerTags = {
  7: ['HTTP', 'JSON', 'SSL/TLS'],
  6: ['HTTP', 'JSON', 'SSL/TLS'],
  5: ['Session ID', 'RPC'],
  4: ['TCP', 'UDP', 'Puertos'],
  3: ['IPv4/IPv6', 'ICMP'],
  2: ['MAC Address', 'Frames'],
  1: ['Bits', 'Señal Eléctrica']
}

function toBitSample(message) {
  const encoder = new TextEncoder()
  const bytes = Array.from(encoder.encode(message || 'Hola, Grupo 👋'))
  const limited = bytes.slice(0, 8)
  const bits = limited.map((b) => b.toString(2).padStart(8, '0')).join(' ')
  return `${bits}${bytes.length > 8 ? ' ...' : ''}`
}

function getLayerContent(layerId, committedMessage, technical) {
  const msg = committedMessage || 'Hola, Grupo 👋'

  const base = {
    7: {
      whatIs:
        'Es la capa donde la aplicación expresa intención: qué quieres hacer y sobre qué recurso.',
      howWorks: [
        `Cuando envías "${msg}", la app crea una solicitud con método, ruta y contenido.`,
        'El servidor interpreta esa solicitud y devuelve una respuesta con significado.',
        'Aquí nacen los elementos que ves en Network: Method, URL, Status y Response.'
      ],
      beginnerTip:
        'Piensa en esta capa como una conversación con reglas: pides algo y recibes una respuesta entendible.',
      example: `Ejemplo simple: enviar mensaje -> POST /api/messages con "${msg}"`,
      observable: 'Method, URL, Status y Response.',
      technicalIntro:
        'Esto es una solicitud HTTP real; así es como las apps piden datos.',
      humanTranslation:
        'Lo que ves arriba es una petición formal. El método POST le dice al servidor que quieres enviarle algo nuevo (tu mensaje).',
      technicalView: `POST /api/messages HTTP/1.1\nHost: app.ejemplo.com\nContent-Type: application/json\nAccept: application/json\n\n{\n  "message": "${msg}"\n}`
    },
    6: {
      whatIs:
        'Es la capa que transforma y presenta los datos para que ambos lados los entiendan igual.',
      howWorks: [
        `Tu mensaje "${msg}" se serializa a JSON y luego se codifica en bytes (por ejemplo UTF-8).`,
        'Si la conexión usa HTTPS, TLS protege el contenido mientras viaja.',
        'Esta capa define el formato en que el mensaje será interpretado.'
      ],
      beginnerTip:
        'Aquí tu texto deja de verse como frase “humana” y se vuelve un formato estándar para intercambio.',
      example: `Ejemplo simple: "${msg}" pasa de texto legible a formato estructurado.`,
      observable: 'Content-Type y Content-Encoding.',
      technicalIntro:
        'Aquí se ve el formato de datos y la protección conceptual por TLS.',
      humanTranslation:
        'Aquí tu mensaje se convierte a un formato estándar (JSON/bytes) para que ambos lados lo interpreten igual.',
      technicalView: `Representación de datos\nEncoding: UTF-8\nBody: {"message":"${msg}"}\n\nTLS record: [Encrypted Application Data]\nNota: el payload real es ilegible por cifrado (TLS).`
    },
    5: {
      whatIs:
        'Organiza la continuidad de la conversación para que el intercambio no se “pierda” entre pantallas.',
      howWorks: [
        'Mantiene contexto con sesión, cookies o conexión persistente.',
        `Así, tu mensaje "${msg}" sigue dentro de la misma conversación de usuario.`,
        'Permite que varias acciones se sientan como una sola interacción continua.'
      ],
      beginnerTip:
        'Sin este contexto, cada acción parecería nueva y la app olvidaría quién eres.',
      example: 'Ejemplo simple: la sesión conserva tu estado al navegar y enviar datos.',
      observable: 'Cookie y Set-Cookie.',
      technicalIntro:
        'Este bloque muestra señales típicas de contexto de sesión.',
      humanTranslation:
        'Esta parte ayuda a mantener el contexto de la conversación para que la app recuerde tu sesión.',
      technicalView: `Session Context\nCookie: sid=KAMILA-SESSION-001\nConnection: keep-alive\nX-Session-State: active`
    },
    4: {
      whatIs:
        'Es la capa que transporta datos de extremo a extremo con reglas de entrega.',
      howWorks: [
        'En TCP se usan puertos, orden y confirmaciones para entregar correctamente.',
        `Tu mensaje "${msg}" se fragmenta en segmentos para viajar de forma confiable.`,
        'Si hay error o pérdida, TCP puede retransmitir.'
      ],
      beginnerTip:
        'Aquí no importa “qué significa” el mensaje, importa que llegue completo y en orden.',
      example: 'Ejemplo simple: tu equipo envía desde un puerto local al 443 del servidor.',
      observable: 'Timing (DNS, Connect, SSL, TTFB).',
      technicalIntro:
        'Aquí se observan campos típicos de un segmento TCP.',
      humanTranslation:
        'Este segmento organiza la entrega confiable: puertos, orden y confirmaciones para que llegue bien.',
      technicalView: `TCP Segment\nsrcPort: 52344\ndstPort: 443\nseq: 1201\nack: 9001\nflags: PSH,ACK\nchecksum: OK`
    },
    3: {
      whatIs:
        'Define por qué camino viajan los paquetes entre redes mediante direcciones IP.',
      howWorks: [
        'Cada paquete lleva IP origen e IP destino para poder enrutarlo.',
        `Tu mensaje "${msg}" cruza varios equipos intermedios hasta llegar al servidor.`,
        'Los routers eligen la mejor ruta disponible en ese momento.'
      ],
      beginnerTip:
        'IP funciona como una dirección postal: indica desde dónde sale y a dónde debe llegar.',
      example: 'Ejemplo simple: el paquete sale de tu red local y atraviesa routers en Internet.',
      observable: 'Host y dominio de destino de la solicitud.',
      technicalIntro:
        'Este bloque resume un encabezado IP simplificado.',
      humanTranslation:
        'Esas direcciones numéricas (srcIP/dstIP) son como los códigos postales. Sin ellas, el paquete no sabría a qué casa llegar en todo el mundo.',
      technicalView: `IP Packet\nsrcIP: 192.168.1.25\ndstIP: 142.250.190.14\nTTL: 64\nprotocol: TCP`
    },
    2: {
      whatIs:
        'Organiza el envío local dentro de tu red (Wi-Fi o cable) usando tramas.',
      howWorks: [
        'Usa direcciones MAC para mover datos dentro del mismo segmento.',
        `Tu mensaje "${msg}" viaja en una trama que incluye control de errores local (CRC/FCS).`,
        'Esta capa opera en el tramo local entre tu equipo y el siguiente dispositivo.'
      ],
      beginnerTip:
        'Es la “logística” de corta distancia dentro de tu red local.',
      example: 'Ejemplo simple: la trama va del equipo al router o punto de acceso.',
      observable: 'En web suele no verse directo en DevTools.',
      technicalIntro:
        'Esto representa la envoltura local de enlace.',
      humanTranslation:
        'Aquí se mueve el paquete dentro de tu red local usando direcciones MAC y verificación de errores.',
      technicalView: `Ethernet Frame\n[dstMAC][srcMAC][type][payload][FCS]\nchecksum/CRC: OK`
    },
    1: {
      whatIs:
        'Es el nivel de señal: transforma datos en pulsos eléctricos, luz o radio.',
      howWorks: [
        `Tu mensaje "${msg}" deja de verse como texto y se convierte en bits.`,
        'Aquí solo existe transmisión física; no se interpreta contenido de aplicación.',
        'El receptor reconstruye esos bits para que las capas superiores los vuelvan a interpretar.'
      ],
      beginnerTip:
        'La computadora ya no lee letras aquí, solo cambios de señal.',
      example: `Ejemplo simple: "${msg}" se envía como una secuencia binaria por el medio físico.`,
      observable: 'En DevTools no se ve como status; aquí importa la señal física.',
      technicalIntro:
        'Lo que ves abajo es la representación eléctrica de tu mensaje. La computadora ya no lee letras, solo impulsos.',
      humanTranslation:
        'Esos ceros y unos son la única forma en que el hardware entiende tu mensaje. Cada letra de "Hola" se convirtió en un patrón de electricidad.',
      technicalView: `Bitstream (muestra real)\n01001000 01101111 01101100 01100001 ...\n${toBitSample(msg)}`
    }
  }

  const content = base[layerId]
  return {
    title: `Capa ${layerId} · ${OSI_LAYERS.find((l) => l.id === layerId)?.name || ''}`,
    protocols: layerMeta[layerId].protocols,
    tags: layerTags[layerId] || [],
    ...content,
    visual: technical ? content.technicalView : null
  }
}

export default function OsiOverview() {
  const [draftMessage, setDraftMessage] = useState('Hola, Grupo 👋')
  const [committedMessage, setCommittedMessage] = useState('Hola, Grupo 👋')
  const [technical, setTechnical] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState(7)
  const [encapTick, setEncapTick] = useState(0)
  const [showEncapBadge, setShowEncapBadge] = useState(false)
  const activeLayer = selectedLayer

  const canEncapsulate = draftMessage.trim().length > 0 && draftMessage !== committedMessage

  const activeContent = useMemo(
    () => getLayerContent(activeLayer, committedMessage, technical),
    [activeLayer, committedMessage, technical]
  )

  const selectedIndex = OSI_LAYERS.findIndex((l) => l.id === selectedLayer)

  useEffect(() => {
    if (!encapTick) return
    setShowEncapBadge(true)
    const timer = setTimeout(() => setShowEncapBadge(false), 1200)
    return () => clearTimeout(timer)
  }, [encapTick])

  const onEncapsulate = () => {
    if (!canEncapsulate) return
    setCommittedMessage(draftMessage)
    setEncapTick((v) => v + 1)
  }

  const onKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      onEncapsulate()
    }
  }

  const onNextLayer = () => {
    if (selectedIndex >= OSI_LAYERS.length - 1) {
      setSelectedLayer(7)
      return
    }
    setSelectedLayer(OSI_LAYERS[selectedIndex + 1].id)
  }

  const isLastLayer = selectedLayer === 1

  return (
    <section id="modelo-osi" className="scroll-mt-28 py-24" aria-labelledby="osi-title">
      <Reveal>
        <h2 id="osi-title" className="text-4xl font-semibold sm:text-5xl">
          <span className="bg-gradient-to-r from-indigo-700 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
            Modelo OSI: El Estándar Universal
          </span>
        </h2>
        <p className="mt-3 max-w-4xl text-base text-slate-700 sm:text-lg">
          Una forma de organizar la comunicación para que cada nivel se enfoque en una sola tarea.
        </p>
      </Reveal>

      <Reveal delay={0.02}>
        <article className="card mt-6 p-6">
          <h3 className="text-2xl font-semibold text-slate-900">¿Qué es una capa?</h3>
          <p className="mt-3 max-w-4xl text-sm font-light text-slate-700">
            Una capa es un conjunto de reglas que resuelven un problema específico de comunicación sin que las demás
            tengan que saber cómo lo hace.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 rounded-2xl border-l-4 border-indigo-500 bg-slate-50 p-4"
          >
            <p className="text-sm text-slate-700">
              El Modelo OSI no es solo una lista; es el lenguaje universal de la red. Imagina una escalera de 7 peldaños:
              para enviar un mensaje, tus datos deben bajar la escalera del emisor (encapsulamiento) y subir la del receptor
              (desencapsulamiento). Si un peldaño falla, la comunicación se rompe.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-5 grid gap-3 md:grid-cols-3"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              className="rounded-2xl border border-slate-200/80 bg-white/50 p-4 shadow-sm"
            >
              <Box className="h-5 w-5 text-indigo-600" />
              <p className="mt-2 text-sm font-bold text-slate-900">Abstracción</p>
              <p className="mt-1 text-sm font-light text-slate-700">No es un objeto físico, es un conjunto de reglas.</p>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              className="rounded-2xl border border-slate-200/80 bg-white/50 p-4 shadow-sm"
            >
              <Layers className="h-5 w-5 text-indigo-600" />
              <p className="mt-2 text-sm font-bold text-slate-900">Independencia</p>
              <p className="mt-1 text-sm font-light text-slate-700">Una capa no necesita saber cómo funcionan las otras.</p>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              className="rounded-2xl border border-slate-200/80 bg-white/50 p-4 shadow-sm"
            >
              <Zap className="h-5 w-5 text-indigo-600" />
              <p className="mt-2 text-sm font-bold text-slate-900">Orden</p>
              <p className="mt-1 text-sm font-light text-slate-700">Separan la complejidad para facilitar el diagnóstico.</p>
            </motion.div>
          </motion.div>

          <p className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50/70 px-3 py-2 text-sm text-indigo-900">
            💡 Dato clave: Aunque hoy usamos principalmente el modelo TCP/IP en la práctica, el Modelo OSI sigue siendo la base teórica esencial para diagnosticar errores y entender cómo viaja la información.
          </p>
        </article>
      </Reveal>

      <Reveal delay={0.04}>
        <article className="card mt-7 p-6">
          <h3 className="text-xl font-semibold text-slate-900">Escribe tu cadena</h3>
          <label htmlFor="message-input" className="mt-3 block text-sm font-medium text-slate-700">Mensaje base</label>
          <textarea
            id="message-input"
            className="mt-2 min-h-[84px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button className="btn-primary px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60" onClick={onEncapsulate} disabled={!canEncapsulate}>Encapsular</button>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={technical} onChange={(e) => setTechnical(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              Mostrar versión técnica
            </label>
            <button className="btn-secondary px-4 py-2 text-sm" onClick={onNextLayer}>{isLastLayer ? 'Volver al inicio (Capa 7)' : 'Siguiente capa'}</button>
            <span className="text-xs text-slate-500">Tip: Ctrl/Cmd + Enter encapsula</span>
          </div>
        </article>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <Reveal>
          <aside className="card p-5">
            <p className="text-sm font-semibold text-slate-900">Mapa OSI</p>
            <div className="mt-4 space-y-2">
              {OSI_LAYERS.map((layer, idx) => {
                const isActive = selectedLayer === layer.id
                const isPassed = idx <= selectedIndex
                return (
                  <button key={layer.id} onClick={() => setSelectedLayer(layer.id)} aria-current={isActive ? 'step' : undefined} className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${isActive ? 'border-indigo-400 bg-indigo-50 shadow-[0_0_0_1px_rgba(99,102,241,0.18)]' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${isActive ? 'bg-indigo-600 text-white' : isPassed ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>{layer.id}</span>
                    <span className={`text-sm font-medium ${isActive ? 'text-indigo-800' : 'text-slate-700'}`}>{layer.name}</span>
                    <span className="ml-auto h-2 w-16 rounded-full bg-slate-100"><span className={`block h-full rounded-full transition-all ${isPassed ? 'bg-indigo-500' : 'bg-transparent'}`} /></span>
                  </button>
                )
              })}
            </div>
            <p className="mt-4 text-xs text-slate-600">Tip: usa “Siguiente capa” para recorrer cómo el mismo mensaje cambia de envoltura.</p>
          </aside>
        </Reveal>

        <Reveal delay={0.05}>
          <motion.aside key={encapTick} className="card p-5" animate={{ boxShadow: encapTick ? ['0 14px 34px rgba(15,23,42,0.08)', '0 18px 40px rgba(99,102,241,0.26)', '0 14px 34px rgba(15,23,42,0.08)'] : '0 14px 34px rgba(15,23,42,0.08)' }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">Detalle de capa</p>
              <AnimatePresence>
                {showEncapBadge && <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">Encapsulado ✓</motion.span>}
              </AnimatePresence>
            </div>

            <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">Mensaje activo: {committedMessage}</p>

            <AnimatePresence mode="wait">
              <motion.div key={`${activeLayer}-${technical}-${committedMessage}`} initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="mt-4">
                <p className="text-sm font-semibold text-indigo-700">{activeContent.title}</p>
                <motion.div
                  key={`tags-${activeLayer}`}
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06 } }
                  }}
                  className="mt-2 flex flex-wrap gap-2"
                >
                  {activeContent.tags.map((tag) => (
                    <motion.span
                      key={`${activeLayer}-${tag}`}
                      variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {!technical ? (
                  <div className="mt-3 space-y-3">
                    <div>
                      <h4 className="text-xs uppercase tracking-wide text-slate-500">¿Qué es?</h4>
                      <p className="mt-1 text-sm text-slate-700">{activeContent.whatIs}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wide text-slate-500">¿Cómo funciona?</h4>
                      <ul className="mt-2 space-y-1 text-sm text-slate-700">
                        {activeContent.howWorks.map((line) => <li key={line} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />{line}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wide text-slate-500">Protocolos típicos</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {activeContent.protocols.map((p) => (
                          <span
                            key={p}
                            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wide text-slate-500">Dato para principiantes</h4>
                      <p className="mt-1 text-sm text-slate-700">{activeContent.beginnerTip}</p>
                    </div>
                    <p className="text-sm text-slate-700"><span className="font-semibold">Ejemplo simple:</span> {activeContent.example}</p>
                    <p className="text-sm text-slate-600"><span className="font-semibold text-slate-700">En DevTools mira:</span> {activeContent.observable}</p>
                  </div>
                ) : (
                  <motion.div
                    className="mt-2"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.08 } }
                    }}
                  >
                    <p className="text-xs uppercase tracking-wide text-slate-500">Lo que ve la máquina:</p>
                    <motion.pre variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="code-block mt-2">{activeContent.visual}</motion.pre>
                    <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="mt-3 rounded-xl border-l-4 border-blue-500 bg-blue-50 px-4 py-3">
                      <p className="text-sm text-blue-900">En lenguaje humano: {activeContent.humanTranslation || activeContent.technicalIntro}</p>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        </Reveal>
      </div>
    </section>
  )
}
