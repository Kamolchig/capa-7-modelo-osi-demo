import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

function toBitSample(message) {
  const encoder = new TextEncoder()
  const bytes = Array.from(encoder.encode(message || 'Hola, Kamila 👋'))
  const limited = bytes.slice(0, 8)
  const bits = limited.map((b) => b.toString(2).padStart(8, '0')).join(' ')
  return `${bits}${bytes.length > 8 ? ' ...' : ''}`
}

function getLayerContent(layerId, committedMessage, technical) {
  const msg = committedMessage || 'Hola, Kamila 👋'

  const base = {
    7: {
      definition: 'Expresa intención y recurso: aquí la aplicación interpreta la solicitud.',
      adds: ['Método + ruta + headers + body con significado de negocio.', 'Diagnóstico funcional inmediato por status code.'],
      example: `Enviar mensaje: POST /api/messages con body.message = "${msg}"`,
      observable: 'DevTools: Method, Status, Headers, Response.',
      technicalView: `POST /api/messages HTTP/1.1\nHost: app.ejemplo.com\nAccept: application/json\nContent-Type: application/json\nAuthorization: Bearer <token>\n\n{\n  "message": "${msg}",\n  "source": "instagram-feed",\n  "intent": "create-message"\n}`
    },
    6: {
      definition: 'Normaliza formato/codificación y protege datos cuando hay TLS.',
      adds: ['Serializa (JSON), codifica (UTF-8) y opcionalmente comprime.', 'Con HTTPS, el payload viaja cifrado (ilegible en tránsito).'],
      example: 'Mensaje serializado en JSON y enviado sobre TLS.',
      observable: 'DevTools: Content-Type/Encoding y contexto HTTPS.',
      technicalView: `Transformación:\n- UTF-8\n- JSON\n- gzip (opcional)\n\nTLS Record: [Encrypted Application Data]\nNota: el payload real es ilegible por cifrado TLS.`
    },
    5: {
      definition: 'Mantiene contexto conversacional entre cliente y servidor.',
      adds: ['Permite continuidad (sesión/cookie/token).', 'Reduce reconexiones al sostener conversación lógica.'],
      example: 'Cookie sid mantiene sesión entre requests del mismo usuario.',
      observable: 'DevTools: Cookie/Set-Cookie, Connection keep-alive.',
      technicalView: `Session Context\nCookie: sid=KAMILA-SESSION-001\nConnection: keep-alive\nNota: HTTP/2 puede multiplexar streams sobre una misma conexión.`
    },
    4: {
      definition: 'Entrega extremo a extremo con control de orden, pérdida y retransmisión.',
      adds: ['Segmenta datos y usa puertos origen/destino.', 'Checksum TCP detecta corrupción y activa retransmisión.'],
      example: 'Conexión cliente:52344 → servidor:443 para HTTPS.',
      observable: 'DevTools Timing: Stalled, DNS, Connect, SSL, TTFB.',
      technicalView: `TCP Segment\nsrcPort: 52344\ndstPort: 443\nseq: 1201\nack: 9001\nflags: PSH,ACK\nchecksum: OK\nsi checksum falla -> retransmisión`
    },
    3: {
      definition: 'Direcciona y enruta paquetes entre redes con IP.',
      adds: ['Encapsula el segmento TCP dentro de paquete IP.', 'Usa TTL para evitar bucles de routing.'],
      example: 'El paquete cruza varias redes hasta el backend.',
      observable: 'DevTools muestra host/URL; routing ocurre debajo.',
      technicalView: `IP Packet\nsrcIP: 192.168.1.25\ndstIP: 142.250.190.14\nTTL: 64\nprotocol: TCP\npayload: [TCP segment]`
    },
    2: {
      definition: 'Mueve tramas en el segmento local (LAN/Wi-Fi).',
      adds: ['Añade MAC origen/destino y tipo de trama.', 'FCS/CRC detecta errores de enlace.'],
      example: 'Switch/Wi-Fi AP entrega trama al siguiente salto local.',
      observable: 'Se analiza con herramientas de red de bajo nivel.',
      technicalView: `Ethernet Frame\n[dstMAC: 3C:52:82:AA:11:07]\n[srcMAC: 70:4D:7B:1F:2C:90]\n[type: IPv4]\n[payload: IP packet]\n[FCS/CRC: OK]`
    },
    1: {
      definition: 'Convierte tramas en señales físicas sobre el medio.',
      adds: ['Transmite bits por cable/fibra/radio.', 'No interpreta semántica HTTP.'],
      example: 'El medio solo transporta señal, no significado de aplicación.',
      observable: 'Aquí importan señal/medio/interferencias.',
      technicalView: `Bitstream (muestra): ${toBitSample(msg)}\nMedio: eléctrico/óptico/radio`
    }
  }

  const content = base[layerId]
  return {
    title: `Capa ${layerId} · ${OSI_LAYERS.find((l) => l.id === layerId)?.name || ''}`,
    protocols: layerMeta[layerId].protocols,
    ...content,
    visual: technical ? content.technicalView : null
  }
}

