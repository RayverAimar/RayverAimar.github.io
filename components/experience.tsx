"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { EASING, DURATION, STAGGER } from "@/lib/constants"

const stats = [
  { value: "5+",  label: "Years coding" },
  { value: "2",   label: "Companies" },
  { value: "47+", label: "Public repos" },
  { value: "13",  label: "Parties reached" },
]

const experience = [
  {
    role: "Software Engineer",
    type: "Contract",
    company: "Canaria Consulting",
    location: "Remote",
    period: "Jan 2025 — Present",
    current: true,
    bullets: [
      "Designed and built a full-stack multi-tenant KYC/AML platform with fine-grained RBAC serving crypto and fintech organizations",
      "Integrated multiple blockchain screening and sanctions APIs into a unified risk assessment pipeline with Celery async scheduling",
      "Deployed to Google Cloud Run with CI/CD via GitHub Actions; implemented document OCR with Azure Document AI",
    ],
  },
  {
    role: "Software Developer",
    type: "Freelance",
    company: "Asociación Civil Transparencia",
    location: "Lima, Peru",
    period: "Jul 2024 — Dec 2024",
    current: false,
    bullets: [
      "Built Radar Tolerancia Cero — a civic-tech platform for Peru's 2026 elections aggregating data from 15+ public databases using generative AI",
      "Designed the FastAPI backend with PostgreSQL, containerized with Docker; adopted by 13 political parties for candidate vetting",
    ],
  },
]

const education = [
  {
    institution: "Universidad Católica San Pablo (UCSP)",
    degree: "Bachelor of Science in Computer Science",
    location: "Arequipa, Peru",
    period: "2019 — 2024",
    logo: "/images/logos/ucsp-icon.png",
    logoW: 44,
    logoH: 44,
  },
  {
    institution: "Colegio de Alto Rendimiento (COAR)",
    degree: "International Baccalaureate (IB) Diploma",
    location: "Arequipa, Peru",
    period: "2016 — 2019",
    logo: "/images/logos/coar.png",
    logoW: 44,
    logoH: 44,
  },
]

const topLangs = [
  { name: "Python",           repos: 20, color: "#3776AB" },
  { name: "C++",              repos: 20, color: "#00599C" },
  { name: "Jupyter Notebook", repos: 7,  color: "#DA5B0B" },
  { name: "TypeScript",       repos: 4,  color: "#3178C6" },
  { name: "JavaScript",       repos: 4,  color: "#F7DF1E" },
  { name: "PLpgSQL",          repos: 1,  color: "#4169E1" },
]
const maxRepos = Math.max(...topLangs.map((l) => l.repos))

const githubStats = [
  { label: "Public repos",   value: "47" },
  { label: "Followers",      value: "8" },
  { label: "On GitHub since", value: "2020" },
  { label: "Contributions",  value: "Active" },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.normal, ease: EASING, delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.fast, ease: EASING }}
      className="mb-12"
    >
      <p className="text-xs text-[#555555] tracking-[0.2em] uppercase mb-3">{label}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
    </motion.div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-28">

        {/* Stats */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0d0d0d] px-4 py-6 md:px-8 md:py-8 group hover:bg-[#111111] transition-colors">
                <span className="text-4xl md:text-5xl font-bold text-white tracking-tight block mb-1">
                  {s.value}
                </span>
                <span className="text-xs text-[#555555] uppercase tracking-[0.15em]">{s.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Experience timeline */}
        <div>
          <SectionHeader label="Experience" title="Where I've worked" />

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden md:block" />

            <div className="space-y-14">
              {experience.map((job, i) => (
                <FadeIn key={job.company} delay={i * STAGGER.item}>
                  <div className="md:pl-10 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: DURATION.fast, delay: i * STAGGER.item, ease: EASING }}
                      className={`absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-[3px] hidden md:block ${job.current ? "bg-white" : "bg-white/30"}`}
                    />
                    {job.current && (
                      <div className="absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-[3px] hidden md:block animate-ping bg-white/20" />
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-white font-semibold text-base">{job.role}</h3>
                          <span className="text-[10px] border border-white/10 text-[#666666] px-2 py-0.5 rounded-full tracking-widest uppercase">
                            {job.type}
                          </span>
                          {job.current && (
                            <span className="text-[10px] text-[#888888] px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[#555555] text-sm">{job.company} · {job.location}</p>
                      </div>
                      <span className="text-xs text-[#444444] shrink-0 font-mono">{job.period}</span>
                    </div>

                    <ul className="space-y-2.5">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-sm text-[#777777] leading-relaxed">
                          <span className="text-[#2a2a2a] shrink-0 mt-1.5 text-xs">▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Education + GitHub */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">

          {/* Education */}
          <div>
            <SectionHeader label="Education" title="Background" />
            <div className="space-y-4">
              {education.map((edu, i) => (
                <FadeIn key={edu.institution} delay={i * STAGGER.item}>
                  <div className="p-5 bg-[#0d0d0d] border border-white/5 rounded-xl hover:border-white/10 transition-colors group relative overflow-hidden">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium group-hover:text-white/90 transition-colors">
                          {edu.institution}
                        </p>
                        <p className="text-[#555555] text-xs mt-1">{edu.degree}</p>
                        <p className="text-[#333333] text-xs mt-0.5">{edu.location}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs text-[#444444] font-mono">{edu.period}</span>
                        <div className="opacity-25 grayscale group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-300">
                          <Image
                            src={edu.logo}
                            alt={edu.institution}
                            width={edu.logoW}
                            height={edu.logoH}
                            unoptimized
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* GitHub activity */}
          <div>
            <SectionHeader label="GitHub" title="Activity" />
            <FadeIn delay={STAGGER.item}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {githubStats.map((s) => (
                    <div key={s.label} className="p-4 bg-[#0d0d0d] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                      <p className="text-white font-semibold text-lg">{s.value}</p>
                      <p className="text-[#444444] text-xs mt-0.5 tracking-wide">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-[#0d0d0d] border border-white/5 rounded-xl">
                  <p className="text-xs text-[#444444] uppercase tracking-[0.15em] mb-4">Top Languages</p>
                  <div className="space-y-3">
                    {topLangs.map((lang, i) => (
                      <motion.div
                        key={lang.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * STAGGER.language, ease: EASING }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-xs text-[#666666] w-20 sm:w-32 shrink-0">{lang.name}</span>
                        <div className="flex-1 h-px bg-white/5 relative">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: DURATION.normal, delay: i * STAGGER.language + 0.1, ease: EASING }}
                            style={{
                              backgroundColor: lang.color,
                              width: `${(lang.repos / maxRepos) * 100}%`,
                              transformOrigin: "left",
                            }}
                            className="h-px absolute inset-0"
                          />
                        </div>
                        <span className="text-[10px] text-[#333333] w-6 text-right shrink-0">{lang.repos}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <a
                  href="https://github.com/RayverAimar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/5 rounded-xl text-xs text-[#555555] hover:text-white hover:border-white/15 transition-all focus-visible:outline-none focus-visible:border-white/30"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View GitHub Profile
                </a>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  )
}
