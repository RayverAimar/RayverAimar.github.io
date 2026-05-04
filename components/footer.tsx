import { personalInfo } from "@/lib/data"

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#444444]">
          <span>© 2026 Rayver Muñoz Curi</span>
          <div className="flex items-center gap-4">
            <span>Built with Next.js</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#888888] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
