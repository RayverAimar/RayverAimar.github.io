"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { uses } from "@/lib/data"
import { EASING, DURATION, STAGGER } from "@/lib/constants"
import {
  SiPython, SiReact, SiTypescript, SiPostgresql,
  SiDocker, SiRust, SiApple, SiGithubactions, SiFigma,
  SiPostman, SiLinear, SiAnthropic, SiWarp,
} from "react-icons/si"
import {
  TbBrandVscode, TbDatabase, TbBrandCpp,
} from "react-icons/tb"

const TOOL_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  "VS Code":              { icon: <TbBrandVscode />, color: "#007ACC" },
  "macOS":               { icon: <SiApple />,        color: "#A8A8A8" },
  "Warp":                { icon: <SiWarp />,          color: "#01A4FF" },
  "TablePlus":           { icon: <TbDatabase />,      color: "#9B59B6" },
  "Docker Desktop":      { icon: <SiDocker />,        color: "#2496ED" },
  "Python / Django":     { icon: <SiPython />,        color: "#3776AB" },
  "TypeScript / React":  { icon: <SiTypescript />,    color: "#3178C6" },
  "Rust":                { icon: <SiRust />,           color: "#CE422B" },
  "PostgreSQL":          { icon: <SiPostgresql />,    color: "#4169E1" },
  "C++ / OpenGL":        { icon: <TbBrandCpp />,      color: "#00599C" },
  "Claude (Anthropic)":  { icon: <SiAnthropic />,     color: "#C98B5A" },
  "GitHub Actions":      { icon: <SiGithubactions />, color: "#2088FF" },
  "Linear":              { icon: <SiLinear />,         color: "#5E6AD2" },
  "Figma":               { icon: <SiFigma />,          color: "#F24E1E" },
  "Postman / Bruno":     { icon: <SiPostman />,        color: "#FF6C37" },
}

const CATEGORIES = [
  { key: "environment" as const, label: "Environment",      title: "Editor & Shell" },
  { key: "stack"       as const, label: "Stack",            title: "Languages & Frameworks" },
  { key: "tools"       as const, label: "Tools",            title: "Apps & Services" },
]

function ToolBadge({ name, delay }: { name: string; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const cfg = TOOL_CONFIG[name]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.fast, ease: EASING, delay }}
      className="group flex items-center gap-2 px-3 py-2 bg-[#0d0d0d] border border-white/[0.07] rounded-lg hover:border-white/[0.15] hover:bg-[#111] transition-all duration-150 cursor-default"
    >
      <span
        className="text-base leading-none shrink-0 transition-transform duration-150 group-hover:scale-110"
        style={{ color: cfg?.color ?? "#666" }}
      >
        {cfg?.icon}
      </span>
      <span className="text-[13px] text-[#888] group-hover:text-[#aaa] transition-colors whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  )
}

export function Uses() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="uses" className="py-16 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, ease: EASING }}
          className="mb-16"
        >
          <p className="text-xs text-[#555555] tracking-[0.2em] uppercase mb-3">Uses</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">What I work with</h2>
          <p className="text-[#555555] text-sm mt-3 max-w-lg leading-relaxed">
            The stack, tools, and environment I use day-to-day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {CATEGORIES.map(({ key, label, title }, catIdx) => (
            <div key={key}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.normal, ease: EASING, delay: catIdx * STAGGER.item }}
                className="mb-5"
              >
                <p className="text-[10px] text-[#444444] tracking-[0.25em] uppercase mb-1">{label}</p>
                <h3 className="text-white/90 font-semibold text-sm">{title}</h3>
              </motion.div>
              <div className="flex flex-wrap gap-2">
                {uses[key].map((item, i) => (
                  <ToolBadge
                    key={item.name}
                    name={item.name}
                    delay={catIdx * STAGGER.item + i * 0.06}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
