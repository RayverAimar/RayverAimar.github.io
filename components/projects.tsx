"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { projects, projectCategories, type Project, type ProjectCategory } from "@/lib/data"
import { cn } from "@/lib/utils"
import { EASING, DURATION, STAGGER, MACOS_DOTS } from "@/lib/constants"
import {
  SiPython, SiDjango, SiReact, SiTypescript, SiPostgresql,
  SiDocker, SiGooglecloud, SiFastapi, SiRust, SiSqlite,
  SiTailwindcss, SiAstro, SiCloudflare,
  SiNumpy, SiScikitlearn, SiVite, SiApache, SiScrapy, SiAnthropic,
} from "react-icons/si"
import { TbBrandCpp, TbMathFunction, TbBinaryTree } from "react-icons/tb"

// Safe Tailwind class lookup — dynamic interpolation is purged at build time
const IMAGE_POSITION_CLASS: Record<"top" | "center", string> = {
  top:    "object-top",
  center: "object-center",
}

const TECH_ICONS: Record<string, React.ReactNode> = {
  "Python":           <SiPython className="text-[#3776AB]" />,
  "Python 3.10+":     <SiPython className="text-[#3776AB]" />,
  "Django":           <SiDjango className="text-[#092E20]" style={{ filter: "brightness(2)" }} />,
  "DRF":              <SiDjango className="text-[#092E20]" style={{ filter: "brightness(2)" }} />,
  "React 19":         <SiReact className="text-[#61DAFB]" />,
  "React 18":         <SiReact className="text-[#61DAFB]" />,
  "React":            <SiReact className="text-[#61DAFB]" />,
  "TypeScript":       <SiTypescript className="text-[#3178C6]" />,
  "PostgreSQL":       <SiPostgresql className="text-[#4169E1]" />,
  "pgvector":         <SiPostgresql className="text-[#4169E1]" />,
  "Docker":           <SiDocker className="text-[#2496ED]" />,
  "GCP":              <SiGooglecloud className="text-[#4285F4]" />,
  "FastAPI":          <SiFastapi className="text-[#009688]" />,
  "Rust":             <SiRust className="text-[#CE422B]" />,
  "SQLite":           <SiSqlite className="text-[#003B57]" style={{ filter: "brightness(2)" }} />,
  "Tailwind":         <SiTailwindcss className="text-[#06B6D4]" />,
  "Tailwind CSS":     <SiTailwindcss className="text-[#06B6D4]" />,
  "Astro":            <SiAstro className="text-[#BC52EE]" />,
  "Cloudflare Pages": <SiCloudflare className="text-[#F48120]" />,
  "Preact":           <SiReact className="text-[#673AB8]" />,
  "C++17":            <TbBrandCpp className="text-[#00599C]" />,
  "C++":              <TbBrandCpp className="text-[#00599C]" />,
  "NumPy":            <SiNumpy className="text-[#013243]" style={{ filter: "brightness(3)" }} />,
  "scikit-learn":     <SiScikitlearn className="text-[#F89939]" />,
  "Matplotlib":       <TbMathFunction className="text-[#11557C]" style={{ filter: "brightness(2)" }} />,
  "Vite":             <SiVite className="text-[#646CFF]" />,
  "ECharts":          <SiApache className="text-[#D22128]" />,
  "Scrapy 2.x":       <SiScrapy className="text-[#60A839]" />,
  "Claude AI":        <SiAnthropic className="text-[#D97757]" />,
  "Tauri v2":         <SiRust className="text-[#FFC131]" />,
  "Dynamic Programming": <TbBinaryTree className="text-[#9333EA]" />,
  "Minimax":          <TbBinaryTree className="text-[#9333EA]" />,
}

function TechBadge({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  return (
    <span className={cn(
      "flex items-center",
      size === "sm"
        ? "gap-1.5 text-[10px] bg-[#111111] border border-white/5 text-[#888888] px-2 py-1 rounded"
        : "gap-2 text-xs bg-[#1a1a1a] border border-white/10 text-[#888888] px-3 py-1.5 rounded"
    )}>
      {TECH_ICONS[name] && <span className="text-sm leading-none">{TECH_ICONS[name]}</span>}
      {name}
    </span>
  )
}

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ChevronIcon({ direction, size = 18 }: { direction: "left" | "right"; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "left"
        ? <polyline points="15 18 9 12 15 6" />
        : <polyline points="9 18 15 12 9 6" />}
    </svg>
  )
}

