"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { personalInfo } from "@/lib/data"
import { scrollToSection } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { AboutSheet } from "@/components/about"

const NAV_BTN = "text-sm text-[#888888] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-white"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navTo = (id: string) => { setMenuOpen(false); scrollToSection(id) }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-black/80 border-b border-white/5" : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="hover:opacity-75 transition-opacity focus-visible:outline-none focus-visible:opacity-75"
            aria-label="Home"
          >
            <Logo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            <button onClick={() => setAboutOpen(true)} className={NAV_BTN}>About</button>
            <button onClick={() => navTo("projects")} className={NAV_BTN}>Projects</button>
            <button onClick={() => navTo("uses")} className={NAV_BTN}>Uses</button>
            <button onClick={() => navTo("contact")} className={NAV_BTN}>Contact</button>
            <a
              href={personalInfo.cvUrl}
              download
              className="text-sm border border-white/20 text-white px-4 py-1.5 rounded hover:border-white/50 hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:border-white/50"
            >
              Download CV
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1 focus-visible:outline-none focus-visible:opacity-70"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-b border-white/5"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <button onClick={() => { setMenuOpen(false); setAboutOpen(true) }} className={`${NAV_BTN} text-left`}>About</button>
                <button onClick={() => navTo("projects")} className={`${NAV_BTN} text-left`}>Projects</button>
                <button onClick={() => navTo("uses")} className={`${NAV_BTN} text-left`}>Uses</button>
                <button onClick={() => navTo("contact")} className={`${NAV_BTN} text-left`}>Contact</button>
                <a
                  href={personalInfo.cvUrl}
                  download
                  className="text-sm border border-white/20 text-white px-4 py-2 rounded hover:border-white/50 transition-all text-center"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AboutSheet open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}
