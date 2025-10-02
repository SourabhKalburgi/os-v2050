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
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let activeEntry = null;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeEntry = entry;
          }
        });
        
        if (activeEntry) {
          const id = activeEntry.target.getAttribute('data-section-id');
          if (id) setCurrentSection(id);
        }
      },
      { 
        root: null, 
        rootMargin: '-20% 0px -20% 0px', 
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1] 
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Fallback: Set initial section based on scroll position after a short delay
    const fallbackTimer = setTimeout(() => {
      const scrollY = window.scrollY;
      const sections = Object.entries(sectionRefs);
      
      for (const [key, ref] of sections) {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementBottom = elementTop + rect.height;
          
          if (scrollY >= elementTop - 200 && scrollY < elementBottom - 200) {
            setCurrentSection(key);
            break;
          }
        }
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
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
      const scrollY = window.scrollY || window.pageYOffset;
      const shouldDock = scrollY > trigger;
      setDockMode(shouldDock);
      
      // Additional scroll-based section detection for mobile reliability
      if (shouldDock) {
        const sections = Object.entries(sectionRefs);
        let closestSection = 'about';
        let minDistance = Infinity;
        
        sections.forEach(([key, ref]) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = Math.abs(center - viewportCenter);
            
            if (distance < minDistance && rect.top < viewportCenter && rect.bottom > 0) {
              minDistance = distance;
              closestSection = key;
            }
          }
        });
        
        // Only update if we found a valid section and it's different from current
        if (closestSection !== currentSection) {
          setCurrentSection(closestSection);
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionRefs, currentSection]);

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <MatrixRain />
      
      <div className="relative z-40 min-h-screen w-full px-2 py-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <header className="sticky top-0 z-30 mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 md:p-6 rounded border border-primary/30 bg-card/40 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md animate-fadeInUp w-full overflow-hidden">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary text-glow mb-2 font-mono leading-tight break-words">
              {'>'} SOURABH K
            </h1>
            <p className="text-terminal-cyan font-mono text-[10px] sm:text-xs md:text-sm lg:text-base break-words">
              v2050.3 // Full-Stack Developer // Software Engineer
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full">
            {/* Terminal Section */}
            <div className={`order-2 lg:order-1 transition-all duration-300 w-full ${dockMode ? 'lg:col-span-0' : 'lg:col-span-1'}`}>
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
            <div className={`order-1 lg:order-2 animate-fadeInUp transition-all duration-300 w-full min-w-0 ${dockMode ? 'lg:col-span-3' : 'lg:col-span-2'}`} style={{ animationDelay: '0.2s' }}>
              <div ref={sectionRefs.about} data-section-id="about" className="panel-glass rounded border border-primary/30 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 will-change-transform w-full overflow-hidden" data-parallax-speed="0.04">
                <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-primary mb-3 break-words">/root/about-me.sys</h2>
                <AboutSection />
              </div>

              <div ref={sectionRefs.projects} data-section-id="projects" className="panel-glass rounded border border-primary/30 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 will-change-transform w-full overflow-hidden" data-parallax-speed="0.035">
                <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-terminal-cyan mb-3 break-words">/root/projects.exe</h2>
                <ProjectsSection />
              </div>

              <div ref={sectionRefs.skills} data-section-id="skills" className="panel-glass rounded border border-primary/30 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 will-change-transform w-full overflow-hidden" data-parallax-speed="0.03">
                <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-terminal-purple mb-3 break-words">/root/skills.log</h2>
                <SkillsSection />
              </div>

              <div ref={sectionRefs.achievements} data-section-id="achievements" className="panel-glass rounded border border-primary/30 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 will-change-transform w-full overflow-hidden" data-parallax-speed="0.028">
                <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-terminal-pink mb-3 break-words">/root/achievements.dat</h2>
                <AchievementsSection />
              </div>

              <div ref={sectionRefs.contact} data-section-id="contact" className="panel-glass rounded border border-primary/30 p-3 sm:p-4 md:p-6 mb-2 sm:mb-24 will-change-transform w-full overflow-hidden" data-parallax-speed="0.025">
                <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-primary mb-3 break-words">/root/contact.net</h2>
                <ContactSection />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 sm:mt-12 text-center text-muted-foreground font-mono text-[10px] sm:text-xs animate-fadeInUp pb-4" style={{ animationDelay: '0.3s' }}>
            <p>© 2050 TERMINAL_OS // All Systems Operational</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
