import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Uses } from "@/components/uses"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { SectionNav } from "@/components/section-nav"
import { StarField } from "@/components/starfield"

export default function Home() {
  return (
    <>
      <StarField />
      <Navigation />
      <SectionNav />
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Uses />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
