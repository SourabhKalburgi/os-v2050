import { useState, useEffect, useRef } from 'react';
import { X, Camera, Filter, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
}

const PhotographySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredPhoto, setHoveredPhoto] = useState<Photo | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Helper function to extract filename from path
  const getFileName = (src: string): string => {
    // Remove query parameters if present
    const pathWithoutQuery = src.split('?')[0];
    // Extract filename from path
    const fileName = pathWithoutQuery.split('/').pop() || pathWithoutQuery;
    return fileName;
  };

  // Sample photos - Replace these with your actual photo URLs
  const photos: Photo[] = [
    {
      id: '1',
      src: './images/photography/HIMALAYAS.jpg?w=600&h=800&fit=crop',
      alt: 'Mountain Landscape',
      category: 'landscape',
      title: '',
    },
    {
      id: '2',
      src: './images/photography/CITYSCAPE_1.jpg',
      alt: 'urban',
      category: 'urban',
      title: '',
    },

    {
      id: '3',
      src: './images/photography/BEACHES.jpg',
      alt: 'landscape ',
      category: 'landscape',
      title: '',
    },
    {
      id: '4',
      src: './images/photography/MOON.jpg',
      alt: 'portrait',
      category: 'portrait',
      title: '',
    },

    {
      id: '5',
      src: './images/photography/EDM.jpg',
      alt: 'urban',
      category: 'urban',
      title: '',
    },
    {
      id: '6',
      src: './images/photography/FERRIS_WHEEL.jpg',
      alt: 'Street',
      category: 'street',
      title: '',
    },
    {
      id: '7',
      src: './images/photography/SUNSET_1.jpg',
      alt: 'landscape',
      category: 'landscape',
      title: '',
    },

    {
      id: '8',
      src: './images/photography/TAJ_MAHAL.jpg',
      alt: 'architecture',
      category: 'architecture',
      title: '',
    },
  ].map((photo) => ({
    ...photo,
    title: getFileName(photo.src),
  }));

  // Get all available categories from photos
  const availableCategories = Array.from(new Set(photos.map((photo) => photo.category)));

  // Category labels mapping
  const categoryLabels: Record<string, string> = {
    all: 'ALL_FILES',
    landscape: 'LANDSCAPE',
    portrait: 'PORTRAIT',
    urban: 'URBAN',
    nature: 'NATURE',
    street: 'STREET',
    architecture: 'ARCHITECTURE',
  };

  // Build categories list - only include categories that have photos
  const categories = [
    { id: 'all', label: 'ALL_FILES', icon: Camera },
    ...availableCategories.map((cat) => ({
      id: cat,
      label: categoryLabels[cat] || cat.toUpperCase(),
      icon: Camera,
    })),
  ];

  const filteredPhotos =
    activeFilter === 'all' ? photos : photos.filter((photo) => photo.category === activeFilter);

  // Handle hover preview
  const handlePhotoHover = (photo: Photo, index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredPhoto(photo);
      setPreviewIndex(index);
      setIsAutoPlaying(false);
    }, 300); // Small delay to prevent accidental triggers
  };

  const handlePhotoLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredPhoto(null);
      setIsAutoPlaying(false);
    }, 200);
  };

  // Navigation functions
  const goToNext = () => {
    if (hoveredPhoto) {
      const currentIndex = filteredPhotos.findIndex((p) => p.id === hoveredPhoto.id);
      const nextIndex = (currentIndex + 1) % filteredPhotos.length;
      setHoveredPhoto(filteredPhotos[nextIndex]);
      setPreviewIndex(nextIndex);
    }
  };

  const goToPrevious = () => {
    if (hoveredPhoto) {
      const currentIndex = filteredPhotos.findIndex((p) => p.id === hoveredPhoto.id);
      const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setHoveredPhoto(filteredPhotos[prevIndex]);
      setPreviewIndex(prevIndex);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && hoveredPhoto) {
      const interval = setInterval(() => {
        setHoveredPhoto((current) => {
          if (!current) return null;
          const currentIndex = filteredPhotos.findIndex((p) => p.id === current.id);
          const nextIndex = (currentIndex + 1) % filteredPhotos.length;
          setPreviewIndex(nextIndex);
          return filteredPhotos[nextIndex];
        });
      }, 3000);
      autoPlayIntervalRef.current = interval;
    } else {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    };
  }, [isAutoPlaying, hoveredPhoto, filteredPhotos]);

  // Keyboard navigation
  useEffect(() => {
    if (!hoveredPhoto) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd') {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === hoveredPhoto.id);
        const nextIndex = (currentIndex + 1) % filteredPhotos.length;
        setHoveredPhoto(filteredPhotos[nextIndex]);
        setPreviewIndex(nextIndex);
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === hoveredPhoto.id);
        const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        setHoveredPhoto(filteredPhotos[prevIndex]);
        setPreviewIndex(prevIndex);
      } else if (e.key === 'Escape') {
        setHoveredPhoto(null);
        setIsAutoPlaying(false);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hoveredPhoto, filteredPhotos]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, []);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setHoveredPhoto(null);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fadeInUp w-full">
      <div className="panel-glass p-3 sm:p-4 md:p-6 rounded border border-primary/30 w-full overflow-hidden">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary text-glow mb-3 sm:mb-4 flex items-center gap-2 break-words">
          <span className="animate-pulse">&gt;</span>
          <span className="break-all">PHOTOGRAPHY.GALLERY</span>
        </h2>
        <p className="text-muted-foreground font-mono text-[10px] sm:text-xs md:text-sm break-words">
          <span className="text-terminal-cyan">{'> '}</span>
          Visual memories captured through the lens
        </p>
      </div>

      {/* Filter Bar */}
      <div className="panel-glass p-2 sm:p-3 rounded border border-primary/20 w-full overflow-x-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <Filter className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded border font-mono text-[9px] sm:text-[10px] md:text-xs transition-all whitespace-nowrap flex-shrink-0 ${
                    activeFilter === category.id
                      ? 'border-primary bg-primary/20 text-primary shadow-[0_0_12px_rgba(0,255,200,0.3)]'
                      : 'border-primary/20 bg-muted/10 text-muted-foreground hover:border-primary/40 hover:bg-muted/20'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-visible rounded border border-primary/20 bg-muted/10 hover:border-primary/60 transition-all duration-300 cursor-pointer photo-tile"
            onClick={() => handlePhotoClick(photo)}
            onMouseEnter={() => handlePhotoHover(photo, index)}
            onMouseLeave={handlePhotoLeave}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Photo */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                  <p className="text-white font-mono text-[9px] sm:text-[10px] md:text-xs font-bold mb-1 break-words">
                    {photo.title}
                  </p>
                  <p className="text-terminal-cyan font-mono text-[8px] sm:text-[9px] uppercase break-words">
                    {photo.category}
                  </p>
                </div>
              </div>

              {/* Glitch Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-primary/10 mix-blend-screen photo-glitch"></div>
              </div>

              {/* Corner Indicator */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal CRT Preview Modal */}
      {hoveredPhoto && (
        <div
          ref={previewRef}
          className="fixed z-[150] terminal-crt-preview"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
          }}
          onMouseLeave={handlePhotoLeave}
        >
          {/* CRT Monitor Frame */}
          <div className="relative terminal-monitor">
            {/* Monitor Bezel */}
            <div className="terminal-monitor-bezel">
              {/* Screen */}
              <div className="terminal-screen">
                {/* Scanlines */}
                <div className="terminal-scanlines"></div>

                {/* Screen Content */}
                <div className="terminal-screen-content">
                  {/* Terminal Header */}
                  <div className="terminal-header">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-destructive"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-mono text-primary">
                      IMAGE_VIEWER.exe
                    </span>
                    <button
                      onClick={() => setHoveredPhoto(null)}
                      className="ml-auto p-1 hover:bg-primary/20 rounded transition-colors"
                      aria-label="Close preview"
                    >
                      <X className="w-3 h-3 text-primary" />
                    </button>
                  </div>

                  {/* Image Display */}
                  <div className="terminal-image-container">
                    <img src={hoveredPhoto.src} alt={hoveredPhoto.alt} className="terminal-image" />

                    {/* Image Info Overlay */}
                    <div className="terminal-image-info">
                      <p className="text-primary font-mono text-[10px] sm:text-xs font-bold">
                        {hoveredPhoto.title}
                      </p>
                      <p className="text-terminal-cyan font-mono text-[8px] sm:text-[9px]">
                        [{previewIndex + 1}/{filteredPhotos.length}]{' '}
                        {hoveredPhoto.category.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="terminal-controls">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevious();
                      }}
                      className="terminal-nav-btn"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying(!isAutoPlaying);
                      }}
                      className="terminal-nav-btn terminal-play-btn"
                      aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                    >
                      {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                      }}
                      className="terminal-nav-btn"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Terminal Footer */}
                  <div className="terminal-footer">
                    <span className="text-[8px] font-mono text-muted-foreground">
                      {'>'} Use ← → or A/D keys to navigate | SPACE to toggle autoplay | ESC to
                      close
                    </span>
                  </div>
                </div>
              </div>

              {/* Monitor Stand */}
              <div className="terminal-stand"></div>
              <div className="terminal-stand-base"></div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fadeInUp"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full border border-primary/30 bg-card/80 hover:bg-primary/20 hover:border-primary/60 transition-all group"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            </button>

            {/* Image Container */}
            <div
              className="relative max-w-full max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-full object-contain rounded border border-primary/30 shadow-[0_0_40px_rgba(0,255,200,0.3)]"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 rounded border border-primary/30 bg-card/90 backdrop-blur-sm">
                <p className="text-primary font-mono text-sm sm:text-base font-bold mb-1 break-words">
                  {selectedPhoto.title}
                </p>
                <p className="text-terminal-cyan font-mono text-xs sm:text-sm uppercase break-words">
                  CATEGORY: {selectedPhoto.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full">
        <div className="panel-glass p-3 sm:p-4 rounded border border-primary/20 text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary text-glow mb-1">
            {photos.length}
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-mono break-words">
            TOTAL_FILES
          </div>
        </div>
        <div className="panel-glass p-3 sm:p-4 rounded border border-primary/20 text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-cyan text-glow mb-1">
            {availableCategories.length}
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-mono break-words">
            CATEGORIES
          </div>
        </div>
        <div className="panel-glass p-3 sm:p-4 rounded border border-primary/20 text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-purple text-glow mb-1">
            {filteredPhotos.length}
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-mono break-words">
            FILTERED
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographySection;
