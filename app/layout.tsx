import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const BASE_URL = "https://rayveraimar.github.io"
const TITLE = "Rayver Muñoz Curi — Fullstack Engineer"
const DESCRIPTION =
  "Computer Science graduate building scalable systems, KYC/AML platforms, and tools that matter. Django, React, Rust, and everything in between."

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: BASE_URL,
    siteName: "Rayver Muñoz Curi",
    locale: "en_US",
    images: [{ url: "/images/og.png", width: 1200, height: 630, alt: "Rayver Muñoz Curi — Fullstack Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og.png"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#080808] text-[#fafafa]">{children}</body>
    </html>
  )
}
