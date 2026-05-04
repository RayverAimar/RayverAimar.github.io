"use client"

import { useEffect, useRef } from "react"

// ─── tuning ───────────────────────────────────────────────────────────────────
const STAR_COUNT               = 160
const STAR_RADIUS_MIN          = 0.7
const STAR_RADIUS_MAX          = 2.4
const CONSTELLATION_DISTANCE   = 160
const MOUSE_CONSTELLATION_DIST = 190
const MOUSE_GLOW_RADIUS        = 210
const MAX_SHOOTING_STARS       = 3
const SHOOTING_INTERVAL_MS     = 2800
const SHOOTING_SPEED_MIN       = 9
const SHOOTING_SPEED_MAX       = 15
const SHOOTING_TAIL_MIN        = 90
const SHOOTING_TAIL_MAX        = 160

// ─── constellation data ───────────────────────────────────────────────────────
interface ConstellationStar { id: number; x: number; y: number; r: number }
interface Constellation {
  name:   string
  anchor: { x: number; y: number }  // top-left, screen fraction
  w:      number
  h:      number
  stars:  ConstellationStar[]
  lines:  [number, number][]
}

const CONSTELLATIONS: Constellation[] = [
  {
    // Leo — real IAU stick figure. Stars derived from J2000 RA/Dec, normalised
    // within bounding box (x: east→right, y: north→up).
    // Sickle = reversed question-mark (right side); body chain → Denebola tail (left).
    // Positioned above the hero photo (right column ~57-79% of screen width)
    // w/h ≈ 0.96 gives natural proportions for Leo on 16:9 (RA/Dec aspect × H/W)
    name: "Leo",
    anchor: { x: 0.57, y: 0.03 },
    w: 0.22,
    h: 0.23,
    stars: [
      { id:  0, x: 0.02, y: 0.59, r: 4.2 },  // β Denebola      — tail, far left
      { id:  1, x: 0.26, y: 0.31, r: 2.8 },  // δ Zosma
      { id:  2, x: 0.26, y: 0.55, r: 2.8 },  // θ Chertan
      { id:  3, x: 0.19, y: 0.78, r: 2.2 },  // ι Leo
      { id:  4, x: 0.21, y: 0.97, r: 2.0 },  // σ Leo            — lower body
      { id:  5, x: 0.71, y: 0.49, r: 2.8 },  // η Leo
      { id:  6, x: 0.70, y: 0.72, r: 5.5 },  // α Regulus        — brightest
      { id:  7, x: 0.62, y: 0.34, r: 3.8 },  // γ Algieba
      { id:  8, x: 0.64, y: 0.17, r: 2.8 },  // ζ Adhafera
      { id:  9, x: 0.81, y: 0.05, r: 3.0 },  // μ Rasalas
      { id: 10, x: 1.00, y: 0.04, r: 2.5 },  // κ Leo            — sickle tip
      { id: 11, x: 0.95, y: 0.19, r: 2.2 },  // λ Alterf
      { id: 12, x: 0.85, y: 0.15, r: 3.2 },  // ε Algenubi
    ],
    lines: [
      // lower body chain → Denebola tail
      [4,3],[3,2],[2,1],[1,0],
      // Chertan → η, then Regulus hangs from η
      [2,5],[6,5],
      // sickle arc: η → ε → λ → κ → μ → ζ → γ
      [5,12],[12,11],[11,10],[10,9],[9,8],[8,7],
      // hook closure at top of sickle (Rasalas ↔ Algenubi double connection)
      [9,12],
      // body triangle: Algieba → Zosma
      [7,1],
    ],
  },
  {
    // Libra — real IAU stick figure. Stars derived from J2000 RA/Dec, normalised.
    // Shape: tilted crossbar α-γ-β (scales beam) + left chain τ-υ-γ + right pendant α-σ.
    // Positioned in the left margin before the name text starts (~x 4-16%)
    // h ≈ 2.4×w gives natural proportions for Libra on 16:9 (Libra is tall, not wide)
    name: "Libra",
    anchor: { x: 0.04, y: 0.03 },
    w: 0.12,
    h: 0.29,
    stars: [
      { id: 0, x: 0.26, y: 0.99, r: 2.0 },  // τ Lib            — bottom left
      { id: 1, x: 0.28, y: 0.91, r: 2.2 },  // υ Lib
      { id: 2, x: 0.30, y: 0.28, r: 3.0 },  // γ Lib            — upper left node
      { id: 3, x: 0.57, y: 0.02, r: 4.2 },  // β Zubeneschamali — upper right (bright)
      { id: 4, x: 0.96, y: 0.34, r: 5.0 },  // α Zubenelgenubi  — right (brightest)
      { id: 5, x: 0.76, y: 0.78, r: 2.8 },  // σ Lib / Brachium — right lower
    ],
    lines: [
      // left chain: τ→υ→γ
      [0,1],[1,2],
      // upper beam: γ→β→α
      [2,3],[3,4],
      // crossbar diagonal closing the trapezoid: α→γ
      [4,2],
      // right pendant: α→σ
      [4,5],
    ],
  },
]

