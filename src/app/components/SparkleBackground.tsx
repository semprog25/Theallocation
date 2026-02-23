import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  speed: number;
  delay: number;
  phase: number;
}

export function SparkleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      initStars();
    };

    const initStars = () => {
      const area = canvas.width * canvas.height;
      // ~1 star per 25000px² — sparse and elegant
      const count = Math.floor(area / 25000);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        opacity: 0,
        targetOpacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.003 + 0.001,
        delay: Math.random() * 6000,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        // Gentle sine-wave twinkle with individual phase & delay
        const t = Math.max(0, time - star.delay);
        const wave = Math.sin(t * star.speed + star.phase);
        // Map sine [-1,1] to [0, targetOpacity]
        star.opacity = ((wave + 1) / 2) * star.targetOpacity;

        // Warm white with slight gold tint: rgb(245, 240, 235)
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 210, 195, ${star.opacity})`;
        ctx.fill();

        // Subtle glow for brighter stars
        if (star.size > 0.9 && star.opacity > 0.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 149, 106, ${star.opacity * 0.12})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);

    // Observe body size changes (for scroll height)
    const observer = new ResizeObserver(() => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );
    });
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
