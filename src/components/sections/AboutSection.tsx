const AboutSection = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeInUp">
      <div className="panel-glass p-4 sm:p-6 rounded border border-primary/30">
        <h2 className="text-xl sm:text-2xl font-bold text-primary text-glow mb-3 sm:mb-4 flex items-center gap-2">
          <span className="animate-pulse">&gt;</span>
          ABOUT_ME.SYS
        </h2>
        
        <div className="space-y-3 sm:space-y-4 text-muted-foreground font-mono text-sm sm:text-base">
          <p className="leading-relaxed">
            <span className="text-terminal-cyan">{'> '}</span>
            System architect and digital craftsman operating in the intersection of art and technology.
          </p>
          
          <p className="leading-relaxed">
            <span className="text-terminal-cyan">{'> '}</span>
            Specializing in building immersive web experiences that push the boundaries of what's possible
            in the browser. From cyberpunk interfaces to AI-powered applications.
          </p>
          
          <div className="mt-4 sm:mt-6 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-1">
                <span className="text-primary">{'['}</span>
                <span className="text-terminal-purple text-xs sm:text-sm">STATUS</span>
                <span className="text-primary">{']'}</span>
              </div>
              <span className="text-terminal-cyan text-xs sm:text-sm">Active // Available for collaboration</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-1">
                <span className="text-primary">{'['}</span>
                <span className="text-terminal-purple text-xs sm:text-sm">LOCATION</span>
                <span className="text-primary">{']'}</span>
              </div>
              <span className="text-terminal-cyan text-xs sm:text-sm">Cyberspace // Node 404</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-1">
                <span className="text-primary">{'['}</span>
                <span className="text-terminal-purple text-xs sm:text-sm">MISSION</span>
                <span className="text-primary">{']'}</span>
              </div>
              <span className="text-terminal-cyan text-xs sm:text-sm">Building the future, one pixel at a time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'SYSTEMS ONLINE', value: '99.9%', color: 'text-primary' },
          { label: 'PROJECTS COMPLETED', value: '42+', color: 'text-terminal-cyan' },
          { label: 'COFFEE CONSUMED', value: '∞', color: 'text-terminal-purple' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="panel-glass p-4 rounded border border-primary/20 active:border-primary/60 sm:hover:border-primary/60 transition-all active:scale-95 sm:hover:animate-pulse-glow"
          >
            <div className={`text-2xl sm:text-3xl font-bold ${stat.color} text-glow mb-1`}>{stat.value}</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground font-mono">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
