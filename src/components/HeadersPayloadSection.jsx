import { Reveal } from './Reveal'

const req = `GET /v1/feed?limit=10 HTTP/1.1\nHost: api.ejemplo.com\nAccept: application/json\nAuthorization: Bearer eyJ...\nCache-Control: no-cache\nOrigin: https://app.ejemplo.com\nUser-Agent: Browser/1.0`

const res = `HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\nCache-Control: max-age=60\nAccess-Control-Allow-Origin: https://app.ejemplo.com\nSet-Cookie: sid=abc; HttpOnly; Secure\n\n{\n  "items": [{"id": 1, "title": "OSI"}],\n  "next": "/v1/feed?limit=10&page=2"\n}`

export default function HeadersPayloadSection() {
  return (
    <section id="headers" className="scroll-mt-28 py-24">
      <Reveal><h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Headers y payload (Capa 7 real)</h2></Reveal>
      <Reveal>
        <p className="mt-4 max-w-4xl text-slate-600">
          En HTTP, <strong>headers</strong> son metadatos que describen el mensaje (formato, autenticación, caché, origen),
          mientras que el <strong>payload</strong> es el contenido útil (por ejemplo, un JSON con datos). Para diagnosticar
          bien, conviene leer primero headers y luego validar si el payload coincide con lo que la aplicación esperaba.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="card p-6">
            <p className="text-sm font-medium text-slate-700">Request</p>
            <p className="mt-2 text-sm text-slate-600">
              El cliente envía intención + contexto: ruta, método y headers como <code>Accept</code>, <code>Authorization</code> y <code>Origin</code>.
              En DevTools revisa si la solicitud salió con los datos correctos.
            </p>
            <pre className="code-block mt-3">{req}</pre>
          </article>
        </Reveal>
        <Reveal delay={0.06}>
          <article className="card p-6">
            <p className="text-sm font-medium text-slate-700">Response</p>
            <p className="mt-2 text-sm text-slate-600">
              El servidor responde con status, headers y payload. Aquí se confirma el tipo de contenido, política de caché,
              permisos de origen y datos reales que consumirá la interfaz.
            </p>
            <pre className="code-block mt-3">{res}</pre>
          </article>
        </Reveal>
      </div>
      <Reveal>
        <article className="card mt-6 p-6">
          <h3 className="text-xl font-semibold">Mini bloque CORS</h3>
          <p className="mt-3 text-sm text-slate-600">
            CORS es una política de seguridad del <strong>navegador</strong>, no del protocolo HTTP en sí. Por eso puedes ver una
            respuesta con status 200 en Network y aun así tener error en la aplicación: el navegador bloquea el acceso al
            response si faltan headers CORS válidos (por ejemplo, <code>Access-Control-Allow-Origin</code>). Para diagnosticar,
            revisa Network + Console en paralelo.
          </p>
        </article>
      </Reveal>
    </section>
  )
}
