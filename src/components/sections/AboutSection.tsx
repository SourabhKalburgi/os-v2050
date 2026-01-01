const AboutSection = () => {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fadeInUp w-full">
      <div className="panel-glass p-3 sm:p-4 md:p-6 rounded border border-primary/30 w-full overflow-hidden">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary text-glow mb-3 sm:mb-4 flex items-center gap-2 break-words">
          <span className="animate-pulse">&gt;</span>
          <span className="break-all">ABOUT_ME.SYS </span>
        </h2>

        <div className="space-y-3 sm:space-y-4 text-gray-200 font-mono text-xs sm:text-sm md:text-base w-full">
          <p className="leading-relaxed break-words">
            <span className="text-terminal-cyan">{'> '}</span>I build web apps that don't just work,
            they vibe. From React interfaces smoother than your morning coffee to backend logic that
            behaves better than most humans, I like making tech feel effortless.
          </p>

          <p className="leading-relaxed break-words">
            <span className="text-terminal-cyan">{'> '}</span>
            I've dabbled in everything from UX prototyping and animations to Dockerized MERN stacks
            and AWS deployments. If it involves building, breaking, or debugging something at 2 AM
            with snacks nearby — I'm in.
          </p>

          <div className="mt-3 sm:mt-4 md:mt-6 space-y-2 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full">
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-primary">{'['}</span>
                <span className="text-terminal-purple text-[10px] sm:text-xs md:text-sm">
                  STATUS
                </span>
                <span className="text-primary">{']'}</span>
              </div>
              <span className="text-terminal-cyan text-[10px] sm:text-xs md:text-sm break-words">
                Active // Available for collaboration
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full">
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-primary">{'['}</span>
                <span className="text-terminal-purple text-[10px] sm:text-xs md:text-sm">
                  LOCATION
                </span>
                <span className="text-primary">{']'}</span>
              </div>
              <span className="text-terminal-cyan text-[10px] sm:text-xs md:text-sm break-words">
                Bangalore // 12.9629° N, 77.5775° E
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full">
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-primary">{'['}</span>
                <span className="text-terminal-purple text-[10px] sm:text-xs md:text-sm">
                  MISSION
                </span>
                <span className="text-primary">{']'}</span>
              </div>
              <span className="text-terminal-cyan text-[10px] sm:text-xs md:text-sm break-words">
                Create digital experiences that make people say, "Wait… you built THIS?"
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full">
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-primary">{'['}</span>
                <span className="text-terminal-purple text-[10px] sm:text-xs md:text-sm">ALSO</span>
                <span className="text-primary">{']'}</span>
              </div>
              <span className="text-terminal-cyan text-[10px] sm:text-xs md:text-sm break-words">
                {' '}
                ⚽ 🏏 // ⛰️ // ˙✧˖°📸⋆｡˚
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full">
        {[
          { label: 'SYSTEMS ONLINE', value: '99.9%', color: 'text-primary' },
          { label: 'PROJECTS COMPLETED', value: '4+', color: 'text-terminal-cyan' },
          { label: 'COFFEE CONSUMED', value: '∞', color: 'text-terminal-purple' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="panel-glass p-3 sm:p-4 rounded border border-primary/20 active:border-primary/60 sm:hover:border-primary/60 transition-all active:scale-95 sm:hover:animate-pulse-glow w-full min-w-0"
          >
            <div
              className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color} text-glow mb-1 break-words`}
            >
              {stat.value}
            </div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-mono break-words leading-tight">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
