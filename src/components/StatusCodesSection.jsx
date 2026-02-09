import { Reveal } from './Reveal'

const family = [
  ['2xx', 'Éxito funcional: validar consistencia de payload y semántica.'],
  ['3xx', 'Redirección/caché: revisar Location, ETag y cache headers.'],
  ['4xx', 'Error del cliente/autorización/ruta: corregible desde request.'],
  ['5xx', 'Error del servidor o dependencia: correlacionar con logs/tracing.']
]

const cards = [
  ['200 OK', 'Solicitud exitosa.', 'GET de recurso existente.', 'Body coherente, Content-Type.', 'GET /api/users/42'],
  ['301 Moved Permanently', 'Recurso movido.', 'Migración de dominio/ruta.', 'Header Location + caché.', 'http -> https'],
  ['304 Not Modified', 'Reutiliza caché.', 'ETag o If-Modified-Since.', 'Cache-Control/ETag.', 'GET condicional'],
  ['400 Bad Request', 'Solicitud inválida.', 'Payload mal formado.', 'Campos, formato, validaciones.', 'POST con JSON inválido'],
  ['401 Unauthorized', 'Falta autenticación.', 'Token inválido/ausente.', 'Authorization y expiración.', 'Bearer vencido'],
  ['403 Forbidden', 'Sin permisos.', 'Rol no autorizado.', 'Scopes/claims/políticas.', 'DELETE sin permisos'],
  ['404 Not Found', 'Ruta/recurso no existe.', 'Path incorrecto.', 'Versionado y endpoints.', '/api/v9/x'],
  ['408 Request Timeout', 'Tiempo agotado.', 'Latencia alta o cliente lento.', 'Timing y red intermedia.', 'Request larga'],
  ['409 Conflict', 'Conflicto de estado.', 'Versionado concurrente.', 'ETag/If-Match/estado.', 'Edición simultánea'],
  ['429 Too Many Requests', 'Rate limit excedido.', 'Exceso de solicitudes.', 'Retry-After y límites.', 'Burst de llamadas'],
  ['500 Internal Server Error', 'Falla interna.', 'Excepción no controlada.', 'Logs/tracing/correlación.', 'Error backend'],
  ['502 Bad Gateway', 'Gateway recibió respuesta inválida.', 'Proxy -> upstream roto.', 'Nginx/API gateway/upstream.', 'Gateway↔servicio'],
  ['503 Service Unavailable', 'Servicio no disponible.', 'Mantenimiento/saturación.', 'Health checks/colas/retries.', 'Instancias caídas'],
  ['504 Gateway Timeout', 'Upstream no respondió a tiempo.', 'Dependencia lenta.', 'Timeout de gateway y upstream.', 'API lenta']
]

export default function StatusCodesSection() {
  return (
    <section id="status" className="scroll-mt-28 py-24">
      <Reveal><h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">HTTP Status Codes</h2></Reveal>
      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {family.map((f, i) => (
          <Reveal key={f[0]} delay={i * 0.04}><div className="card p-4"><p className="font-semibold text-indigo-700">{f[0]}</p><p className="mt-1 text-sm text-slate-600">{f[1]}</p></div></Reveal>
        ))}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c[0]} delay={i * 0.02}>
            <article className="card p-6">
              <h3 className="text-xl font-semibold text-indigo-700">{c[0]}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                <li><span className="font-medium text-slate-800">Qué significa:</span> {c[1]}</li>
                <li><span className="font-medium text-slate-800">Cuándo pasa:</span> {c[2]}</li>
                <li><span className="font-medium text-slate-800">Qué revisar:</span> {c[3]}</li>
                <li><span className="font-medium text-slate-800">Ejemplo API:</span> {c[4]}</li>
                <li><span className="font-medium text-slate-800">DevTools:</span> Status, Headers, Response, Timing.</li>
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
