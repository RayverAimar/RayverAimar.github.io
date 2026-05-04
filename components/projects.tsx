"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { projects } from "@/lib/data"
import { cn } from "@/lib/utils"
import { EASING, DURATION, STAGGER, MACOS_DOTS } from "@/lib/constants"
import {
  SiPython, SiDjango, SiReact, SiTypescript, SiPostgresql,
  SiDocker, SiGooglecloud, SiFastapi, SiRust, SiSqlite,
  SiTailwindcss, SiAstro, SiCloudflare,
} from "react-icons/si"
import { TbBrandCpp } from "react-icons/tb"

type Project = (typeof projects)[0]

// Safe Tailwind class lookup — dynamic interpolation is purged at build time
const IMAGE_POSITION_CLASS: Record<"top" | "center", string> = {
  top:    "object-top",
  center: "object-center",
}

const TECH_ICONS: Record<string, React.ReactNode> = {
  "Python":           <SiPython className="text-[#3776AB]" />,
  "Django":           <SiDjango className="text-[#092E20]" style={{ filter: "brightness(2)" }} />,
  "DRF":              <SiDjango className="text-[#092E20]" style={{ filter: "brightness(2)" }} />,
  "React 19":         <SiReact className="text-[#61DAFB]" />,
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
  "Astro":            <SiAstro className="text-[#BC52EE]" />,
  "Cloudflare Pages": <SiCloudflare className="text-[#F48120]" />,
  "Graphviz":         <SiPython className="text-[#3776AB]" />,
  "C++17":            <TbBrandCpp className="text-[#00599C]" />,
  "Preact":           <SiReact className="text-[#673AB8]" />,
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

function MacOsTitlebar({ isPrivate, size }: { isPrivate: boolean; size: "sm" | "lg" }) {
  const lg = size === "lg"
  return (
    <div className={cn(
      "absolute top-0 left-0 right-0 z-10 bg-[#1c1c1e] border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0",
      lg ? "h-8" : "h-7"
    )}>
      <span className={cn("rounded-full", lg ? "w-3 h-3" : "w-2.5 h-2.5")} style={{ backgroundColor: MACOS_DOTS.close }} />
      <span className={cn("rounded-full", lg ? "w-3 h-3" : "w-2.5 h-2.5")} style={{ backgroundColor: MACOS_DOTS.minimize }} />
      <span className={cn("rounded-full", lg ? "w-3 h-3" : "w-2.5 h-2.5")} style={{ backgroundColor: MACOS_DOTS.maximize }} />
      <div className="flex-1 mx-4">
        <div className={cn("bg-[#2c2c2e] rounded mx-auto", lg ? "h-4 w-48" : "h-3.5 w-40")} />
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

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="bg-[#0d0d0d] border border-white/10 text-white max-w-4xl w-full p-0 overflow-y-auto max-h-[90dvh]">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>

        <div className="relative bg-[#0d0d0d] overflow-hidden rounded-t-lg" style={{ aspectRatio: "16/9" }}>
          <MacOsTitlebar isPrivate={project.isPrivate} size="lg" />
          <div className="absolute inset-0 top-8">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover ${IMAGE_POSITION_CLASS[project.imagePosition]}`}
              unoptimized
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-white font-bold text-xl">{project.title}</h2>
            <p className="text-[#666666] text-sm mt-0.5">{project.subtitle}</p>
          </div>

          <p className="text-[#aaaaaa] leading-relaxed">{project.description}</p>

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
            <div className="flex gap-4 pt-2 border-t border-white/5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="flex items-center gap-2 text-sm text-[#666666] hover:text-white transition-colors"
                >
                  <GithubIcon size={16} /> View on GitHub
                </a>
              )}
              {project.deploy && (
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo of ${project.title}`}
                  className="flex items-center gap-2 text-sm text-[#666666] hover:text-white transition-colors"
                >
                  <ExternalLinkIcon size={16} /> Live Demo
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
        image={project.image}
        title={project.title}
        isPrivate={project.isPrivate}
        imagePosition={project.imagePosition}
      />

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="text-white font-semibold text-base">{project.title}</h3>
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
                className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-white transition-colors"
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
                className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-white transition-colors"
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

  return (
    <section id="projects" className="py-16 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, ease: EASING }}
          className="mb-12"
        >
          <h2 className="text-sm text-[#888888] tracking-widest uppercase mb-2">Projects</h2>
          <p className="text-3xl font-bold text-white tracking-tight">What I&apos;ve built</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
