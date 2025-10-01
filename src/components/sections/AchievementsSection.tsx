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
    <div className="space-y-6 animate-fadeInUp">
      <div className="panel-glass p-6 rounded border border-primary/30">
        <h2 className="text-2xl font-bold text-primary text-glow mb-4 flex items-center gap-2">
          <span className="animate-pulse">&gt;</span>
          ACHIEVEMENTS.DAT
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          <span className="text-terminal-cyan">{'> '}</span>
          Unlocked achievements and milestone records
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="panel-glass p-4 rounded border border-primary/20 hover:border-primary/60 transition-all"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <div className="text-2xl font-bold text-primary text-glow">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.title}
            className="panel-glass p-6 rounded border border-primary/30 hover:border-primary hover:shadow-lg hover:scale-[1.02] transition-all group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded border border-primary/30 ${achievement.color} group-hover:animate-pulse-glow`}>
                <achievement.icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-primary font-mono">
                      {achievement.title}
                    </h3>
                    <span className={`text-xs font-mono px-2 py-1 rounded border ${
                      achievement.rarity === 'LEGENDARY'
                        ? 'border-primary/50 text-primary bg-primary/10'
                        : achievement.rarity === 'EPIC'
                        ? 'border-terminal-cyan/50 text-terminal-cyan bg-terminal-cyan/10'
                        : 'border-terminal-purple/50 text-terminal-purple bg-terminal-purple/10'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {achievement.date}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground font-mono">
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
