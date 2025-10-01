import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      name: 'Neural_Interface_v3',
      status: 'DEPLOYED',
      tech: ['React', 'Three.js', 'WebGL'],
      description: 'Immersive 3D visualization platform for neural network architectures',
      color: 'border-primary',
    },
    {
      name: 'CyberDash_Analytics',
      status: 'PRODUCTION',
      tech: ['Next.js', 'TypeScript', 'D3.js'],
      description: 'Real-time data analytics dashboard with cyberpunk aesthetics',
      color: 'border-terminal-cyan',
    },
    {
      name: 'Quantum_Messenger',
      status: 'BETA',
      tech: ['WebRTC', 'Socket.io', 'Electron'],
      description: 'Encrypted communication platform with quantum-inspired security',
      color: 'border-terminal-purple',
    },
    {
      name: 'Holo_Portfolio_OS',
      status: 'LIVE',
      tech: ['React', 'Framer Motion', 'Tailwind'],
      description: 'This very portfolio - a terminal-based holographic interface',
      color: 'border-terminal-pink',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="panel-glass p-6 rounded border border-primary/30">
        <h2 className="text-2xl font-bold text-primary text-glow mb-4 flex items-center gap-2">
          <span className="animate-pulse">&gt;</span>
          PROJECTS.EXE
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          <span className="text-terminal-cyan">{'> '}</span>
          Executable projects and deployed systems
        </p>
      </div>

      <div className="grid gap-4">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className={`panel-glass p-6 rounded border ${project.color} hover:shadow-lg hover:scale-[1.02] transition-all group`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-primary group-hover:text-glow">
                  {project.name}
                </h3>
                <span className={`text-xs font-mono px-2 py-1 rounded ${
                  project.status === 'DEPLOYED' || project.status === 'LIVE'
                    ? 'bg-primary/20 text-primary'
                    : project.status === 'PRODUCTION'
                    ? 'bg-terminal-cyan/20 text-terminal-cyan'
                    : 'bg-terminal-purple/20 text-terminal-purple'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded hover:bg-primary/20 transition-colors">
                  <Github className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </button>
                <button className="p-2 rounded hover:bg-primary/20 transition-colors">
                  <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </button>
              </div>
            </div>

            <p className="text-muted-foreground font-mono text-sm mb-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2 py-1 rounded border border-primary/30 text-terminal-cyan"
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
