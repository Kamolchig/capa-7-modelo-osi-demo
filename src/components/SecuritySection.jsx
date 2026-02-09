import { Reveal } from './Reveal'

export default function SecuritySection() {
  return (
    <section id="seguridad" className="scroll-mt-28 py-24">
      <Reveal>
        <h2 className="text-4xl font-semibold text-[#0B1220] sm:text-5xl">Seguridad básica en Capa 7 (nivel introductorio)</h2>
        <p className="mt-3 max-w-4xl text-slate-600">En Capa 7, la seguridad no es “magia”: se expresa con reglas claras, status codes y permisos.</p>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="card p-6">
            <h3 className="text-xl font-semibold">AuthN vs AuthZ</h3>
            <p className="mt-3 text-sm text-slate-600">Qué es: es la forma en que una aplicación decide quién eres y qué puedes hacer.</p>
            <p className="mt-2 text-sm text-slate-600">Analogía: entrar a un edificio (AuthN) no significa poder entrar a todas las oficinas (AuthZ).</p>
            <p className="mt-2 text-sm text-slate-600">En HTTP, 401 significa que no demostraste quién eres; 403 significa que sí eres tú, pero no tienes permiso.</p>
            <p className="mt-2 text-sm text-slate-600">Ejemplo simple: puedes iniciar sesión correctamente, pero no tener permiso para borrar una publicación.</p>
          </article>
        </Reveal>

        <Reveal delay={0.07}>
          <article className="card p-6">
            <h3 className="text-xl font-semibold">Controles comunes</h3>
            <p className="mt-3 text-sm text-slate-600">Qué es: reglas básicas que las aplicaciones usan para proteger datos y acciones. No necesitas implementarlas aún; por ahora basta con entender su propósito.</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Validar lo que envía el usuario (no confiar ciegamente).</li>
              <li>Limitar acciones para evitar abusos.</li>
              <li>OWASP Top 10 como referencia educativa, no como checklist obligatorio.</li>
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-6 text-sm text-slate-600">En Capa 7, la seguridad se ve en las respuestas del servidor: códigos, headers y reglas, no en cables ni paquetes.</p>
      </Reveal>
    </section>
  )
}
