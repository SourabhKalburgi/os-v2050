import { useState } from 'react';
import MatrixRain from '@/components/MatrixRain';
import BootSequence from '@/components/BootSequence';
import Terminal from '@/components/Terminal';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [currentSection, setCurrentSection] = useState('about');

  const renderSection = () => {
    switch (currentSection) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <MatrixRain />
      
      <div className="relative z-10 min-h-screen w-full p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8 panel-glass p-6 rounded border border-primary/30 animate-fadeInUp">
            <h1 className="text-3xl md:text-5xl font-bold text-primary text-glow mb-2 font-mono">
              {'>'} TERMINAL_OS
            </h1>
            <p className="text-terminal-cyan font-mono text-sm md:text-base">
              v2050.3 // Full-Stack Developer // Digital Architect
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Terminal Section */}
            <div className="lg:col-span-1">
              <div className="panel-glass rounded border border-primary/30 overflow-hidden sticky top-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <Terminal onNavigate={setCurrentSection} currentSection={currentSection} />
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              {renderSection()}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-muted-foreground font-mono text-xs animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <p>© 2050 TERMINAL_OS // All Systems Operational</p>
            <p className="mt-1 text-terminal-cyan">Built with React + Tailwind + ❤️</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
