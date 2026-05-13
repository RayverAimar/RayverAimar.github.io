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

export type ProjectCategory = "Products" | "Academic" | "Tools" | "Civic"

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  problem: string
  tech: string[]
  github: string | null
  deploy: string | null
  images: string[]
  imagePosition: "top" | "center"
  isPrivate: boolean
  category: ProjectCategory
  featured?: boolean
}

export const projects: Project[] = [
  // ============ Products / Full-stack apps ============
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
    images: [
      "/images/projects/elections/01-main.png",
      "/images/projects/elections/02-candidates.png",
    ],
    imagePosition: "top",
    isPrivate: false,
    category: "Civic",
    featured: true,
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
    images: ["/images/projects/kuchi-store/01-main.png"],
    imagePosition: "top",
    isPrivate: true,
    category: "Products",
    featured: true,
  },
  {
    id: "cuadrante",
    title: "Cuadrante",
    subtitle: "Monthly Shift Roster with Per-User Privacy",
    description:
      "Internal scheduling tool that replaces Excel for monthly shift planning. Sticky scrollable grid, real-time rule validation, auto-fill respecting constraints, undo/redo with persistent audit log, and PDF/Excel exports. Per-user data isolation via Postgres RLS.",
    problem: "Admins waste hours each month painting Excel cells, missing rule violations (rest after night, max consecutive days), and emailing PDFs to staff.",
    tech: ["React 18", "TypeScript", "Vite", "Zustand", "Supabase", "PostgreSQL", "RLS"],
    github: "https://github.com/RayverAimar/cuadrante",
    deploy: "https://rayveraimar.github.io/cuadrante/",
    images: [
      "/images/projects/cuadrante/01-main.png",
      "/images/projects/cuadrante/02-landing.png",
    ],
    imagePosition: "top",
    isPrivate: false,
    category: "Products",
    featured: true,
  },
  {
    id: "tax-books-manager",
    title: "Tax Books Manager",
    subtitle: "SUNAT Electronic Tax Books Desktop App",
    description:
      "Cross-platform desktop application for managing electronic accounting books required by SUNAT (Peru's tax authority). Multi-company, multi-period with CSV/ZIP import, PDF/Excel export, and offline-first SQLite storage.",
    problem: "Peruvian businesses need to submit electronic tax books monthly to SUNAT — a painful, error-prone manual process.",
    tech: ["Tauri v2", "Rust", "React 19", "TypeScript", "SQLite", "Shadcn/ui"],
    github: "https://github.com/RayverAimar/tax-books-manager",
    deploy: null,
    images: [
      "/images/projects/tax-books-manager/03-dashboard.png",
      "/images/projects/tax-books-manager/04-sales.png",
      "/images/projects/tax-books-manager/01-onboarding.png",
      "/images/projects/tax-books-manager/02-company.png",
    ],
    imagePosition: "top",
    isPrivate: false,
    category: "Products",
    featured: true,
  },

  // ============ Tools ============
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
    images: ["/images/projects/pyxus/01-main.png"],
    imagePosition: "center",
    isPrivate: false,
    category: "Tools",
    featured: true,
  },
  {
    id: "codeforces-analytics",
    title: "Codeforces Analytics",
    subtitle: "Profile Analytics Dashboard",
    description:
      "Frontend-only analytics dashboard for any Codeforces handle. Rating history with rank zones, submission heatmap with streaks, skills radar, difficulty distribution, activity patterns, and contest performance. All data fetched live from the Codeforces public API — no backend.",
    problem: "Codeforces' native profile only exposes basic stats. Competitive programmers need deeper views of their patterns, weak areas, and progress.",
    tech: ["React 19", "TypeScript", "Vite", "Tailwind", "ECharts"],
    github: "https://github.com/RayverAimar/codeforces-analytics",
    deploy: "https://rayveraimar.github.io/codeforces-analytics/",
    images: [
      "/images/projects/codeforces-analytics/01-home.png",
      "/images/projects/codeforces-analytics/02-profile.png",
      "/images/projects/codeforces-analytics/03-charts.png",
      "/images/projects/codeforces-analytics/04-activity.png",
    ],
    imagePosition: "top",
    isPrivate: false,
    category: "Tools",
  },
  {
    id: "otorongo-scraper",
    title: "Otorongo Scraper",
    subtitle: "Peruvian Election Candidate Profiles",
    description:
      "Scrapy spider that extracts candidate profiles from otorongo.club for the 2026 Peruvian general elections — criminal backgrounds, education, work history, party history. Rotates browser headers via ScrapeOps, deduplicates requests, and exports a clean JSON dataset.",
    problem: "Election-relevant data (records, sanctions, history) lives in HTML pages. Researchers and journalists need it as structured data to cross-reference and analyze.",
    tech: ["Python 3.10+", "Scrapy 2.x", "ScrapeOps", "python-dotenv"],
    github: "https://github.com/RayverAimar/otorongo-scraper",
    deploy: null,
    images: ["/images/projects/otorongo-scraper/01-run.png"],
    imagePosition: "center",
    isPrivate: false,
    category: "Tools",
  },

  // ============ Academic / Coursework ============
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
    images: [
      "/images/projects/rubiks/00-hero.gif",
      "/images/projects/rubiks/01-main.png",
      "/images/projects/rubiks/02-menu.png",
      "/images/projects/rubiks/03-hyper.png",
    ],
    imagePosition: "center",
    isPrivate: false,
    category: "Academic",
    featured: true,
  },
  {
    id: "k-means-cpp",
    title: "K-Means Clustering (C++)",
    subtitle: "From-scratch clustering in C++17 — no deps",
    description:
      "Dataset-agnostic K-Means implementation in C++17 with zero external dependencies. Ships with Iris and Wine demos, a scaling benchmark up to 1M points, and Python visualization scripts. Sister Python NumPy implementation included.",
    problem: "Black-box clustering libraries hide what's actually happening. Building K-Means from scratch makes the assign/update loop, convergence checks, and complexity tradeoffs concrete.",
    tech: ["C++17", "Python", "NumPy", "Matplotlib"],
    github: "https://github.com/RayverAimar/k-means-cpp",
    deploy: null,
    images: [
      "/images/projects/k-means-cpp/01-iris.png",
      "/images/projects/k-means-cpp/02-wine.png",
      "/images/projects/k-means-cpp/03-benchmark.png",
      "/images/projects/k-means-cpp/04-python-demo.png",
    ],
    imagePosition: "center",
    isPrivate: false,
    category: "Academic",
  },
  {
    id: "bioinformatics-algorithms",
    title: "Bioinformatics Algorithms",
    subtitle: "Sequence Alignment in C++ — NW, SW, MSA",
    description:
      "Implementations of classic sequence alignment algorithms in C++ for CB302 Molecular Biology: Needleman-Wunsch (global), Smith-Waterman (local), and Star Alignment (MSA). Includes dot-plot visualization over real ~1080bp NCBI sequences (Bacteria, SARS-CoV-2, Influenza).",
    problem: "Comparing biological sequences end-to-end vs. finding conserved sub-regions requires fundamentally different algorithms. The dot plots reveal where the alignments succeed and fail.",
    tech: ["C++17", "Python", "Matplotlib"],
    github: "https://github.com/RayverAimar/bioinformatics-algorithms",
    deploy: null,
    images: [
      "/images/projects/bioinformatics/01-sars-self.jpg",
      "/images/projects/bioinformatics/02-bacteria-sars.jpg",
      "/images/projects/bioinformatics/03-sars-influenza.jpg",
      "/images/projects/bioinformatics/04-influenza-self.jpg",
    ],
    imagePosition: "center",
    isPrivate: false,
    category: "Academic",
    featured: true,
  },
  {
    id: "secondary-structure-rna",
    title: "RNA Secondary Structure",
    subtitle: "Nussinov DP fold predictor in C++",
    description:
      "From-scratch implementation of the Nussinov algorithm for predicting RNA secondary structure. Given an RNA sequence, it finds the folding with the maximum number of Watson-Crick and wobble base pairs using dynamic programming, then recovers the structure via recursive traceback.",
    problem: "Determining how an RNA strand folds onto itself is foundational to understanding its biological function. Nussinov is the canonical first step.",
    tech: ["C++17", "Dynamic Programming"],
    github: "https://github.com/RayverAimar/secondary-structure-RNA",
    deploy: null,
    images: ["/images/projects/secondary-structure-rna/01-fold.png"],
    imagePosition: "center",
    isPrivate: false,
    category: "Academic",
  },
  {
    id: "tsp-genetic",
    title: "TSP Genetic Algorithm",
    subtitle: "Hamiltonian tours over 26 cities in C++",
    description:
      "Genetic algorithm in C++ that approximates a low-cost Hamiltonian tour over 26 cities (Travelling Salesman Problem). Selection, single-point crossover, mutation, and elitism. Converges from ~2500 to ~1190 path length in 10k generations — a ~53% reduction.",
    problem: "Exact TSP is NP-hard. Genetic algorithms approximate near-optimal tours by mimicking biological evolution — selection, crossover, mutation, elitism.",
    tech: ["C++17", "Python", "Matplotlib", "NetworkX"],
    github: "https://github.com/RayverAimar/TSP-genetic-algorithm",
    deploy: null,
    images: [
      "/images/projects/tsp-genetic/02-best-path.png",
      "/images/projects/tsp-genetic/01-full-graph.png",
      "/images/projects/tsp-genetic/03-fitness.png",
    ],
    imagePosition: "center",
    isPrivate: false,
    category: "Academic",
  },
  {
    id: "neural-network",
    title: "Neural Network from Scratch",
    subtitle: "Feedforward NN in pure NumPy",
    description:
      "A fully-connected neural network built without any ML framework — just NumPy. He init, ReLU hidden layers, sigmoid/linear output, BCE/MSE loss, backpropagation, gradient descent. Trained on Breast Cancer Wisconsin: 96.49% test accuracy, 0.97 F1.",
    problem: "ML frameworks hide the math. Implementing forward + backward pass by hand makes gradient descent, weight initialization, and overfitting visible.",
    tech: ["Python", "NumPy", "Matplotlib", "scikit-learn"],
    github: "https://github.com/RayverAimar/neural-network",
    deploy: null,
    images: ["/images/projects/neural-network/01-training.png"],
    imagePosition: "center",
    isPrivate: false,
    category: "Academic",
  },
  {
    id: "network-protocols",
    title: "Network Protocols",
    subtitle: "Multi-client TCP chat server in C++17",
    description:
      "Multi-threaded TCP chat server with a custom binary protocol. Supports nickname changes, direct messages, broadcast, list users, file transfer, and embedded TicTacToe games between connected clients. POSIX sockets, one thread per client.",
    problem: "Building a protocol from scratch reveals the gritty details: framing, length-prefixed payloads, concurrent client state, blocking vs non-blocking I/O.",
    tech: ["C++17", "POSIX Sockets", "pthread"],
    github: "https://github.com/RayverAimar/Network-protocols",
    deploy: null,
    images: ["/images/projects/network-protocols/01-chat.png"],
    imagePosition: "center",
    isPrivate: false,
    category: "Academic",
  },
  {
    id: "adversarial-search",
    title: "Adversarial Search",
    subtitle: "N×N Tic-Tac-Toe with Minimax + α-β pruning",
    description:
      "Configurable N×N Tic-Tac-Toe with a Minimax AI and Alpha-Beta pruning. Polished single-window Tk GUI with a live evaluation-tree inspector — click any candidate node to see the resulting board, score, and line-by-line heuristic breakdown. 7-18× speedup over naive minimax.",
    problem: "Naive minimax explodes combinatorially. Alpha-beta pruning + a transparent heuristic make adversarial search tractable and explainable.",
    tech: ["Python", "Tkinter", "Minimax", "α-β pruning"],
    github: "https://github.com/RayverAimar/Adversarial-search",
    deploy: null,
    images: [
      "/images/projects/adversarial-search/01-game.png",
      "/images/projects/adversarial-search/02-config.png",
      "/images/projects/adversarial-search/03-gameover.png",
      "/images/projects/adversarial-search/04-benchmark.png",
    ],
    imagePosition: "top",
    isPrivate: false,
    category: "Academic",
    featured: true,
  },
]

export const projectCategories: ("All" | ProjectCategory)[] = ["All", "Products", "Tools", "Academic", "Civic"]
