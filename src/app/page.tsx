import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <section id="home" className="section">
        <Hero
          title="İhsan Yiğit Önay"
          subtitle="Software Engineer"
          cta={{ label: "Projelerime Git", href: "/#projects" }}
          avatarSrc="/iyo.jpg"
        />
      </section>

      <main className="mx-auto max-w-6xl px-4 md:px-6">
        <section id="about" className="section">
          <AboutSection />
        </section>
        <section id="skills" className="section">
          <SkillsSection />
        </section>
        <section id="experience" className="section">
          <ExperienceSection />
        </section>
        <section id="projects" className="section">
          <ProjectsSection />
        </section>
        <section id="contact" className="section">
          <ContactSection />
        </section>
      </main>
    </>
  );
}
