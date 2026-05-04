export const EASING: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export const DURATION = {
  fast:   0.3,
  normal: 0.6,
  slow:   0.8,
} as const

export const STAGGER = {
  item:     0.1,
  language: 0.06,
} as const

export const SECTION_IDS = ["hero", "experience", "projects", "uses", "contact"] as const
export type SectionId = (typeof SECTION_IDS)[number]

export const SECTION_LABELS: Record<SectionId, string> = {
  hero:       "Home",
  experience: "Experience",
  projects:   "Projects",
  uses:       "Uses",
  contact:    "Contact",
}

export const MACOS_DOTS = {
  close:    "#ff5f57",
  minimize: "#ffbd2e",
  maximize: "#28c840",
} as const