// ─── types ────────────────────────────────────────────────────────────────────
interface Star {
  x: number; y: number; radius: number
  baseOpacity: number; twinkleSpeed: number; twinklePhase: number
}
interface ShootingStar {
  x: number; y: number; vx: number; vy: number
  tailLength: number; life: number; maxLife: number
}

function buildStars(w: number, h: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x:            Math.random() * w,
    y:            Math.random() * h,
    radius:       Math.random() * (STAR_RADIUS_MAX - STAR_RADIUS_MIN) + STAR_RADIUS_MIN,
    baseOpacity:  Math.random() * 0.5 + 0.12,
    twinkleSpeed: Math.random() * 0.0015 + 0.0005,
    twinklePhase: Math.random() * Math.PI * 2,
  }))
}

function buildShooter(w: number, h: number): ShootingStar {
  const angle = Math.PI / 6 + Math.random() * (Math.PI / 4)
  const speed = Math.random() * (SHOOTING_SPEED_MAX - SHOOTING_SPEED_MIN) + SHOOTING_SPEED_MIN
  return {
    x: Math.random() * w * 0.75, y: Math.random() * h * 0.3,
    vx: Math.cos(angle) * speed,  vy: Math.sin(angle) * speed,
    tailLength: Math.random() * (SHOOTING_TAIL_MAX - SHOOTING_TAIL_MIN) + SHOOTING_TAIL_MIN,
    life: 0, maxLife: 50 + Math.floor(Math.random() * 40),
  }
}

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)
}

function resolveConst(c: Constellation, W: number, H: number) {
  const ox = c.anchor.x * W, oy = c.anchor.y * H
  const bw = c.w * W,        bh = c.h * H
  return c.stars.map((s) => ({ ...s, sx: ox + s.x * bw, sy: oy + s.y * bh }))
}

