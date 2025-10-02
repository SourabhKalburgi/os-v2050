import { ExternalLink } from 'lucide-react';

const AchievementsSection = () => {
  const courses: Array<{ title: string; provider: string; url?: string }> = [
    { title: 'Full-Stack Web Development', provider: 'Udemy',url:'https://www.udemy.com/certificate/UC-c809c45d-84e9-4015-ac92-c766b6c6d5df/' },
    { title: 'DevOps Certification', provider: 'Udemy', url:'https://www.udemy.com/certificate/UC-af1223b7-ca81-40fd-833b-46deae4339ef/' },
    { title: 'UX Design Professional Certification', provider: 'Google',url:'https://www.coursera.org/account/accomplishments/specialization/certificate/S2DHQ694S8F2' },
    { title: 'Data Structures', provider: 'Coursera', url:'https://www.coursera.org/account/accomplishments/certificate/TZLK2F6R4LJS' },
    { title: 'Machine Learning', provider: 'Coursera',url:'https://www.coursera.org/account/accomplishments/verify/WF3YZ8YP8YE9' },
    { title: 'Astronomy: Exploring Time and Space', provider: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/certificate/P5HX67CDJ9KW' },
  ];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fadeInUp w-full">
      <div className="panel-glass p-3 sm:p-4 md:p-6 rounded border border-primary/30 w-full overflow-hidden">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary text-glow mb-3 sm:mb-4 flex items-center gap-2 break-words">
          <span className="animate-pulse">&gt;</span>
          <span className="break-all">COURSES_AND_CERTIFICATES.DAT</span>
        </h2>
        <p className="text-muted-foreground font-mono text-[10px] sm:text-xs md:text-sm break-words">
          <span className="text-terminal-cyan">{'> '}</span>
          Unlocked courses and certificates
        </p>
      </div>

      <div className="grid gap-2 sm:gap-3 md:gap-4 w-full">
        {courses.map((course, index) => (
          <div
            key={`${course.title}-${course.provider}`}
            className="panel-glass p-3 sm:p-4 md:p-6 rounded border border-primary/30 sm:hover:border-primary sm:hover:shadow-lg transition-all w-full overflow-hidden"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-2 sm:gap-3 w-full">
              <div className="min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm md:text-lg font-bold text-primary font-mono break-words leading-tight">{course.title}</h3>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-mono mt-1 break-words">{course.provider}</p>
              </div>
              {course.url ? (
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-terminal-cyan text-[10px] sm:text-xs md:text-sm font-mono border border-primary/30 rounded px-2 py-1 hover:bg-primary/10 flex-shrink-0"
                  aria-label={`Open certificate for ${course.title}`}
                >
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">View</span>
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
