import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { IntroSection } from '../components/home/IntroSection';
import { AboutSection } from '../components/home/AboutSection';
import { SkillsSection } from '../components/home/SkillsSection';
import { HorizontalShowcase } from '../components/home/HorizontalShowcase';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { DamayantiCrestSection } from '../components/home/DamayantiCrestSection';
import { AchievementsSection } from '../components/home/AchievementsSection';
import { ResumeSection } from '../components/home/ResumeSection';
import { ContactSection } from '../components/home/ContactSection';

interface HomeProps {
  isResumeModalOpen?: boolean;
  onCloseResumeModal?: () => void;
  onOpenResumeModal?: () => void;
}

export const Home: React.FC<HomeProps> = ({
  isResumeModalOpen,
  onCloseResumeModal,
  onOpenResumeModal
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full overflow-hidden">
      {/* 1. Full Screen Editorial Hero */}
      <HeroSection
        onExploreClick={() => scrollTo('projects')}
        onAboutClick={() => scrollTo('about')}
      />

      {/* 2. Manifesto / Personal Statement */}
      <IntroSection />

      {/* 3. About Me / Asymmetric Editorial */}
      <AboutSection />

      {/* 4. Skills & Technologies */}
      <SkillsSection />

      {/* 5. Horizontal Scroll Showcase (Desktop & Responsive) */}
      <HorizontalShowcase />

      {/* 6. Full Projects Grid (Category A & Category B) */}
      <ProjectsSection />

      {/* 7. Experience & Collaborations Timeline */}
      <ExperienceSection />

      {/* 8. Damayanti Crest Feature Section */}
      <DamayantiCrestSection />

      {/* 9. Verified Achievements & Activities */}
      <AchievementsSection />

      {/* 10. Technical Resume & Modal */}
      <ResumeSection
        isModalOpen={isResumeModalOpen}
        onCloseModal={onCloseResumeModal}
        onOpenModal={onOpenResumeModal}
      />

      {/* 11. Memorable Contact Section */}
      <ContactSection />
    </main>
  );
};
