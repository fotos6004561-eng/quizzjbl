import React, { useEffect, useRef } from 'react';

interface BackgroundProps {
  stepIndex: number;
}

const Background: React.FC<BackgroundProps> = ({ stepIndex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{x: number, y: number, r: number, dx: number, dy: number, alpha: number, color?: string}> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize particles based on step vibe
    const initParticles = () => {
      particles = [];
      const count = stepIndex === 2 ? 150 : 100; // More particles for water stage (index 2)
      
      for(let i = 0; i < count; i++) {
        let color = `rgba(255, 255, 255, ${Math.random()})`; // Default white

        // Color Logic per Step
        if (stepIndex === 0) { 
           // Intro: Orange & Black/Empty voids
           color = `rgba(255, 87, 34, ${Math.random()})`;
        } else if (stepIndex === 1) { 
           // Sound: Neon Orange & Red
           color = `rgba(255, 87, 34, ${Math.random()})`;
        } else if (stepIndex === 2) { 
           // Water: Cyan & Orange mix
           color = Math.random() > 0.5 ? `rgba(0, 255, 255, ${Math.random()})` : `rgba(255, 87, 34, ${Math.random()})`;
        } else if (stepIndex === 3) { 
           // Powerbank: Electric Blue & White
           color = Math.random() > 0.3 ? `rgba(0, 150, 255, ${Math.random()})` : `rgba(255, 255, 255, ${Math.random()})`;
        } else if (stepIndex === 4) {
           // PartyBoost: Multi-color festival vibe
           const colors = ['#FF5722', '#9C27B0', '#00BCD4', '#FFEB3B'];
           const picked = colors[Math.floor(Math.random() * colors.length)];
           // Convert hex to rgba manually for alpha
           color = picked; 
        } else if (stepIndex === 5) {
           // Design: Metallic Grey & Orange
           color = Math.random() > 0.7 ? `rgba(255, 87, 34, ${Math.random()})` : `rgba(160, 160, 160, ${Math.random()})`;
        } else {
           // Battery: Gold
           color = `rgba(255, 215, 0, ${Math.random()})`;
        }

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 3 + 1,
          dx: (Math.random() - 0.5) * (stepIndex === 0 ? 5 : 1), // Fast for intro
          dy: (Math.random() - 0.5) * (stepIndex === 2 ? 4 : 1), // Vertical chaos for water
          alpha: Math.random(),
          color: color
        });
      }
    };
    initParticles();

    const render = () => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Update
        p.x += p.dx;
        p.y += p.dy;

        // Bounce
        if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        // Handle color if it's a simple string (hex) or template string (rgba)
        if (p.color && p.color.startsWith('#')) {
             ctx.fillStyle = p.color;
             ctx.globalAlpha = p.alpha;
        } else {
             ctx.fillStyle = p.color || 'white';
             ctx.globalAlpha = 1;
        }
        
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stepIndex]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default Background;