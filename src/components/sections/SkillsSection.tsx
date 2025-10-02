const SkillsSection = () => {
  const skillCategories = [
    {
      category: 'FRONTEND',
      color: 'text-primary',
      skills: [
        { name: 'React.js' },
        { name: 'Next.js' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'Three.js / WebGL' },
        { name: 'Tailwind CSS' },
        { name: 'Framer Motion' },
        { name: 'Redux' }
      ],
    },
    {
      category: 'BACKEND',
      color: 'text-terminal-cyan',
      skills: [
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'Python' },
        { name: 'MongoDB' },
        { name: 'PostgreSQL' },
        { name: 'GraphQL' },
        { name: 'APIs' },
        { name: 'Docker' },
        { name: 'AWS' },
        { name: 'Microservices' },
      ],
    },
    {
      category: 'CREATIVE_MODULES',
      color: 'text-terminal-purple',
      skills: [
        { name: 'UI/UX Design' },
        { name: 'Figma' },
        { name: 'Adobe XD' },
        { name: 'Wireframing & Prototyping' },
        { name: 'Storyboarding' },
      ],
    },
    {
      category: 'MOST IMPORTANT SKILL',
      color: 'text-terminal-yellow',
      skills: [
        { name: 'Vibe Coding' },
      ],
    }
  ];


  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fadeInUp w-full">
      <div className="panel-glass p-3 sm:p-4 md:p-6 rounded border border-primary/30 w-full overflow-hidden">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary text-glow mb-3 sm:mb-4 flex items-center gap-2 break-words">
          <span className="animate-pulse">&gt;</span>
          <span className="break-all">SKILLS.LOG</span>
        </h2>
        <p className="text-muted-foreground font-mono text-[10px] sm:text-xs md:text-sm break-words">
          <span className="text-terminal-cyan">{'> '}</span>
          System capabilities
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-6 w-full">
        {skillCategories.map((category, catIndex) => (
          <div
            key={category.category}
            className="panel-glass p-3 sm:p-4 md:p-6 rounded border border-primary/20 w-full overflow-hidden"
            style={{ animationDelay: `${catIndex * 0.1}s` }}
          >
            <h3 className={`text-sm sm:text-base md:text-lg font-bold ${category.color} mb-3 sm:mb-4 font-mono break-words`}>
              {'['} {category.category} {']'}
            </h3>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 w-full">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="text-[9px] sm:text-[10px] md:text-xs font-mono px-2 sm:px-2.5 py-1 rounded border border-primary/20 bg-muted/10 text-foreground/90 break-words"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
