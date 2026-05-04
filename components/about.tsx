"use client"

import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { personalInfo, techStack } from "@/lib/data"

const stackCategories = [
  { label: "Backend", items: techStack.backend },
  { label: "Frontend", items: techStack.frontend },
  { label: "Systems", items: techStack.systems },
  { label: "AI / ML", items: techStack.ai },
  { label: "Infra", items: techStack.infra },
]

interface AboutSheetProps {
  open: boolean
  onClose: () => void
}

export function AboutSheet({ open, onClose }: AboutSheetProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl bg-[#0d0d0d] border-l border-white/10 text-white overflow-y-auto"
      >
        <SheetHeader className="mb-8">
          <SheetTitle className="text-xs text-[#888888] tracking-widest uppercase font-normal">
            About
          </SheetTitle>
        </SheetHeader>

        {/* Avatar + name */}
        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/5">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
            <Image
              src="/images/avatar.png"
              alt={personalInfo.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
          <div>
            <p className="text-white font-semibold">{personalInfo.name}</p>
            <p className="text-[#888888] text-sm">{personalInfo.title}</p>
            <p className="text-[#555555] text-xs mt-0.5">{personalInfo.location}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-4 mb-10">
          <p className="text-[#cccccc] leading-relaxed">
            I&apos;m a fullstack engineer focused on building reliable backend systems for
            compliance-heavy industries. At{" "}
            <span className="text-white">Canaria</span>, I work on the KYC/AML platform that helps
            compliance teams manage wallet screening, adverse media monitoring, and sanctions
            watchlists at scale.
          </p>
          <p className="text-[#888888] leading-relaxed">
            Outside work, I explore the edges of what software can do — from writing compilers and
            OpenGL renderers to building MCP-powered code intelligence tools. I study Computer
            Science at UCSP and care deeply about correctness, performance, and systems that
            don&apos;t quietly lie to you.
          </p>
          <p className="text-[#888888] leading-relaxed">
            When I&apos;m not in the backend, I&apos;m building tools that reduce the friction
            between developers and the systems they build — desktop apps for tax compliance, AI
            agents that understand codebases, electoral platforms that actually inform citizens.
          </p>
        </div>

        {/* Tech stack */}
        <div className="space-y-4">
          <p className="text-xs text-[#555555] tracking-widest uppercase">Tech Stack</p>
          {stackCategories.map((cat) => (
            <div key={cat.label} className="flex flex-wrap items-baseline gap-3">
              <span className="text-xs text-[#555555] tracking-widest uppercase w-16 shrink-0">
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-[#111111] border border-white/10 text-[#aaaaaa] px-2.5 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="mt-10 pt-8 border-t border-white/5 flex gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-sm text-[#666666] hover:text-white transition-colors"
          >
            {personalInfo.email}
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#666666] hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#666666] hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}
