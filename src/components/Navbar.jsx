import { useState } from 'react'

const links = [
  ['modelo-osi', 'Modelo OSI'],
  ['capa-7', 'Capa 7'],
  ['status', 'Status Codes'],
  ['headers', 'Headers'],
  ['seguridad', 'Seguridad'],
  ['diagnostico', 'Diagnóstico'],
  ['demo', 'Demo']
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <button onClick={() => go('inicio')} className="text-sm font-semibold text-slate-900">OSI Layer Lab</button>
        <ul className="mx-auto hidden items-center gap-5 md:flex">
          {links.map(([id, label]) => (
            <li key={id}><button onClick={() => go(id)} className="nav-link text-sm text-slate-600">{label}</button></li>
          ))}
        </ul>
        <button onClick={() => go('demo')} className="btn-primary hidden px-4 py-2 text-sm md:inline-flex">Ir a la demo</button>
        <button aria-label="Abrir menú" className="ml-auto rounded-lg border border-slate-300 px-3 py-1.5 text-sm md:hidden" onClick={() => setOpen((v) => !v)}>Menú</button>
      </nav>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-2 sm:px-6 lg:px-8">
        <p className="text-xs text-slate-500">By <span className="font-medium text-indigo-600">EQUIPO 7</span></p>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="grid gap-2">
            {links.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className="rounded-lg border border-slate-200 px-3 py-2 text-left text-sm text-slate-700">{label}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