// ─── component ────────────────────────────────────────────────────────────────
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse     = useRef({ x: -9999, y: -9999, active: false })
  const scroll    = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let animId = 0, lastSpawn = 0
    const shooters: ShootingStar[] = []

    const resize   = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    const onScroll = () => { scroll.current = window.scrollY }
    resize()
    const stars = buildStars(canvas.width, canvas.height)

    const onMove  = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY, active: true } }
    const onLeave = ()               => { mouse.current = { x: -9999, y: -9999, active: false } }

    window.addEventListener("resize",      resize,    { passive: true })
    window.addEventListener("scroll",      onScroll,  { passive: true })
    window.addEventListener("mousemove",   onMove,    { passive: true })
    document.addEventListener("mouseleave", onLeave)

    const tick = (t: number) => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      const mx = mouse.current.x, my = mouse.current.y, mActive = mouse.current.active

      // constellations fade out as user scrolls past the hero section (~100vh)
      // disabled on narrow screens where portrait layout breaks the positioning
      const constAlpha = W < 768 ? 0 : Math.max(0, 1 - scroll.current / (H * 0.65))

      // ── faint ambient constellation lines ─────────────────────────────────
      ctx.lineWidth = 0.5
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const d = dist(stars[i].x, stars[i].y, stars[j].x, stars[j].y)
          if (d < CONSTELLATION_DISTANCE) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / CONSTELLATION_DISTANCE) * 0.08})`
            ctx.beginPath(); ctx.moveTo(stars[i].x, stars[i].y); ctx.lineTo(stars[j].x, stars[j].y); ctx.stroke()
          }
        }
      }

      // ── Leo + Libra — hero-only, fade on scroll ───────────────────────────
      if (constAlpha > 0) {
        for (const c of CONSTELLATIONS) {
          const resolved = resolveConst(c, W, H)
          const byId = Object.fromEntries(resolved.map((s) => [s.id, s]))

          for (const [a, b] of c.lines) {
            const sa = byId[a], sb = byId[b]
            ctx.beginPath(); ctx.moveTo(sa.sx, sa.sy); ctx.lineTo(sb.sx, sb.sy)
            ctx.strokeStyle = `rgba(180,200,255,${0.04 * constAlpha})`; ctx.lineWidth = 6; ctx.stroke()
            ctx.beginPath(); ctx.moveTo(sa.sx, sa.sy); ctx.lineTo(sb.sx, sb.sy)
            ctx.strokeStyle = `rgba(210,225,255,${0.22 * constAlpha})`; ctx.lineWidth = 1.4; ctx.stroke()
          }

          for (const s of resolved) {
            const halo = ctx.createRadialGradient(s.sx, s.sy, 0, s.sx, s.sy, s.r * 3.5)
            halo.addColorStop(0, `rgba(200,215,255,${0.20 * constAlpha})`)
            halo.addColorStop(1, "rgba(200,215,255,0)")
            ctx.beginPath(); ctx.arc(s.sx, s.sy, s.r * 3.5, 0, Math.PI * 2)
            ctx.fillStyle = halo; ctx.fill()
            ctx.beginPath(); ctx.arc(s.sx, s.sy, s.r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(235,242,255,${0.82 * constAlpha})`; ctx.fill()
          }

          const topStar = resolved.reduce((a, b) => (a.sy < b.sy ? a : b))
          ctx.font = "9px var(--font-geist-mono, monospace)"
          ctx.fillStyle = `rgba(200,215,255,${0.18 * constAlpha})`
          ctx.fillText(c.name.toUpperCase(), topStar.sx + 8, topStar.sy - 8)
        }
      }

      // ── mouse interactions ─────────────────────────────────────────────────
      if (mActive) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_GLOW_RADIUS)
        glow.addColorStop(0, "rgba(255,255,255,0.05)"); glow.addColorStop(1, "rgba(255,255,255,0)")
        ctx.beginPath(); ctx.arc(mx, my, MOUSE_GLOW_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = glow; ctx.fill()

        ctx.lineWidth = 0.8
        for (const s of stars) {
          const d = dist(mx, my, s.x, s.y)
          if (d < MOUSE_CONSTELLATION_DIST) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / MOUSE_CONSTELLATION_DIST) * 0.35})`
            ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(s.x, s.y); ctx.stroke()
          }
        }
        ctx.beginPath(); ctx.arc(mx, my, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.65)"; ctx.fill()
      }

      // ── background stars ───────────────────────────────────────────────────
      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinklePhase) * 0.22
        const dMouse  = mActive ? dist(mx, my, s.x, s.y) : 9999
        const boost   = dMouse < MOUSE_GLOW_RADIUS ? (1 - dMouse / MOUSE_GLOW_RADIUS) * 0.5 : 0
        ctx.beginPath(); ctx.arc(s.x, s.y, s.radius + boost * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.04, s.baseOpacity + twinkle + boost)})`; ctx.fill()
      }

      // ── shooting stars ─────────────────────────────────────────────────────
      if (!reduced) {
        if (t - lastSpawn > SHOOTING_INTERVAL_MS && shooters.length < MAX_SHOOTING_STARS) {
          shooters.push(buildShooter(W, H)); lastSpawn = t
        }
        for (let i = shooters.length - 1; i >= 0; i--) {
          const ss = shooters[i]
          const p  = ss.life / ss.maxLife
          const a  = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8

          const tx = ss.x - ss.vx * (ss.tailLength / 10)
          const ty = ss.y - ss.vy * (ss.tailLength / 10)
          const g  = ctx.createLinearGradient(tx, ty, ss.x, ss.y)
          g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, `rgba(255,255,255,${a * 0.9})`)

          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(ss.x, ss.y)
          ctx.strokeStyle = g; ctx.lineWidth = 2.5; ctx.stroke()

          // head glow
          const hg = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 10)
          hg.addColorStop(0, `rgba(255,255,255,${a * 0.6})`); hg.addColorStop(1, "rgba(255,255,255,0)")
          ctx.beginPath(); ctx.arc(ss.x, ss.y, 10, 0, Math.PI * 2); ctx.fillStyle = hg; ctx.fill()
          ctx.beginPath(); ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill()

          ss.x += ss.vx; ss.y += ss.vy; ss.life++
          if (ss.life >= ss.maxLife || ss.x > W || ss.y > H) shooters.splice(i, 1)
        }
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize",      resize)
      window.removeEventListener("scroll",      onScroll)
      window.removeEventListener("mousemove",   onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
}
