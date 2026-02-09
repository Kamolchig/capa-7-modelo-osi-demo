import { Reveal } from './Reveal'

const family = [
  ['2xx', 'Qué es: respuesta exitosa. Para qué sirve: confirmar que la solicitud fue aceptada. Ejemplo simple: 200 OK.'],
  ['3xx', 'Qué es: redirección o caché. Para qué sirve: reutilizar o redirigir recursos. Ejemplo simple: 304 Not Modified.'],
  ['4xx', 'Qué es: problema en la solicitud del cliente. Para qué sirve: corregir request o permisos. Ejemplo simple: 401/403/404.'],
  ['5xx', 'Qué es: error del servidor. Para qué sirve: indicar que el cliente no puede resolverlo solo. Ejemplo simple: 500 o 503.']
]

const cards = [
  ['200 OK', 'La operación HTTP fue procesada correctamente.', 'Confirmar que el cliente puede continuar mostrando datos.', 'La app carga el feed inicial sin errores.', 'Status + Response + Preview.'],
  ['304 Not Modified', 'El recurso no cambió; se usa caché local.', 'Evitar descargar de nuevo datos iguales y ahorrar tiempo.', 'Recarga de pantalla usando ETag vigente.', 'Headers: ETag / If-None-Match.'],
  ['400 Bad Request', 'La solicitud está mal formada.', 'Corregir la forma del request enviado por el cliente.', 'JSON inválido o campo obligatorio faltante.', 'Request Payload + mensaje de error.'],
  ['401 Unauthorized', 'Falta autenticación válida.', 'Indicar que primero se debe iniciar sesión o renovar token.', 'Token ausente o vencido en la solicitud.', 'Authorization header.'],
  ['403 Forbidden', 'Hay identidad, pero no permiso.', 'Mostrar que el usuario está autenticado pero no autorizado.', 'Usuario normal intenta acción de administrador.', 'Status y mensaje de permiso.'],
  ['404 Not Found', 'Ruta o recurso no existe.', 'Detectar URLs incorrectas o recursos eliminados.', 'Endpoint mal escrito o ID inexistente.', 'Request URL y path.'],
  ['429 Too Many Requests', 'Se excedió el límite de solicitudes.', 'Proteger el servicio cuando hay demasiadas peticiones.', 'Demasiados intentos en pocos segundos.', 'Headers de límite/reintento.'],
  ['500 / 503', 'Fallo interno o servicio no disponible.', 'Mostrar que el problema está del lado del servidor.', 'Servicio temporalmente caído o en mantenimiento.', 'Status + respuesta de servidor.']
]

export default function StatusCodesSection() {
  return (
    <section id="status" className="scroll-mt-28 py-24">
      <Reveal>
        <h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">HTTP Status Codes</h2>
        <p className="mt-3 max-w-4xl text-slate-600">Qué es: un código numérico de respuesta HTTP. Para qué sirve: entender rápidamente si la solicitud salió bien, si hay redirección, si falta algo en el cliente o si falló el servidor.</p>
      </Reveal>
      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {family.map((f, i) => (
          <Reveal key={f[0]} delay={i * 0.04}><div className="card p-4"><p className="font-semibold text-indigo-700">{f[0]}</p><p className="mt-1 text-sm text-slate-600">{f[1]}</p></div></Reveal>
        ))}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c[0]} delay={i * 0.03}>
            <article className="card p-6">
              <h3 className="text-xl font-semibold text-indigo-700">{c[0]}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                <li><span className="font-medium text-slate-800">Qué es:</span> {c[1]}</li>
                <li><span className="font-medium text-slate-800">Para qué sirve:</span> {c[2]}</li>
                <li><span className="font-medium text-slate-800">Ejemplo simple:</span> {c[3]}</li>
                <li><span className="font-medium text-slate-800">En DevTools mira:</span> {c[4]}</li>
              </ul>
              <details className="mt-3 text-xs text-slate-600">
                <summary className="cursor-pointer font-medium text-indigo-700">Para profundizar</summary>
                <p className="mt-2">Cuando tengas más base, puedes comparar estos códigos con lógica de negocio y arquitectura del backend.</p>
              </details>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
