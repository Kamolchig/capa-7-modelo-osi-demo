# OSI Layer Lab (React + Vite)

Landing técnica moderna sobre Modelo OSI, enfocada en Capa 7 (Aplicación).

## Stack
- React + Vite
- TailwindCSS
- Framer Motion
- Lucide React
- Canvas particles deterministas (sin Math.random)

## Ejecutar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Demo en Network
1. Abrir DevTools -> Network.
2. Ir a la sección Demo.
3. Elegir escenario (200 real o simulados 401/403/404/500).
4. Click en "Generar tráfico de Capa 7".
5. Revisar Method, Status, Headers, Response y Timing.

Para evitar confusión por caché, el fetch real usa:
`/demo.json?v=contador` con `cache: 'no-store'`.

## Deploy
- GitHub Pages: construir con `npm run build` y publicar `dist/`.
- Vercel: framework Vite, output `dist`.

Autora visible en UI: **Kamila García**.
