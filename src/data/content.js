export const navLinks = [
  ['modelo-osi', 'Modelo OSI'],
  ['capa-7', 'Capa 7'],
  ['status', 'HTTP Status'],
  ['headers', 'Headers'],
  ['demo', 'Demo'],
  ['diagnostico', 'Diagnóstico']
]

export const osiLayers = [
  { layer: 7, title: 'Aplicación', summary: 'Semántica del servicio.', details: 'HTTP/HTTPS, DNS, SMTP/IMAP, APIs REST.' },
  { layer: 6, title: 'Presentación', summary: 'Formato y codificación.', details: 'Transformación de datos, compresión, cifrado conceptual.' },
  { layer: 5, title: 'Sesión', summary: 'Control de sesión.', details: 'Establecimiento, mantenimiento y cierre de sesiones.' },
  { layer: 4, title: 'Transporte', summary: 'Entrega extremo a extremo.', details: 'TCP/UDP, puertos, control de errores, confiabilidad.' },
  { layer: 3, title: 'Red', summary: 'Direccionamiento y ruteo.', details: 'IP, routing, selección de caminos.' },
  { layer: 2, title: 'Enlace', summary: 'Conectividad local.', details: 'MAC, switching, VLAN, tramas.' },
  { layer: 1, title: 'Física', summary: 'Medio y señal.', details: 'Bits sobre cobre, fibra o radio.' }
]

export const statusCards = [
  {
    code: '200 OK',
    meaning: 'Solicitud exitosa con representación de recurso.',
    when: 'GET exitoso, consulta válida.',
    check: 'Body esperado, Content-Type correcto, coherencia funcional.',
    api: 'GET /api/users/42 devuelve JSON de usuario.'
  },
  {
    code: '301 Moved Permanently',
    meaning: 'Recurso movido permanentemente a otra URL.',
    when: 'Migración de rutas o dominio.',
    check: 'Location header, SEO/caching y cadenas de redirección.',
    api: 'http://api -> https://api.'
  },
  {
    code: '304 Not Modified',
    meaning: 'Cliente puede reutilizar caché local.',
    when: 'Validación condicional con ETag/If-None-Match o If-Modified-Since.',
    check: 'ETag, Cache-Control, Last-Modified y política de refresco.',
    api: 'GET /feed con ETag sin cambios.'
  },
  {
    code: '401 Unauthorized',
    meaning: 'Falta autenticación válida.',
    when: 'Token ausente/expirado o credenciales inválidas.',
    check: 'Authorization header, WWW-Authenticate, expiración de token.',
    api: 'GET /api/private sin Bearer válido.'
  },
  {
    code: '403 Forbidden',
    meaning: 'Autenticado, pero sin autorización.',
    when: 'Rol sin permisos para operación solicitada.',
    check: 'Políticas RBAC/ABAC y claims del token.',
    api: 'DELETE /api/admin para usuario sin rol admin.'
  },
  {
    code: '404 Not Found',
    meaning: 'Ruta o recurso inexistente.',
    when: 'Path mal formado o recurso eliminado.',
    check: 'Versionado, naming de endpoints, normalización de rutas.',
    api: 'GET /api/v2/profiles/99 donde no existe endpoint.'
  },
  {
    code: '500 Internal Server Error',
    meaning: 'Falla interna del servidor o dependencia.',
    when: 'Excepciones no controladas o errores de infraestructura.',
    check: 'Logs correlacionados, tracing, retries y circuit breaker.',
    api: 'POST /orders falla por error en DB.'
  }
]
