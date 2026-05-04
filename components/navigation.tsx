"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { personalInfo } from "@/lib/data"
import { scrollToSection } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { AboutSheet } from "@/components/about"

const NAV_BTN = "text-sm text-[#888888] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-white"

const MOBILE_LINKS = [
  { id: "about",    label: "About",    num: "01" },
  { id: "projects", label: "Projects", num: "02" },
  { id: "uses",     label: "Uses",     num: "03" },
  { id: "contact",  label: "Contact",  num: "04" },
]

export function Navigation() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const navTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => scrollToSection(id), 300)
  }

  const openAbout = () => {
    setMenuOpen(false)
    setTimeout(() => setAboutOpen(true), 300)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "backdrop-blur-md bg-black/90 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="hover:opacity-75 transition-opacity focus-visible:outline-none focus-visible:opacity-75 relative z-50"
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

          {/* Hamburger — sits above the drawer overlay */}
          <button
            className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 focus-visible:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-px bg-white origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-white mt-[5px] origin-center"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-px bg-white mt-[5px] origin-center"
            />
          </button>
        </nav>
      </header>

      {/* Full-screen mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-[#080808]"
          >
            {/* subtle dot grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />

            {/* Nav links — main body */}
            <div className="relative flex-1 flex flex-col justify-center px-8 pt-24 pb-8">
              <nav className="space-y-1">
                {MOBILE_LINKS.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {link.id === "about" ? (
                      <button
                        onClick={openAbout}
                        className="group flex items-baseline gap-4 w-full py-3 border-b border-white/5 last:border-0 focus-visible:outline-none"
                      >
                        <span className="text-[11px] text-[#333333] font-mono tracking-widest w-6 shrink-0">
                          {link.num}
                        </span>
                        <span className="text-4xl font-bold text-[#2a2a2a] group-hover:text-white transition-colors duration-200 tracking-tight">
                          {link.label}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => navTo(link.id)}
                        className="group flex items-baseline gap-4 w-full py-3 border-b border-white/5 last:border-0 focus-visible:outline-none"
                      >
                        <span className="text-[11px] text-[#333333] font-mono tracking-widest w-6 shrink-0">
                          {link.num}
                        </span>
                        <span className="text-4xl font-bold text-[#2a2a2a] group-hover:text-white transition-colors duration-200 tracking-tight">
                          {link.label}
                        </span>
                      </button>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, delay: 0.28 }}
              className="relative px-8 pb-10 pt-4 border-t border-white/5 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-[#333333] tracking-widest uppercase mb-1">Location</p>
                <p className="text-sm text-[#666666]">{personalInfo.location}</p>
              </div>
              <div className="flex items-center gap-5">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#444444] hover:text-white transition-colors tracking-widest uppercase"
                >
                  GitHub
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#444444] hover:text-white transition-colors tracking-widest uppercase"
                >
                  LinkedIn
                </a>
                <a
                  href={personalInfo.cvUrl}
                  download
                  className="text-xs text-white border border-white/20 px-3 py-1.5 rounded hover:border-white/50 transition-colors"
                >
                  CV
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AboutSheet open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}
