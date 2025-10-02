import { Mail, Linkedin } from 'lucide-react';

const ContactSection = () => {
  const socials = [
    { icon: Linkedin, label: 'LinkedIn', handle: 'linkedin.com/in/sourabh-kalburgi-6a51b720a', url: 'http://www.linkedin.com/in/sourabh-kalburgi-6a51b720a', color: 'hover:text-terminal-cyan' },
    { icon: Mail, label: 'Email', handle: 'sourabhnew101@gmail.com', url: 'mailto:sourabhnew101@gmail.com', color: 'hover:text-primary' },
  ];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fadeInUp w-full">
      <div className="panel-glass p-3 sm:p-4 md:p-6 rounded border border-primary/30 w-full overflow-hidden">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary text-glow mb-3 sm:mb-4 flex items-center gap-2 break-words">
          <span className="animate-pulse">&gt;</span>
          <span className="break-all">CONTACT.NET</span>
        </h2>
        <p className="text-muted-foreground font-mono text-[10px] sm:text-xs md:text-sm break-words">
          <span className="text-terminal-cyan">{'> '}</span>
          Establishing communication protocol...
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full">
        {socials.map((social, index) => (
          <a
            key={social.label}
            href={social.url}
            className={`panel-glass p-3 sm:p-4 rounded border border-primary/20 ${social.color} transition-all active:border-primary/60 active:scale-95 sm:hover:border-primary/60 sm:hover:scale-105 group min-h-[50px] sm:min-h-[60px] flex items-center w-full overflow-hidden`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-2 sm:gap-3 w-full">
              <social.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse-glow flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-bold font-mono break-words">{social.label}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-mono break-all leading-tight">{social.handle}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;
