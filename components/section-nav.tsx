"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EASING, SECTION_IDS, SECTION_LABELS, type SectionId } from "@/lib/constants"
import { scrollToSection } from "@/lib/utils"

export function SectionNav() {
  const [active, setActive] = useState<SectionId>("hero")
  const [hovered, setHovered] = useState<SectionId | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-5">
      {SECTION_IDS.map((id) => {
        const isActive = active === id
        const isHovered = hovered === id

        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-3 cursor-pointer focus-visible:outline-none"
            aria-label={`Go to ${SECTION_LABELS[id]}`}
          >
            <AnimatePresence>
              {(isActive || isHovered) && (
                <motion.span
                  key={`${id}-label`}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.18, ease: EASING }}
                  className={`text-[11px] tracking-[0.18em] uppercase font-medium select-none ${
                    isActive ? "text-white" : "text-[#666666]"
                  }`}
                >
                  {SECTION_LABELS[id]}
                </motion.span>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  width:           isActive ? 6 : 4,
                  height:          isActive ? 6 : 4,
                  backgroundColor: isActive ? "#ffffff" : isHovered ? "#666666" : "#2a2a2a",
                  borderRadius:    "50%",
                }}
                transition={{ duration: 0.25, ease: EASING }}
              />
              <motion.div
                animate={{
                  width:           isActive ? 28 : isHovered ? 14 : 8,
                  backgroundColor: isActive ? "#ffffff" : isHovered ? "#555555" : "#2a2a2a",
                  height:          isActive ? 2 : 1,
                }}
                transition={{ duration: 0.3, ease: EASING }}
                className="rounded-full"
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