function MacOsTitlebar({ isPrivate, size, label }: { isPrivate: boolean; size: "sm" | "lg"; label?: string }) {
  const lg = size === "lg"
  return (
    <div className={cn(
      "absolute top-0 left-0 right-0 z-10 bg-[#1c1c1e] border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0",
      lg ? "h-8" : "h-7"
    )}>
      <span className={cn("rounded-full", lg ? "w-3 h-3" : "w-2.5 h-2.5")} style={{ backgroundColor: MACOS_DOTS.close }} />
      <span className={cn("rounded-full", lg ? "w-3 h-3" : "w-2.5 h-2.5")} style={{ backgroundColor: MACOS_DOTS.minimize }} />
      <span className={cn("rounded-full", lg ? "w-3 h-3" : "w-2.5 h-2.5")} style={{ backgroundColor: MACOS_DOTS.maximize }} />
      <div className="flex-1 mx-4 flex items-center justify-center">
        {label
          ? <span className={cn("text-[#888888] truncate", lg ? "text-[11px]" : "text-[10px]")}>{label}</span>
          : <div className={cn("bg-[#2c2c2e] rounded mx-auto", lg ? "h-4 w-48" : "h-3.5 w-40")} />}
      </div>
      {isPrivate && (
        <span className="text-[9px] bg-black/60 border border-white/20 text-[#888888] px-1.5 py-0.5 rounded tracking-widest uppercase">
          Private
        </span>
      )}
    </div>
  )
}

