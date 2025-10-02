import { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  '> INITIALIZING SYSTEM...',
  '> LOADING KERNEL MODULES...',
  '> MOUNTING FILE SYSTEMS...',
  '> STARTING NETWORK SERVICES...',
  '> ESTABLISHING SECURE CONNECTION...',
  '> DECRYPTING USER DATA...',
  '> ACCESSING NEURAL INTERFACE...',
  '> LOADING HOLOGRAPHIC DISPLAY...',
  '> PROFILE: TERMINAL_USER',
  '> STATUS: AUTHENTICATED',
  '> ACCESS LEVEL: ROOT',
  '> SYSTEM READY',
  '',
  '> ACCESS GRANTED',
];

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, BOOT_MESSAGES[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-3xl">
        <div className="space-y-1">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`font-mono text-xs sm:text-sm md:text-base ${
                line.includes('GRANTED') || line.includes('READY')
                  ? 'text-primary text-glow font-bold'
                  : line.includes('ERROR')
                  ? 'text-destructive'
                  : 'text-terminal-cyan'
              } animate-fadeInUp`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {line}
              {index === lines.length - 1 && currentIndex < BOOT_MESSAGES.length && (
                <span className="terminal-cursor ml-1"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
