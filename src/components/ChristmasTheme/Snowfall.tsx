import { useEffect, useRef, useCallback } from 'react';
import { useChristmasTheme } from './ChristmasThemeProvider';
import snowImage from '../../assets/snow.png';

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  swaySpeed: number;
  swayAmount: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

function Snowfall() {
  const { isChristmasTheme } = useChristmasTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number>(0);

  // Initialize snowflakes
  const initSnowflakes = useCallback((width: number, height: number) => {
    const count = 12; // Number of snowflakes
    const flakes: Snowflake[] = [];

    for (let i = 0; i < count; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height - height, // Start above screen
        size: 20 + Math.random() * 25, // 20-45px
        speed: 0.3 + Math.random() * 0.7, // Slower fall speed (0.3-1.0)
        swaySpeed: 0.5 + Math.random() * 1, // Horizontal sway speed
        swayAmount: 30 + Math.random() * 40, // Sway distance
        opacity: 0.7 + Math.random() * 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2, // -1 to 1
      });
    }

    snowflakesRef.current = flakes;
  }, []);

  // Animation loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;

    if (!canvas || !ctx || !img) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each snowflake
    snowflakesRef.current.forEach((flake) => {
      // Update position
      flake.y += flake.speed;
      flake.x += Math.sin(time * 0.001 * flake.swaySpeed) * 0.5;
      flake.rotation += flake.rotationSpeed;

      // Reset if off screen
      if (flake.y > canvas.height + flake.size) {
        flake.y = -flake.size;
        flake.x = Math.random() * canvas.width;
      }

      // Keep x in bounds with wrapping
      if (flake.x > canvas.width + flake.size) flake.x = -flake.size;
      if (flake.x < -flake.size) flake.x = canvas.width + flake.size;

      // Draw snowflake
      ctx.save();
      ctx.globalAlpha = flake.opacity;
      ctx.translate(flake.x, flake.y);
      ctx.rotate((flake.rotation * Math.PI) / 180);
      
      // Add glow effect
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 10;
      
      ctx.drawImage(
        img,
        -flake.size / 2,
        -flake.size / 2,
        flake.size,
        flake.size
      );
      ctx.restore();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isChristmasTheme) {
      cancelAnimationFrame(animationRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSnowflakes(canvas.width, canvas.height);
    };

    // Load image
    const img = new Image();
    img.src = snowImage;
    img.onload = () => {
      imageRef.current = img;
      updateSize();
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', updateSize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [isChristmasTheme, initSnowflakes, animate]);

  if (!isChristmasTheme) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="snowfall-canvas"
      aria-hidden="true"
    />
  );
}

export default Snowfall;


