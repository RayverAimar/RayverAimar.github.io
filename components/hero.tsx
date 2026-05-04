"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { personalInfo } from "@/lib/data"
import { scrollToSection } from "@/lib/utils"
import { EASING, DURATION } from "@/lib/constants"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASING } },
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center pt-16">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#080808]" />


      <div className="relative max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          {/* Text */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
            <motion.div variants={item} className="mb-4">
              <span className="text-sm text-[#888888] tracking-widest uppercase">
                {personalInfo.location} · {personalInfo.university}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.p variants={item} className="text-xl sm:text-2xl text-[#aaaaaa] font-light mb-6">
              Fullstack Engineer
            </motion.p>

            <motion.p variants={item} className="text-base text-[#888888] max-w-lg leading-relaxed mb-12">
              Computer Science graduate passionate about building software that
              solves real problems — scalable systems, clean architecture, and
              code that holds up in production. I care about the impact of what
              I build as much as how it&apos;s built.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 bg-white text-black text-sm font-medium rounded hover:bg-white/90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                View Projects
              </button>
              <a
                href={personalInfo.cvUrl}
                download
                className="px-6 py-3 border border-white/20 text-white text-sm font-medium rounded hover:border-white/50 hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:border-white/50"
              >
                Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DURATION.slow, delay: 0.4, ease: EASING }}
            className="flex justify-center md:justify-end md:pr-4 shrink-0"
          >
            <div className="relative">
              <div className="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 ring-1 ring-white/5 ring-offset-4 ring-offset-[#080808]">
                <Image
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  width={256}
                  height={256}
                  className="object-cover object-top w-full h-full"
                  priority
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl -z-10 scale-110" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
