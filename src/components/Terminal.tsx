import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Folder, FileCode, Database, Award, Mail } from 'lucide-react';

interface TerminalProps {
  onNavigate: (section: string) => void;
  currentSection: string;
  variant?: 'full' | 'dock';
}

const Terminal = ({ onNavigate, currentSection, variant = 'full' }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '> Welcome to TERMINAL_OS v2050.3',
    '> Type "help" for available commands',
    '',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const fileSystem = [
    { name: 'about-me.sys', icon: FileCode, command: 'about', color: 'text-primary' },
    { name: 'projects.exe', icon: Folder, command: 'projects', color: 'text-terminal-cyan' },
    { name: 'skills.log', icon: Database, command: 'skills', color: 'text-terminal-purple' },
    { name: 'achievements.dat', icon: Award, command: 'achievements', color: 'text-terminal-pink' },
    { name: 'contact.net', icon: Mail, command: 'contact', color: 'text-primary' },
  ];

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const newHistory: string[] = [`> ${cmd}`];

    if (command === 'help') {
      newHistory.push(
        '',
        'AVAILABLE COMMANDS:',
        '  help        - Show this help message',
        '  ls          - List all files',
        '  clear       - Clear terminal',
        '  about       - View about section',
        '  projects    - View projects',
        '  skills      - View skills',
        '  achievements - View achievements',
        '  contact     - Open contact panel',
        ''
      );
    } else if (command === 'ls') {
      newHistory.push('', '/root', '├── about-me.sys', '├── projects.exe', '├── skills.log', '├── achievements.dat', '└── contact.net', '');
    } else if (command === 'clear') {
      setHistory(['']);
      setInput('');
      return;
    } else if (['about', 'projects', 'skills', 'achievements', 'contact'].includes(command)) {
      newHistory.push(`> Loading ${command}...`, '');
      onNavigate(command);
    } else if (command === '') {
      // Empty command, just add blank line
    } else {
      newHistory.push(`> ERROR: Command not found: ${command}`, `> Type "help" for available commands`, '');
    }

    // Always keep only the most recent command/output block
    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
    }
  };

  if (variant === 'dock') {
    return (
      <div className="flex lg:flex-col flex-row items-center gap-2 sm:gap-3 bg-card/60 border border-primary/30 rounded-2xl lg:rounded-none px-2 py-2 sm:px-3 sm:py-3">
        <div className="hidden lg:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded bg-primary/10 border border-primary/30">
          <TerminalIcon className="w-4 h-4 text-primary" />
        </div>
        <div className="flex lg:flex-col flex-row items-center gap-2 sm:gap-3">
          {fileSystem.map((file) => (
            <button
              key={file.command}
              onClick={() => onNavigate(file.command)}
              title={file.name}
              className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded border transition-all duration-300 ease-out hover:scale-[1.06] ${
                currentSection === file.command
                  ? 'border-primary bg-primary/20 shadow-[0_0_16px_rgba(0,255,200,0.5)] ring-1 ring-primary/50'
                  : 'border-primary/20 bg-muted/20 sm:hover:bg-muted/40 sm:hover:border-primary/60'
              }`}
            >
              <file.icon className={`w-5 h-5 sm:w-5 sm:h-5 ${
                currentSection === file.command 
                  ? `${file.color} drop-shadow-[0_0_8px_currentColor]` 
                  : file.color
              }`} />
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-mono px-2 py-1 rounded bg-card/90 border border-primary/20 opacity-0 translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 lg:left-full lg:ml-2 lg:-top-0 lg:translate-x-0 lg:translate-y-0 transition-all duration-300 ease-out">
                {file.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col min-h-[500px] lg:min-h-0">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-primary/30 bg-card/50">
        <TerminalIcon className="w-4 h-4 text-primary" />
        <span className="text-[10px] sm:text-xs text-primary font-mono truncate">TERMINAL_OS v2050.3</span>
        <div className="ml-auto flex gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary"></div>
        </div>
      </div>

      {/* File System Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 p-3 sm:p-4 border-b border-primary/30 bg-card/30">
        {fileSystem.map((file) => (
          <button
            key={file.command}
            onClick={() => onNavigate(file.command)}
            className={`group w-full overflow-hidden flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded border transition-all active:scale-95 sm:hover:scale-105 min-h-[60px] sm:min-h-0 ${
              currentSection === file.command 
                ? 'border-primary bg-primary/20 shadow-[0_0_12px_rgba(0,255,200,0.3)] ring-1 ring-primary/30' 
                : 'border-primary/20 bg-muted/20 sm:hover:bg-muted/40 sm:hover:border-primary/60'
            }`}
          >
            <file.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${file.color} group-active:animate-pulse-glow sm:group-hover:animate-pulse-glow ${
              currentSection === file.command ? 'drop-shadow-[0_0_8px_currentColor]' : ''
            }`} />
            <span className="text-[10px] sm:text-xs text-center font-mono leading-snug break-words whitespace-normal max-w-full px-1">{file.name}</span>
          </button>
        ))}
      </div>

      {/* Terminal History */}
      <div
        ref={historyRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1 font-mono text-xs sm:text-sm bg-background/50"
      >
        {history.map((line, index) => (
          <div
            key={index}
            className={`break-words ${
              line.startsWith('>')
                ? line.includes('ERROR')
                  ? 'text-destructive'
                  : 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 sm:px-4 py-3 border-t border-primary/30 bg-card/50">
        <span className="text-primary font-mono text-sm">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-primary font-mono placeholder:text-muted-foreground text-sm"
          placeholder="Type command..."
          autoComplete="off"
        />
        <span className="terminal-cursor"></span>
      </form>
    </div>
  );
};

export default Terminal;
