import { Reveal } from './Reveal'
import { Activity, FileText, MousePointer2, Terminal } from 'lucide-react'
import { Eye, Monitor, Wifi, Zap } from 'lucide-react'

export default function DiagnosticsSection() {
  return (
    <section id="diagnostico" className="scroll-mt-28 py-24">
      <Reveal>
        <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">Cómo leer Network</h2>
        <p className="mt-3 max-w-4xl text-slate-600">
          DevTools no es solo para programadores; es el registro de vuelo de tu navegador. Cada vez que haces clic, aquí se escribe una historia.
        </p>
      </Reveal>

      <Reveal delay={0.02}>
        <article className="card mt-6 p-6">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">¿Qué es DevTools? (Las herramientas de desarrollo)</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            DevTools es una suite de herramientas de diagnóstico integrada directamente en tu navegador. Es lo que usamos los ingenieros para inspeccionar el HTML, depurar errores de JavaScript y, lo más importante para la Capa 7: monitorear el tráfico de red en tiempo real.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Es como el capó de un coche: normalmente solo ves la carrocería (la interfaz), pero DevTools te permite ver el motor funcionando mientras conduces.
          </p>
          <p className="mt-4 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-medium text-sky-800">
            Pro Tip: Presiona F12 o Ctrl+Shift+I para entrar al mundo de los desarrolladores.
          </p>
        </article>
      </Reveal>

      <Reveal delay={0.03}>
        <article className="card mt-5 p-6">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">Qué estamos observando (La radiografía de la Capa 7)</h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            <li className="flex gap-2">
              <Wifi className="mt-0.5 h-4 w-4 text-indigo-600" />
              <span><span className="font-medium text-slate-800">El Tráfico Crudo:</span> cada vez que tu app pide una imagen, un texto o un video, se genera una solicitud HTTP. Aquí puedes ver el viaje completo de ida y vuelta.</span>
            </li>
            <li className="flex gap-2">
              <Zap className="mt-0.5 h-4 w-4 text-amber-600" />
              <span><span className="font-medium text-slate-800">El Contrato (Headers):</span> puedes ver si la app cumplió con las reglas (como enviar el token de seguridad) o si el servidor le negó el acceso.</span>
            </li>
            <li className="flex gap-2">
              <Activity className="mt-0.5 h-4 w-4 text-emerald-600" />
              <span><span className="font-medium text-slate-800">El Tiempo de Respuesta:</span> puedes ver exactamente cuántos milisegundos tarda el servidor en pensar antes de responder.</span>
            </li>
          </ul>
        </article>
      </Reveal>

      <Reveal delay={0.035}>
        <article className="card mt-5 p-6">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">Guía de navegación (Cómo moverse por el panel)</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <Monitor className="mt-0.5 h-4 w-4 text-rose-600" />
              <span><span className="font-medium text-slate-800">Círculo Rojo (Record):</span> si está encendido, está grabando todo lo que pasa. Si lo apagas, deja de registrar.</span>
            </li>
            <li className="flex gap-2">
              <Monitor className="mt-0.5 h-4 w-4 text-slate-500" />
              <span><span className="font-medium text-slate-800">Prohibido / Clear:</span> limpia la lista para que puedas empezar un diagnóstico desde cero.</span>
            </li>
            <li className="flex gap-2">
              <MousePointer2 className="mt-0.5 h-4 w-4 text-violet-600" />
              <span><span className="font-medium text-slate-800">Filtro <code>Fetch/XHR</code>:</span> es el más importante. Filtra ruido (imágenes, fuentes, scripts) y deja solo peticiones de datos puras de Capa 7.</span>
            </li>
          </ul>
        </article>
      </Reveal>

      <Reveal delay={0.04}>
        <article className="card mt-5 p-6">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">Visualización de datos (Preview vs Response)</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            En <code>Response</code> ves el código bruto (más difícil de leer), mientras que en <code>Preview</code> el navegador lo ordena en un árbol expandible para que entiendas la estructura del JSON al instante.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Para análisis rápido, empieza por <code>Preview</code>; para validación exacta de texto y formato, vuelve a <code>Response</code>.
          </p>
        </article>
      </Reveal>

      <Reveal delay={0.05}>
        <article className="card mt-5 p-6">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">El Panel de Control (La Tabla)</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <span className="font-medium text-slate-800"><code>Status</code> (El Semáforo):</span>{' '}
              Verde/Gris (200s) es éxito. Rojo (400/500) es error. Si ves un <code>304</code>, el navegador fue inteligente y usó su memoria (caché).
            </li>
            <li>
              <span className="font-medium text-slate-800"><code>Method</code> (La Acción):</span>{' '}
              identifica qué quiso hacer la app. ¿Pidió datos (<code>GET</code>) o envió algo nuevo (<code>POST</code>)?
            </li>
            <li>
              <span className="font-medium text-slate-800"><code>Name</code>:</span>{' '}
              es el endpoint. Por ejemplo, <code>/v1/feed</code> nos dice que estamos pidiendo el muro de noticias.
            </li>
            <li>
              <span className="font-medium text-slate-800"><code>Time</code>:</span>{' '}
              si esta barra es muy larga, el problema puede ser el servidor procesando mucha info o una base de datos lenta.
            </li>
          </ul>
        </article>
      </Reveal>

      <Reveal delay={0.07}>
        <article className="card mt-5 p-6">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">La Inspección Profunda (Al hacer clic en una Request)</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><span className="font-medium text-slate-700"><code>Headers</code> (La Negociación):</span> revisa <code>Request URL</code>, <code>Status Code</code> y si el servidor te reconoce con <code>Authorization</code>.</li>
            <li><span className="font-medium text-slate-700"><code>Payload</code> (Lo que tú enviaste):</span> crucial en <code>POST</code>/<code>PUT</code>; confirma que los datos del formulario salieron correctamente.</li>
            <li><span className="font-medium text-slate-700"><code>Response</code> (Lo que recibiste):</span> mensaje crudo del servidor, normalmente JSON que la app dibuja en pantalla.</li>
            <li><span className="font-medium text-slate-700"><code>Preview</code> (Vista limpia):</span> la misma respuesta, formateada para humanos, ideal para JSON complejo.</li>
          </ul>
        </article>
      </Reveal>

      <Reveal delay={0.09}>
        <article className="card mt-5 p-6">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">Cómo usarlo en esta Expo (Paso a Paso)</h3>
          <ol className="mt-3 space-y-3 text-sm text-slate-600">
            <li className="flex gap-2">
              <MousePointer2 className="mt-0.5 h-4 w-4 text-indigo-600" />
              <span><span className="font-medium text-slate-800">1.</span> Abre la consola (<code>F12</code>).</span>
            </li>
            <li className="flex gap-2">
              <Activity className="mt-0.5 h-4 w-4 text-emerald-600" />
              <span><span className="font-medium text-slate-800">2.</span> Ve a la pestaña <code>Network</code>.</span>
            </li>
            <li className="flex gap-2">
              <Terminal className="mt-0.5 h-4 w-4 text-sky-600" />
              <span><span className="font-medium text-slate-800">3.</span> Haz clic en el botón <code>Fetch/XHR</code> de nuestra demo.</span>
            </li>
            <li className="flex gap-2">
              <FileText className="mt-0.5 h-4 w-4 text-violet-600" />
              <span><span className="font-medium text-slate-800">4.</span> Mira cómo aparece la petición al instante. Haz clic en ella y explora qué dice el <code>Payload</code>.</span>
            </li>
          </ol>
        </article>
      </Reveal>
    </section>
  )
}
