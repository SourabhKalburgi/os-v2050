import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Folder, FileCode, Database, Award, Mail } from 'lucide-react';

interface TerminalProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const Terminal = ({ onNavigate, currentSection }: TerminalProps) => {
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
    const newHistory = [...history, `> ${cmd}`];

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

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/30 bg-card/50">
        <TerminalIcon className="w-4 h-4 text-primary" />
        <span className="text-xs text-primary font-mono">TERMINAL_OS v2050.3</span>
        <div className="ml-auto flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
        </div>
      </div>

      {/* File System Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-4 border-b border-primary/30 bg-card/30">
        {fileSystem.map((file) => (
          <button
            key={file.command}
            onClick={() => onNavigate(file.command)}
            className={`group flex flex-col items-center gap-2 p-3 rounded border border-primary/20 bg-muted/20 hover:bg-muted/40 hover:border-primary/60 transition-all hover:scale-105 ${
              currentSection === file.command ? 'border-primary bg-primary/10' : ''
            }`}
          >
            <file.icon className={`w-6 h-6 ${file.color} group-hover:animate-pulse-glow`} />
            <span className="text-xs text-center font-mono">{file.name}</span>
          </button>
        ))}
      </div>

      {/* Terminal History */}
      <div
        ref={historyRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-sm bg-background/50"
      >
        {history.map((line, index) => (
          <div
            key={index}
            className={`${
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
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-primary/30 bg-card/50">
        <span className="text-primary font-mono">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-primary font-mono placeholder:text-muted-foreground"
          placeholder="Type a command..."
          autoFocus
        />
        <span className="terminal-cursor"></span>
      </form>
    </div>
  );
};

export default Terminal;
