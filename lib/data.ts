export const personalInfo = {
  name: "Rayver Muñoz Curi",
  title: "Fullstack Engineer",
  tagline: "Backend engineer building systems that help compliance teams sleep at night.",
  subTagline: "Django × KYC/AML by day · Compilers × MCP by night.",
  location: "Arequipa, Perú",
  company: "Canaria",
  university: "CS @ UCSP",
  email: "rayver.munoz@ucsp.edu.pe",
  linkedin: "https://www.linkedin.com/in/ray-emece",
  github: "https://github.com/RayverAimar",
  avatarUrl: "/images/avatar.jpg",
  cvUrl: "/cv.pdf",
}

export const techStack = {
  backend: ["Python", "Django", "DRF", "Celery", "PostgreSQL", "Redis", "FastAPI"],
  frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  systems: ["C++", "C", "CUDA", "OpenGL", "Rust"],
  ai: ["PyTorch", "scikit-learn", "NumPy", "pandas"],
  infra: ["Docker", "GCP", "GitHub Actions", "Linux"],
}

export const uses = {
  environment: [
    { name: "VS Code",        description: "Primary editor — extensions for Python, TypeScript, ESLint, and Tailwind IntelliSense" },
    { name: "macOS",          description: "Daily driver for everything. zsh + Oh My Zsh as shell" },
    { name: "Warp",            description: "Terminal with AI autocomplete and tmux for session management" },
    { name: "TablePlus",      description: "PostgreSQL GUI — faster than psql for exploring data" },
    { name: "Docker Desktop", description: "All dev deps (Postgres, Redis, workers) run in containers locally" },
  ],
  stack: [
    { name: "Python / Django",      description: "Primary language. Django for APIs, Celery for async jobs, DRF for serialization" },
    { name: "TypeScript / React",   description: "Frontend and fullstack. Next.js App Router, Tailwind, Framer Motion" },
    { name: "Rust",                 description: "Systems-level work: compilers, desktop apps (Tauri), performance-critical code" },
    { name: "PostgreSQL",           description: "Default database. pgvector for embeddings, always prefer Postgres over NoSQL" },
    { name: "C++ / OpenGL",         description: "Graphics, algorithms, and anything that needs raw performance" },
  ],
  tools: [
    { name: "Claude (Anthropic)",   description: "AI assistant and pair programmer. Used daily for design, review, and exploration" },
    { name: "GitHub Actions",       description: "CI/CD — lint, test, build, deploy. Everything automated from push" },
    { name: "Linear",               description: "Project and task management. Clean interface, keyboard-first" },
    { name: "Figma",                description: "Design and prototyping when I need to think in pixels before code" },
    { name: "Postman / Bruno",      description: "API development and testing. Bruno for version-controlled collections" },
  ],
}

export const projects = [
  {
    id: "elections-peru-2026",
    title: "Peru Elecciones 2026",
    subtitle: "Vote Compass & Political RAG Platform",
    description:
      "Electoral platform combining an adaptive quiz (vote compass), a RAG chatbot over government plans, news monitoring, and political event tracking for Peru's 2026 general elections.",
    problem: "Citizens had no easy way to match their values with candidates across 36 parties, or query actual government plans.",
    tech: ["FastAPI", "Astro", "Preact", "PostgreSQL", "pgvector", "Claude AI", "Tailwind"],
    github: "https://github.com/RayverAimar/elections-peru-2026",
    deploy: null,
    image: "/images/elections.png",
    imagePosition: "top" as const,
    isPrivate: false,
  },
  {
    id: "kuchi-store",
    title: "Kuchi Store",
    subtitle: "Korean-Styled E-Commerce Platform",
    description:
      "Modern full-stack e-commerce application for a Korean-styled store. Features product catalog, cart, user auth, order management, and admin dashboard.",
    problem: "Small Korean-styled retail business needed a custom e-commerce solution with full inventory and order management.",
    tech: ["Django", "DRF", "React 19", "TypeScript", "PostgreSQL", "GCP", "Cloudflare Pages"],
    github: null,
    deploy: "https://kuchi-store.com",
    image: "/images/kuchi-store.png",
    imagePosition: "top" as const,
    isPrivate: true,
  },
  {
    id: "pyxus",
    title: "Pyxus",
    subtitle: "Python Code Intelligence Engine via MCP",
    description:
      "Builds a knowledge graph of any Python codebase — every class, function, method call, import, and inheritance chain — and exposes it to AI agents via MCP. 100 files analyzed in ~1.2s.",
    problem: "AI agents read files one at a time and guess how code connects. Pyxus gives them a complete understanding instantly.",
    tech: ["Python", "MCP", "AST", "Graph Analysis"],
    github: "https://github.com/RayverAimar/pyxus",
    deploy: null,
    image: "/images/pyxus.png",
    imagePosition: "center" as const,
    isPrivate: false,
  },
  {
    id: "tax-books-manager",
    title: "Tax Books Manager",
    subtitle: "SUNAT Electronic Tax Books Desktop App",
    description:
      "Cross-platform desktop application for managing electronic accounting books required by SUNAT (Peru's tax authority). Multi-company, multi-period with CSV/ZIP import, PDF/Excel export, and offline-first SQLite storage.",
    problem: "Peruvian businesses need to submit electronic tax books monthly to SUNAT — a painful, error-prone manual process.",
    tech: ["Tauri v2", "Rust", "React 19", "TypeScript", "SQLite", "Shadcn/ui"],
    github: null,
    deploy: null,
    image: "/images/tax-books-manager.png",
    imagePosition: "top" as const,
    isPrivate: true,
  },
  {
    id: "CG-rubiks-cube-solver",
    title: "Rubik's Cube Solver",
    subtitle: "OpenGL Renderer + Kociemba Algorithm",
    description:
      "C++ Rubik's Cube renderer in OpenGL with a built-in implementation of Kociemba's two-phase algorithm. Features a HyperCube mode — 27 independent cubes that scramble, solve, and reassemble as a cluster.",
    problem: "Academic project exploring 3D graphics rendering and combinatorial solving algorithms from scratch.",
    tech: ["C++17", "OpenGL 3.3", "ImGui", "CMake", "Kociemba Algorithm"],
    github: "https://github.com/RayverAimar/CG-rubiks-cube-solver",
    deploy: null,
    image: "/images/rubiks.gif",
    imagePosition: "center" as const,
    isPrivate: false,
  },
  {
    id: "yarl",
    title: "YARL",
    subtitle: "Yet Another Regular Language Compiler",
    description:
      "From-scratch compiler for a ChocoPy-flavored subset of Python: full lexer, parser with panic-mode error recovery, and AST visualization with Graphviz.",
    problem: "University compiler construction project — understanding every stage of language processing from tokenization to AST generation.",
    tech: ["Python", "Graphviz", "Compiler Design", "AST"],
    github: "https://github.com/RayverAimar/yarl",
    deploy: null,
    image: "/images/yarl.png",
    imagePosition: "center" as const,
    isPrivate: false,
  },
]
