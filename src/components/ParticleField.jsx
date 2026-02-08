import { useEffect, useRef } from 'react'

function mulberry32(seed) {
  return function rand() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let raf = 0
    let resizeTimer = 0
    const pointer = { x: 0, y: 0, active: false }
    const bursts = []
    const particles = []
    const state = { w: 0, h: 0, dpr: 1, t: 0 }

    const setup = () => {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.w = window.innerWidth
      state.h = window.innerHeight
      canvas.width = Math.floor(state.w * state.dpr)
      canvas.height = Math.floor(state.h * state.dpr)
      canvas.style.width = `${state.w}px`
      canvas.style.height = `${state.h}px`

      particles.length = 0
      const rand = mulberry32(728311)
      const count = Math.max(90, Math.min(240, Math.floor((state.w * state.h) / 10000)))
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: rand() * state.w,
          y: rand() * state.h,
          vx: (rand() - 0.5) * 0.34,
          vy: (rand() - 0.5) * 0.34,
          r: 1.2 + rand() * 2.8,
          phase: rand() * Math.PI * 2
        })
      }
    }

    const draw = () => {
      state.t += 0.016
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)
      ctx.clearRect(0, 0, state.w, state.h)

      const influence = 180
      const linkDistance = 145

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]

        p.vx += Math.cos(state.t * 0.27 + p.phase) * 0.0016
        p.vy += Math.sin(state.t * 0.31 + p.phase) * 0.0016

        if (pointer.active) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          if (dist < influence) {
            const force = (1 - dist / influence) * 0.028
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        for (let b = 0; b < bursts.length; b += 1) {
          const burst = bursts[b]
          const dx = p.x - burst.x
          const dy = p.y - burst.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          if (dist < burst.radius) {
            const force = (1 - dist / burst.radius) * burst.power
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        p.vx *= 0.985
        p.vy *= 0.985
        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = state.w + 10
        if (p.x > state.w + 10) p.x = -10
        if (p.y < -10) p.y = state.h + 10
        if (p.y > state.h + 10) p.y = -10

        const alpha = 0.38 + ((Math.sin(state.t + p.phase) + 1) / 2) * 0.34
        ctx.beginPath()
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = bursts.length - 1; i >= 0; i -= 1) {
        const b = bursts[i]
        b.life -= 1
        b.radius += 2.2
        ctx.beginPath()
        ctx.strokeStyle = `rgba(221, 42, 123, ${b.life / 30})`
        ctx.lineWidth = 1.2
        ctx.arc(b.x, b.y, b.radius * 0.6, 0, Math.PI * 2)
        ctx.stroke()
        if (b.life <= 0) bursts.splice(i, 1)
      }

      ctx.lineWidth = 0.8
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < linkDistance) {
            const o = (1 - d / linkDistance) * 0.16
            ctx.strokeStyle = `rgba(129, 140, 248, ${o})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = window.requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }

    const onLeave = () => {
      pointer.active = false
    }

    const onClick = (e) => {
      bursts.push({ x: e.clientX, y: e.clientY, radius: 24, life: 30, power: 0.07 })
    }

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(setup, 120)
    }

    setup()
    draw()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10 opacity-90" aria-hidden />
}
