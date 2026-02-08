import { Reveal } from './Reveal'

const req = `GET /v1/feed?limit=10 HTTP/1.1\nHost: api.ejemplo.com\nAccept: application/json\nAuthorization: Bearer eyJ...\nCache-Control: no-cache\nOrigin: https://app.ejemplo.com\nUser-Agent: Browser/1.0`

const res = `HTTP/1.1 200 OK\nContent-Type: application/json; charset=utf-8\nCache-Control: max-age=60\nAccess-Control-Allow-Origin: https://app.ejemplo.com\nSet-Cookie: sid=abc; HttpOnly; Secure\n\n{\n  "items": [{"id": 1, "title": "OSI"}],\n  "next": "/v1/feed?limit=10&page=2"\n}`

export default function HeadersPayloadSection() {
  return (
    <section id="headers" className="scroll-mt-28 py-24">
      <Reveal><h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Headers y payload (Capa 7 real)</h2></Reveal>
      <Reveal>
        <p className="mt-4 max-w-4xl text-slate-600">Headers clave: Content-Type, Accept, Authorization, Cache-Control, Cookie/Set-Cookie, Origin, Access-Control-Allow-Origin, User-Agent.</p>
      </Reveal>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal><article className="card p-6"><p className="text-sm font-medium text-slate-700">Request</p><pre className="code-block mt-3">{req}</pre></article></Reveal>
        <Reveal delay={0.06}><article className="card p-6"><p className="text-sm font-medium text-slate-700">Response</p><pre className="code-block mt-3">{res}</pre></article></Reveal>
      </div>
      <Reveal>
        <article className="card mt-6 p-6">
          <h3 className="text-xl font-semibold">Mini bloque CORS</h3>
          <p className="mt-3 text-sm text-slate-600">Cuando CORS falla, la request puede aparecer en Network pero ser bloqueada por el navegador. Revisa Console + headers CORS esperados (Access-Control-Allow-Origin, métodos permitidos y credenciales).</p>
        </article>
      </Reveal>
    </section>
  )
}
