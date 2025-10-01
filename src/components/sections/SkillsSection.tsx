const SkillsSection = () => {
  const skillCategories = [
    {
      category: 'FRONTEND_SYSTEMS',
      color: 'text-primary',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 92 },
        { name: 'Three.js/WebGL', level: 88 },
        { name: 'Tailwind CSS', level: 96 },
      ],
    },
    {
      category: 'BACKEND_PROTOCOLS',
      color: 'text-terminal-cyan',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'GraphQL', level: 82 },
        { name: 'Docker', level: 80 },
      ],
    },
    {
      category: 'CREATIVE_MODULES',
      color: 'text-terminal-purple',
      skills: [
        { name: 'UI/UX Design', level: 93 },
        { name: 'Animation', level: 90 },
        { name: 'Figma', level: 88 },
        { name: '3D Modeling', level: 75 },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="panel-glass p-6 rounded border border-primary/30">
        <h2 className="text-2xl font-bold text-primary text-glow mb-4 flex items-center gap-2">
          <span className="animate-pulse">&gt;</span>
          SKILLS.LOG
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          <span className="text-terminal-cyan">{'> '}</span>
          System capabilities and proficiency levels
        </p>
      </div>

      <div className="space-y-6">
        {skillCategories.map((category, catIndex) => (
          <div
            key={category.category}
            className="panel-glass p-6 rounded border border-primary/20"
            style={{ animationDelay: `${catIndex * 0.1}s` }}
          >
            <h3 className={`text-lg font-bold ${category.color} mb-4 font-mono`}>
              {'['} {category.category} {']'}
            </h3>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-muted-foreground">
                      {skill.name}
                    </span>
                    <span className={`text-sm font-mono font-bold ${category.color}`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-primary via-terminal-cyan to-terminal-purple animate-pulse-glow`}
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${(catIndex * 4 + skillIndex) * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
