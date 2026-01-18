import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  // Initialize points
  useEffect(() => {
    // Create 30 points for a nice long fluid tail
    points.current = Array.from({ length: 30 }, () => ({ x: 0, y: 0 }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Physics / Interpolation step
      // We want the first point to follow the mouse, and subsequent points to follow the previous point
      // This creates a "rope" or "snake" effect

      // Leader follows mouse with a bit of delay/smoothness (lerp)
      // Or instant: points.current[0].x = mouse.current.x;
      // Let's do a very fast lerp for the leader so it feels responsive
      const leader = points.current[0];
      leader.x += (mouse.current.x - leader.x) * 0.5;
      leader.y += (mouse.current.y - leader.y) * 0.5;

      // Followers
      for (let i = 1; i < points.current.length; i++) {
        const prev = points.current[i - 1];
        const curr = points.current[i];

        // Spring/Lerp physics
        // The factor (0.2) determines how "loose" or "tight" the trail is
        curr.x += (prev.x - curr.x) * 0.2;
        curr.y += (prev.y - curr.y) * 0.2;
      }

      // Draw the curve
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(points.current[0].x, points.current[0].y);

      for (let i = 1; i < points.current.length; i++) {
        // Draw a simple line or curve to the next point
        // For a super smooth look, we can use quadratic curves to the midpoint
        const curr = points.current[i];
        const prev = points.current[i - 1];

        // Using simple lines is often "fluid" enough if points are dense,
        // but let's try to draw segments with varying width
        // Actually, stroke with varying width is hard in one path.
        // We'll draw circles that overlap perfectly to make a tapered stroke.
      }
      ctx.stroke(); // Placeholder, we won't use a single stroke

      // Drawing the "Comet" body
      points.current.forEach((point, index) => {
        const ratio = 1 - index / points.current.length; // 1 at head, 0 at tail

        // Taper size
        const size = ratio * 6; // Head is 6px, tail is 0px

        // Taper opacity/color
        // Head is solid, tail is transparent
        // Add a glow effect

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(140, 100%, 50%, ${ratio * 0.6})`;

        // Only glow the head and upper body
        if (index < 5) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = `hsla(140, 100%, 50%, 0.8)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      // Optional: Draw a "core" at the mouse position for precision
      // ctx.beginPath();
      // ctx.arc(mouse.current.x, mouse.current.y, 2, 0, Math.PI * 2);
      // ctx.fillStyle = "#fff";
      // ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default CursorTrail;
