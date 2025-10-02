import { ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      name: 'Group_study_app_v1',
      status: 'DEPLOYED',
      tech: ['React', 'MongoDB', 'Express'],
      description: 'Collaborative app for group study',
      color: 'border-primary',
      url: 'https://groupstudymernui.onrender.com/',
    },
    {
      name: 'AI_research_assistant_v1',
      status: 'DEPLOYED',
      tech: ['Python', 'LLM', 'FastAPI'],
      description: 'AI-powered research assistant',
      color: 'border-terminal-cyan',
      url: 'https://airesearchassistant-frontend.onrender.com/',
    },
    {
      name: 'UX_portfolio_v2',
      status: 'DEPLOYED',
      tech: ['UX Design', 'UX Research', 'Portfolio','Photography'],
      description: 'Encrypted communication platform with quantum-inspired security',
      color: 'border-terminal-purple',
      url: 'https://sourabhkalburgi18.wixsite.com/portfolio',
    },
    {
      name: 'Keeper_app',
      status: 'DEPLOYED',
      tech: ['React', 'Framer Motion', 'Clone'],
      description: 'Google Keep clone',
      color: 'border-terminal-pink',
      url: 'https://keeperapp-gy3m.onrender.com/',
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fadeInUp w-full">
      <div className="panel-glass p-3 sm:p-4 md:p-6 rounded border border-primary/30 w-full overflow-hidden">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary text-glow mb-3 sm:mb-4 flex items-center gap-2 break-words">
          <span className="animate-pulse">&gt;</span>
          <span className="break-all">PROJECTS.EXE</span>
        </h2>
        <p className="text-muted-foreground font-mono text-[10px] sm:text-xs md:text-sm break-words">
          <span className="text-terminal-cyan">{'> '}</span>
          Executable projects and deployed systems
        </p>
      </div>

      <div className="grid gap-2 sm:gap-3 md:gap-4 w-full">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className={`panel-glass p-3 sm:p-4 md:p-6 rounded border ${project.color} active:shadow-lg active:scale-[0.98] sm:hover:shadow-lg sm:hover:scale-[1.02] transition-all group w-full overflow-hidden`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3 w-full">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-primary group-hover:text-glow mb-2 flex items-center gap-2 break-words">
                  <span className="break-all">{project.name}</span>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-1 rounded border border-primary/20 bg-muted/10 hover:bg-primary/10 hover:border-primary/60 transition-colors flex-shrink-0"
                      aria-label={`Open ${project.name}`}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground group-hover:text-primary" />
                    </a>
                  ) : null}
                </h3>
                <span className={`inline-block text-[9px] sm:text-[10px] md:text-xs font-mono px-2 py-1 rounded ${
                  project.status === 'DEPLOYED' || project.status === 'LIVE'
                    ? 'bg-primary/20 text-primary'
                    : project.status === 'PRODUCTION'
                    ? 'bg-terminal-cyan/20 text-terminal-cyan'
                    : 'bg-terminal-purple/20 text-terminal-purple'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground font-mono text-[10px] sm:text-xs md:text-sm mb-3 leading-relaxed break-words">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] sm:text-[10px] md:text-xs font-mono px-2 py-1 rounded border border-primary/30 text-terminal-cyan break-words"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
