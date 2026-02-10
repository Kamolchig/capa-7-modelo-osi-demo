import { Reveal } from './Reveal'

export default function Layer7ConceptBlocks() {
  return (
    <section className="mt-10 space-y-5" aria-label="Bloques conceptuales de Capa 7">
      <Reveal delay={0.05}>
        <article className="card p-6">
          <h3 className="text-2xl font-semibold text-slate-900">¿Qué hace especial a la Capa 7?</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>“La Capa 7 es la primera capa donde aparece el significado.”</li>
            <li>“Es el primer nivel donde la comunicación deja de ser solo entrega de datos y pasa a ser comprensión de intención.”</li>
            <li>“Las capas 1 a 6 se enfocan en mover datos; no interpretan intención.”</li>
          </ul>
          <p className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-900">
            “Las capas 1 a 6 se encargan de que el mensaje llegue. La Capa 7 se encarga de entender qué significa ese mensaje.”
          </p>
        </article>
      </Reveal>

      <Reveal delay={0.1}>
        <article className="card p-6">
          <h3 className="text-2xl font-semibold text-slate-900">¿De qué se compone realmente la Capa 7?</h3>
          <p className="mt-3 text-sm text-slate-700">Capa 7 NO es HTTP.</p>
          <p className="mt-1 text-sm text-slate-700">HTTP es un ejemplo muy útil para observar Capa 7, pero no la define.</p>
          <p className="mt-4 text-sm text-slate-700">
            Cuando una aplicación se comunica, la Capa 7 define cinco elementos clave que le dan significado al mensaje.
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Reglas de intención: qué quiere hacer el cliente (por ejemplo, leer o crear).</li>
            <li>Identificación del recurso: sobre qué cosa se opera (ruta/URL).</li>
            <li>Metadatos con significado: headers.</li>
            <li>Contenido interpretado: payload/body (por ejemplo JSON).</li>
            <li>Resultado con significado: status codes (200/401/404/500).</li>
          </ol>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-lg font-semibold text-slate-900">Metadatos con significado (Headers)</h4>
            <p className="mt-2 text-sm text-slate-700">“Los headers son contexto semántico, no transporte.”</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <span className="font-semibold">“Authorization → quién eres”</span>: envía una credencial (por ejemplo, un token) para que el servidor identifique tu sesión y decida si puedes acceder al recurso.
              </li>
              <li>
                <span className="font-semibold">“Accept → cómo entiendes los datos”</span>: le dice al servidor en qué formato prefieres recibir la respuesta (por ejemplo, JSON). Es una negociación de formato de salida.
              </li>
              <li>
                <span className="font-semibold">“Content-Type → cómo deben interpretarse”</span>: indica el formato del cuerpo que viaja (por ejemplo, <code>application/json</code>) para que el receptor lo interprete correctamente.
              </li>
              <li>
                <span className="font-semibold">“Cache-Control → cuánto tiempo son válidos”</span>: define reglas de caché para saber si el navegador debe reutilizar una copia o pedir datos nuevos al servidor.
              </li>
            </ul>
            <p className="mt-3 text-sm text-slate-700">
              En conjunto, estos headers no mueven cables ni paquetes: describen <span className="font-semibold">significado, permisos y formato</span> de la conversación entre cliente y servidor.
            </p>
            <p className="mt-2 text-sm font-semibold text-indigo-700">“Esto es 100% Capa 7.”</p>
          </div>

          <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4">
            <p className="text-sm font-semibold text-indigo-800">Chequeo rápido</p>
            <p className="mt-1 text-sm text-indigo-900">
              Si puedes identificar intención, recurso y resultado en una request, estás observando Capa 7.
            </p>
          </div>
        </article>
      </Reveal>
    </section>
  )
}
