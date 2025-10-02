import { useEffect, useMemo, useRef, useState } from 'react';
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
  const [dockMode, setDockMode] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(() => ({
    about: aboutRef,
    projects: projectsRef,
    skills: skillsRef,
    achievements: achievementsRef,
    contact: contactRef,
  }), []);

  const handleNavigate = (section: string) => {
    const key = section as keyof typeof sectionRefs;
    const node = sectionRefs[key]?.current;
    if (node) {
      const y = node.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) setCurrentSection(id);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  useEffect(() => {
    const parallaxNodes = Array.from(document.querySelectorAll('[data-parallax-speed]')) as HTMLElement[];
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      parallaxNodes.forEach((el) => {
        const speedAttr = el.getAttribute('data-parallax-speed');
        const speed = speedAttr ? parseFloat(speedAttr) : 0;
        if (!Number.isNaN(speed)) {
          if (viewportWidth < 768) {
            el.style.transform = '';
          } else {
            const maxOffset = 48; // clamp to avoid overlap
            const raw = scrollY * speed;
            const clamped = Math.max(-maxOffset, Math.min(maxOffset, raw));
            el.style.transform = `translateY(${clamped}px)`;
          }
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const trigger = 120; // px from top before collapsing to dock
      const shouldDock = (window.scrollY || window.pageYOffset) > trigger;
      setDockMode(shouldDock);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-visible">
      <MatrixRain />
      
      <div className="relative z-40 min-h-screen w-full p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="sticky top-0 z-30 mb-6 sm:mb-8 p-4 sm:p-6 rounded border border-primary/30 bg-card/40 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md animate-fadeInUp">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-glow mb-2 font-mono leading-tight">
              {'>'} SOURABH K
            </h1>
            <p className="text-terminal-cyan font-mono text-xs sm:text-sm md:text-base">
              v2050.3 // Full-Stack Developer // Software Engineer
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Terminal Section */}
            <div className={`order-2 lg:order-1 transition-all duration-300 ${dockMode ? 'lg:col-span-0' : 'lg:col-span-1'}`}>
              <div className={`animate-fadeInUp ${dockMode ? 'lg:sticky lg:top-8' : ''}`} style={{ animationDelay: '0.1s' }}>
                {dockMode ? (
                  <>
                    {/* Mobile: bottom horizontal dock */}
                    <div className="lg:hidden fixed left-1/2 -translate-x-1/2 bottom-3 z-40">
                      <Terminal onNavigate={handleNavigate} currentSection={currentSection} variant="dock" />
                    </div>
                    {/* Desktop: left vertical dock */}
                    <div className="hidden lg:flex fixed left-2 sm:left-3 lg:left-6 top-[72px] lg:top-24 z-40">
                      <Terminal onNavigate={handleNavigate} currentSection={currentSection} variant="dock" />
                    </div>
                  </>
                ) : (
                  <div className="panel-glass rounded border border-primary/30 overflow-hidden lg:sticky lg:top-8">
                    <Terminal onNavigate={handleNavigate} currentSection={currentSection} />
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className={`order-1 lg:order-2 animate-fadeInUp transition-all duration-300 ${dockMode ? 'lg:col-span-3' : 'lg:col-span-2'}`} style={{ animationDelay: '0.2s' }}>
              <div ref={sectionRefs.about} data-section-id="about" className="panel-glass rounded border border-primary/30 p-4 sm:p-6 mb-6 sm:mb-8 will-change-transform" data-parallax-speed="0.04">
                <h2 className="text-xl sm:text-2xl font-mono text-primary mb-3">/root/about-me.sys</h2>
                <AboutSection />
              </div>

              <div ref={sectionRefs.projects} data-section-id="projects" className="panel-glass rounded border border-primary/30 p-4 sm:p-6 mb-6 sm:mb-8 will-change-transform" data-parallax-speed="0.035">
                <h2 className="text-xl sm:text-2xl font-mono text-terminal-cyan mb-3">/root/projects.exe</h2>
                <ProjectsSection />
              </div>

              <div ref={sectionRefs.skills} data-section-id="skills" className="panel-glass rounded border border-primary/30 p-4 sm:p-6 mb-6 sm:mb-8 will-change-transform" data-parallax-speed="0.03">
                <h2 className="text-xl sm:text-2xl font-mono text-terminal-purple mb-3">/root/skills.log</h2>
                <SkillsSection />
              </div>

              <div ref={sectionRefs.achievements} data-section-id="achievements" className="panel-glass rounded border border-primary/30 p-4 sm:p-6 mb-6 sm:mb-8 will-change-transform" data-parallax-speed="0.028">
                <h2 className="text-xl sm:text-2xl font-mono text-terminal-pink mb-3">/root/achievements.dat</h2>
                <AchievementsSection />
              </div>

              <div ref={sectionRefs.contact} data-section-id="contact" className="panel-glass rounded border border-primary/30 p-4 sm:p-6 mb-2 sm:mb-24 will-change-transform" data-parallax-speed="0.025">
                <h2 className="text-xl sm:text-2xl font-mono text-primary mb-3">/root/contact.net</h2>
                <ContactSection />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 sm:mt-12 text-center text-muted-foreground font-mono text-[10px] sm:text-xs animate-fadeInUp pb-4" style={{ animationDelay: '0.3s' }}>
            <p>© 2050 TERMINAL_OS // All Systems Operational</p>
            <p className="mt-1 text-terminal-cyan">Built with React + Tailwind + ❤️</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