export default function OsiOverview() {
  const [draftMessage, setDraftMessage] = useState('Hola, Kamila 👋')
  const [committedMessage, setCommittedMessage] = useState('Hola, Kamila 👋')
  const [technical, setTechnical] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState(7)
  const [encapTick, setEncapTick] = useState(0)
  const [showEncapBadge, setShowEncapBadge] = useState(false)

  const canEncapsulate = draftMessage.trim().length > 0 && draftMessage !== committedMessage

  const activeContent = useMemo(
    () => getLayerContent(selectedLayer, committedMessage, technical),
    [selectedLayer, committedMessage, technical]
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
        <h2 id="osi-title" className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Modelo OSI</h2>
        <p className="mt-3 max-w-4xl text-base text-slate-700 sm:text-lg">
          Lo que cambia en cada capa no es el “mensaje”, sino su envoltura: encapsulación.
        </p>
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
            <button
              className="btn-primary px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              onClick={onEncapsulate}
              disabled={!canEncapsulate}
            >
              Encapsular
            </button>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={technical}
                onChange={(e) => setTechnical(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Mostrar versión técnica
            </label>
            <button className="btn-secondary px-4 py-2 text-sm" onClick={onNextLayer}>
              {isLastLayer ? 'Volver al inicio (Capa 7)' : 'Siguiente capa'}
            </button>
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
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer.id)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${isActive ? 'border-indigo-400 bg-indigo-50 shadow-[0_0_0_1px_rgba(99,102,241,0.18)]' : 'border-slate-200 bg-white hover:border-indigo-300'}`}
                  >
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${isActive ? 'bg-indigo-600 text-white' : isPassed ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                      {layer.id}
                    </span>
                    <span className={`text-sm font-medium ${isActive ? 'text-indigo-800' : 'text-slate-700'}`}>{layer.name}</span>
                    <span className="ml-auto h-2 w-16 rounded-full bg-slate-100">
                      <span className={`block h-full rounded-full transition-all ${isPassed ? 'bg-indigo-500' : 'bg-transparent'}`} />
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mt-4 text-xs text-slate-600">Tip: usa “Siguiente capa” para recorrer la encapsulación de arriba hacia abajo.</p>
          </aside>
        </Reveal>

        <Reveal delay={0.05}>
          <motion.aside
            key={encapTick}
            className="card p-5"
            animate={{ boxShadow: encapTick ? ['0 14px 34px rgba(15,23,42,0.08)', '0 18px 40px rgba(99,102,241,0.26)', '0 14px 34px rgba(15,23,42,0.08)'] : '0 14px 34px rgba(15,23,42,0.08)' }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">Detalle de capa</p>
              <AnimatePresence>
                {showEncapBadge && (
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700"
                  >
                    Encapsulado ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">Mensaje activo: {committedMessage}</p>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedLayer}-${technical}-${committedMessage}`}
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                <p className="text-sm font-semibold text-indigo-700">{activeContent.title}</p>

                {!technical ? (
                  <div className="mt-3 space-y-3">
                    <p className="text-sm text-slate-700">{activeContent.definition}</p>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Protocolos típicos</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {activeContent.protocols.map((p) => (
                          <span key={p} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">{p}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Qué añade / qué resuelve</p>
                      <ul className="mt-2 space-y-1 text-sm text-slate-700">
                        {activeContent.adds.map((a) => (
                          <li key={a} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />{a}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm text-slate-700"><span className="font-semibold">Ejemplo:</span> {activeContent.example}</p>
                    <p className="text-sm text-slate-600"><span className="font-semibold text-slate-700">Señal observable:</span> {activeContent.observable}</p>
                  </div>
                ) : (
                  <pre className="code-block mt-2">{activeContent.visual}</pre>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        </Reveal>
      </div>
    </section>
  )
}
