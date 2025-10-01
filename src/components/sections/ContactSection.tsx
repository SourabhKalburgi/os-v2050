import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const socials = [
    { icon: Github, label: 'GitHub', handle: '@terminal_user', color: 'hover:text-primary' },
    { icon: Linkedin, label: 'LinkedIn', handle: '/terminal-user', color: 'hover:text-terminal-cyan' },
    { icon: Twitter, label: 'Twitter', handle: '@terminal_dev', color: 'hover:text-terminal-purple' },
    { icon: Mail, label: 'Email', handle: 'contact@terminal.dev', color: 'hover:text-terminal-pink' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeInUp">
      <div className="panel-glass p-4 sm:p-6 rounded border border-primary/30">
        <h2 className="text-xl sm:text-2xl font-bold text-primary text-glow mb-3 sm:mb-4 flex items-center gap-2">
          <span className="animate-pulse">&gt;</span>
          CONTACT.NET
        </h2>
        <p className="text-muted-foreground font-mono text-xs sm:text-sm">
          <span className="text-terminal-cyan">{'> '}</span>
          Establishing communication protocol...
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {socials.map((social, index) => (
          <a
            key={social.label}
            href="#"
            className={`panel-glass p-4 rounded border border-primary/20 ${social.color} transition-all active:border-primary/60 active:scale-95 sm:hover:border-primary/60 sm:hover:scale-105 group min-h-[60px] flex items-center`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <social.icon className="w-5 h-5 group-hover:animate-pulse-glow flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-bold font-mono">{social.label}</div>
                <div className="text-xs text-muted-foreground font-mono truncate">{social.handle}</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="panel-glass p-4 sm:p-6 rounded border border-primary/30">
        <h3 className="text-base sm:text-lg font-bold text-terminal-cyan mb-3 sm:mb-4 font-mono">
          {'>'} SEND_MESSAGE
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-mono text-muted-foreground mb-2">
              {'>'} NAME
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-muted/20 border border-primary/30 rounded px-3 sm:px-4 py-2.5 sm:py-2 font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Enter your name..."
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono text-muted-foreground mb-2">
              {'>'} EMAIL
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-muted/20 border border-primary/30 rounded px-3 sm:px-4 py-2.5 sm:py-2 font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="your.email@domain.com"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono text-muted-foreground mb-2">
              {'>'} MESSAGE
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full bg-muted/20 border border-primary/30 rounded px-3 sm:px-4 py-2.5 sm:py-2 font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              placeholder="Type your message..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-mono font-bold py-3 sm:py-3 rounded border border-primary active:bg-primary/80 sm:hover:bg-primary/80 active:shadow-lg sm:hover:shadow-lg active:scale-95 sm:hover:animate-pulse-glow transition-all flex items-center justify-center gap-2 text-sm sm:text-base min-h-[48px]"
          >
            <Send className="w-4 h-4" />
            TRANSMIT_MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
