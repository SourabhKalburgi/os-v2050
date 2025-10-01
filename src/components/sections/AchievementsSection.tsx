import { Trophy, Star, Zap, Award } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    {
      icon: Trophy,
      title: 'GRAND_MASTER_CODER',
      description: 'Achieved mastery in full-stack development',
      date: '2049.08',
      rarity: 'LEGENDARY',
      color: 'text-primary',
    },
    {
      icon: Star,
      title: 'DESIGN_VIRTUOSO',
      description: 'Created 100+ stunning user interfaces',
      date: '2049.12',
      rarity: 'EPIC',
      color: 'text-terminal-cyan',
    },
    {
      icon: Zap,
      title: 'PERFORMANCE_NINJA',
      description: 'Optimized applications to lightning speed',
      date: '2050.03',
      rarity: 'RARE',
      color: 'text-terminal-purple',
    },
    {
      icon: Award,
      title: 'OPEN_SOURCE_HERO',
      description: 'Contributed to major community projects',
      date: '2050.05',
      rarity: 'EPIC',
      color: 'text-terminal-pink',
    },
  ];

  const stats = [
    { label: 'COMMITS', value: '10,247', icon: '📊' },
    { label: 'STARS', value: '2,431', icon: '⭐' },
    { label: 'FORKS', value: '856', icon: '🔱' },
    { label: 'FOLLOWERS', value: '1,203', icon: '👥' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeInUp">
      <div className="panel-glass p-4 sm:p-6 rounded border border-primary/30">
        <h2 className="text-xl sm:text-2xl font-bold text-primary text-glow mb-3 sm:mb-4 flex items-center gap-2">
          <span className="animate-pulse">&gt;</span>
          ACHIEVEMENTS.DAT
        </h2>
        <p className="text-muted-foreground font-mono text-xs sm:text-sm">
          <span className="text-terminal-cyan">{'> '}</span>
          Unlocked achievements and milestone records
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="panel-glass p-3 sm:p-4 rounded border border-primary/20 active:border-primary/60 sm:hover:border-primary/60 transition-all"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">{stat.icon}</span>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-primary text-glow">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-mono">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:gap-4">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.title}
            className="panel-glass p-4 sm:p-6 rounded border border-primary/30 active:border-primary active:shadow-lg sm:hover:border-primary sm:hover:shadow-lg sm:hover:scale-[1.02] transition-all group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className={`p-2 sm:p-3 rounded border border-primary/30 ${achievement.color} group-hover:animate-pulse-glow flex-shrink-0`}>
                <achievement.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-lg font-bold text-primary font-mono break-words">
                      {achievement.title}
                    </h3>
                    <span className={`inline-block text-[10px] sm:text-xs font-mono px-2 py-1 rounded border ${
                      achievement.rarity === 'LEGENDARY'
                        ? 'border-primary/50 text-primary bg-primary/10'
                        : achievement.rarity === 'EPIC'
                        ? 'border-terminal-cyan/50 text-terminal-cyan bg-terminal-cyan/10'
                        : 'border-terminal-purple/50 text-terminal-purple bg-terminal-purple/10'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-mono flex-shrink-0">
                    {achievement.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