function MacOsFrame({ image, title, isPrivate, imagePosition }: {
  image: string
  title: string
  isPrivate: boolean
  imagePosition: "top" | "center"
}) {
  return (
    <div className="relative bg-[#111111] overflow-hidden" style={{ aspectRatio: "16/10" }}>
      <MacOsTitlebar isPrivate={isPrivate} size="sm" />
      <div className="absolute inset-0 top-7">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover ${IMAGE_POSITION_CLASS[imagePosition]} transition-transform duration-500 group-hover:scale-105`}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] -z-10" />
      </div>
    </div>
  )
}

function ImageCarousel({ images, title, isPrivate, imagePosition, layout }: {
  images: string[]
  title: string
  isPrivate: boolean
  imagePosition: "top" | "center"
  layout: "horizontal" | "vertical"
}) {
  const [idx, setIdx] = useState(0)
  const hasMulti = images.length > 1

  const next = () => setIdx((i) => (i + 1) % images.length)
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)

  // Keyboard navigation
  useEffect(() => {
    if (!hasMulti) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length)
      if (e.key === "ArrowLeft")  setIdx((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [hasMulti, images.length])

  return (
    <div
      className={cn(
        "relative bg-[#0d0d0d] overflow-hidden h-full w-full",
        layout === "horizontal" ? "md:rounded-l-lg" : "rounded-t-lg"
      )}
      style={layout === "vertical" ? { aspectRatio: "16/9" } : undefined}
    >
      <MacOsTitlebar isPrivate={isPrivate} size="lg" label={hasMulti ? `${idx + 1} / ${images.length}` : undefined} />
      <div className="absolute inset-0 top-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[idx]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={images[idx]}
              alt={`${title} — view ${idx + 1}`}
              fill
              className={cn(
                layout === "horizontal"
                  ? "object-contain object-center p-4"
                  : `object-cover ${IMAGE_POSITION_CLASS[imagePosition]}`
              )}
              unoptimized
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
        {layout === "vertical" && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent pointer-events-none" />
        )}
      </div>

      {hasMulti && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-white hover:text-black border border-white/15 hover:border-white text-white/80 flex items-center justify-center backdrop-blur transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-white hover:text-black border border-white/15 hover:border-white text-white/80 flex items-center justify-center backdrop-blur transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronIcon direction="right" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to image ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  "cursor-pointer",
                  i === idx ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="bg-[#0d0d0d] border border-white/10 text-white w-[95vw] sm:max-w-6xl !p-0 gap-0 overflow-hidden max-h-[90dvh] h-auto md:h-[640px] flex flex-col md:flex-row">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>

        {/* Image (left on desktop, top on mobile) */}
        <div className="relative md:flex-1 md:min-w-0 md:border-r md:border-white/5 aspect-[16/10] md:aspect-auto md:h-full">
          <ImageCarousel
            images={project.images}
            title={project.title}
            isPrivate={project.isPrivate}
            imagePosition={project.imagePosition}
            layout="horizontal"
          />
        </div>

        {/* Content (right on desktop, bottom on mobile) */}
        <div className="md:w-[400px] md:shrink-0 p-6 space-y-5 overflow-y-auto md:h-full">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="text-white font-bold text-xl">{project.title}</h2>
              <span className="text-[9px] tracking-widest uppercase text-[#666] bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                {project.category}
              </span>
            </div>
            <p className="text-[#666666] text-sm mt-0.5">{project.subtitle}</p>
          </div>

          <p className="text-[#aaaaaa] text-sm leading-relaxed">{project.description}</p>

          <div className="p-4 bg-[#111111] border border-white/5 rounded-lg">
            <p className="text-xs text-[#555555] uppercase tracking-widest mb-1">Problem solved</p>
            <p className="text-[#888888] text-sm leading-relaxed">{project.problem}</p>
          </div>

          <div>
            <p className="text-xs text-[#555555] uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => <TechBadge key={t} name={t} size="md" />)}
            </div>
          </div>

          {(project.github || project.deploy) && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="flex items-center gap-2 text-xs px-3.5 py-2 rounded-md border border-white/10 bg-white/[0.02] text-[#aaa] hover:bg-white hover:text-black hover:border-white transition-all duration-200 cursor-pointer"
                >
                  <GithubIcon size={14} /> View on GitHub
                </a>
              )}
              {project.deploy && (
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo of ${project.title}`}
                  className="flex items-center gap-2 text-xs px-3.5 py-2 rounded-md border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-200 cursor-pointer"
                >
                  <ExternalLinkIcon size={14} /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const thumb = project.images[0]

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.normal, ease: EASING, delay: (index % 2) * STAGGER.item }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      aria-label={`View details for ${project.title}`}
      className="group flex flex-col text-left w-full bg-[#1a1a1a] border border-white/10 hover:border-white/25 rounded-lg overflow-hidden transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
    >
      <MacOsFrame
        image={thumb}
        title={project.title}
        isPrivate={project.isPrivate}
        imagePosition={project.imagePosition}
      />

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold text-base">{project.title}</h3>
            {project.images.length > 1 && (
              <span className="text-[9px] tracking-widest uppercase text-[#666] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                {project.images.length} views
              </span>
            )}
          </div>
          <p className="text-[#666666] text-xs mt-0.5">{project.subtitle}</p>
        </div>

        <p className="text-[#888888] text-sm leading-relaxed line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tech.slice(0, 5).map((t) => <TechBadge key={t} name={t} size="sm" />)}
          {project.tech.length > 5 && (
            <span className="text-[10px] text-[#444444] px-1 py-1">+{project.tech.length - 5}</span>
          )}
        </div>

        {(project.github || project.deploy) && (
          <div className="flex gap-4 pt-2 border-t border-white/5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} on GitHub`}
                className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-white transition-colors cursor-pointer"
              >
                <GithubIcon /> GitHub
              </a>
            )}
            {project.deploy && (
              <a
                href={project.deploy}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} live demo`}
                className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-white transition-colors cursor-pointer"
              >
                <ExternalLinkIcon /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.button>
  )
}

export function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [selected, setSelected] = useState<Project | null>(null)
  const [filter, setFilter] = useState<"All" | ProjectCategory | "Featured">("Featured")
  const [showAll, setShowAll] = useState(false)

  const FEATURED_LIMIT = 6

  const filtered = (() => {
    if (filter === "Featured") return projects.filter((p) => p.featured)
    if (filter === "All") return projects
    return projects.filter((p) => p.category === filter)
  })()

  const visible = filter === "Featured" || showAll ? filtered : filtered.slice(0, FEATURED_LIMIT)
  const hasMore = filter !== "Featured" && filtered.length > FEATURED_LIMIT && !showAll

  const tabs: ("Featured" | "All" | ProjectCategory)[] = ["Featured", ...projectCategories]

  return (
    <section id="projects" className="py-16 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, ease: EASING }}
          className="mb-8"
        >
          <h2 className="text-sm text-[#888888] tracking-widest uppercase mb-2">Projects</h2>
          <p className="text-3xl font-bold text-white tracking-tight">What I&apos;ve built</p>
        </motion.div>

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Project category"
          className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-white/5"
        >
          {tabs.map((cat) => {
            const isActive = filter === cat
            const count = cat === "Featured"
              ? projects.filter((p) => p.featured).length
              : cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => { setFilter(cat); setShowAll(false) }}
                className={cn(
                  "flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer",
                  isActive
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-[#888] border-white/10 hover:border-white/30 hover:text-white"
                )}
              >
                {cat}
                <span className={cn("text-[10px]", isActive ? "text-black/50" : "text-[#555]")}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <motion.div
          layout
          className="grid md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} index={index} onClick={() => setSelected(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-xs text-[#888] hover:text-white px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
            >
              View {filtered.length - FEATURED_LIMIT} more
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
