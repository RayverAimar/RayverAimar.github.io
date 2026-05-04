export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808]">
      <div className="text-center">
        <p className="text-[#1a1a1a] text-[10rem] font-bold tracking-tight leading-none mb-4 select-none">
          404
        </p>
        <p className="text-[#555555] text-sm mb-8">Page not found</p>
        <a
          href="/"
          className="text-sm text-white border border-white/20 px-5 py-2.5 rounded hover:border-white/50 hover:bg-white/5 transition-all"
        >
          Back home
        </a>
      </div>
    </div>
  )
}
