import { Reveal } from './Reveal'

export default function QuickAccessQR() {
  const qrValue = encodeURIComponent('https://donde-la-red-entiende-al-usuario.vercel.app/')
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrValue}`

  return (
    <section className="flex flex-col items-center justify-center py-8 bg-gradient-to-b from-transparent to-slate-50/50">
      <Reveal>
        <div className="mx-auto w-full max-w-xs px-4 text-center">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Acceso rápido
          </span>
          <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
            <div className="mx-auto w-fit rounded-2xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] p-[2px]">
              <div className="rounded-2xl bg-white p-2">
                <img
                  src={qrSrc}
                  alt="QR para abrir la guía en móvil"
                  width="180"
                  height="180"
                  className="mx-auto block h-auto max-w-full rounded-lg"
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">Escanea para ver esta guía en tu móvil</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
