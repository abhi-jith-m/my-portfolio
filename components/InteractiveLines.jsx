'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

export default function ImprovedGlowBackground({
  particleCount = 50,
  particleSize = { min: 1.5, max: 2.5 },
  particleSpeed = 3,
  connectionDistance = 140,
  mouseConnectionDistance = 180,
  colorScheme = 'rainbow', // 'rainbow', 'blue', 'purple', 'custom'
  customColors = [], // For custom color scheme
  enableMouseEffects = true,
  enableCollisions = true,
  enableConnections = true,
  bgColor = '#000',
  blur = 0,
}) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null });
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);
  
  // Performance optimization
  const isInViewport = useRef(true);
  const frameSkip = useRef(0);
  
  // Create color palette based on chosen scheme
  const colorPalette = useMemo(() => {
    switch (colorScheme) {
      case 'blue':
        return Array.from({ length: 30 }, (_, i) => 200 + (i * 40) % 60);
      case 'purple':
        return Array.from({ length: 30 }, (_, i) => 240 + (i * 40) % 80);
      case 'custom':
        return customColors.length > 0 
          ? customColors 
          : Array.from({ length: 30 }, (_, i) => i * 12);
      default: // rainbow
        return Array.from({ length: 360 }, (_, i) => i);
    }
  }, [colorScheme, customColors]);

  // Initialize canvas and particles
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };
    
    // Set initial dimensions
    updateDimensions();
    
    // Update on resize
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Create particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const createParticle = (x, y, lifespan = Infinity) => ({
      x,
      y,
      dx: (Math.random() - 0.5) * particleSpeed,
      dy: (Math.random() - 0.5) * particleSpeed,
      radius: Math.random() * (particleSize.max - particleSize.min) + particleSize.min,
      createTime: Date.now(),
      lifespan,
      opacity: 1,
      colorIndex: Math.floor(Math.random() * colorPalette.length),
      colorDirection: Math.random() > 0.5 ? 1 : -1,
      colorSpeed: 0.2 + Math.random() * 0.8, // Varied color change speed
      pulseSpeed: 0.005 + Math.random() * 0.01,
      pulseDirection: 1,
      pulseAmount: 0,
    });
    
    // Initialize particles
    particles.current = Array.from({ length: particleCount }, () => 
      createParticle(
        Math.random() * dimensions.width,
        Math.random() * dimensions.height
      )
    );
    
    // Mouse events
    const move = (e) => {
      if (!enableMouseEffects) return;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    
    const click = (e) => {
      if (!enableMouseEffects) return;
      const burstCount = 3;
      for (let i = 0; i < burstCount; i++) {
        particles.current.push(
          createParticle(e.clientX, e.clientY, 5000 + Math.random() * 5000)
        );
      }
    };
    
    // Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver((entries) => {
      isInViewport.current = entries[0].isIntersecting;
      setIsVisible(entries[0].isIntersecting);
    }, { threshold: 0.1 });
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    
    window.addEventListener('mousemove', move);
    window.addEventListener('click', click);
    
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('click', click);
      observer.disconnect();
    };
  }, [dimensions, particleCount, particleSize, particleSpeed, colorPalette, enableMouseEffects]);
  
  // Animation loop
  useEffect(() => {
    if (!isVisible || dimensions.width === 0 || dimensions.height === 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      // Performance optimization: skip frames occasionally
      if (particles.current.length > 80) {
        frameSkip.current = (frameSkip.current + 1) % 2;
        if (frameSkip.current !== 0) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
      }
      
      // Skip rendering when not in viewport
      if (!isInViewport.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const now = Date.now();
      const { width, height } = dimensions;
      
      // Clear canvas with background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      
      // Apply blur effect if enabled
      if (blur > 0) {
        ctx.filter = `blur(${blur}px)`;
      } else {
        ctx.filter = 'none';
      }
      
      // Remove expired particles
      particles.current = particles.current.filter(
        (p) => now - p.createTime < p.lifespan || p.lifespan === Infinity
      );
      
      // Draw connections first (under particles)
      if (enableConnections) {
        for (let i = 0; i < particles.current.length; i++) {
          const p = particles.current[i];
          
          // Particle connections
          for (let j = i + 1; j < particles.current.length; j++) {
            const o = particles.current[j];
            const d = Math.hypot(p.x - o.x, p.y - o.y);
            
            if (d < connectionDistance) {
              const lineOpacity = (1 - d / connectionDistance) * Math.min(p.opacity, o.opacity) * 0.8;
              
              // Get colors from palette
              const pColor = colorPalette[Math.floor(p.colorIndex) % colorPalette.length];
              const oColor = colorPalette[Math.floor(o.colorIndex) % colorPalette.length];
              
              // Use gradient for connections
              const gradient = ctx.createLinearGradient(p.x, p.y, o.x, o.y);
              gradient.addColorStop(0, `hsla(${pColor}, 100%, 70%, ${lineOpacity})`);
              gradient.addColorStop(1, `hsla(${oColor}, 100%, 70%, ${lineOpacity})`);
              
              ctx.beginPath();
              ctx.strokeStyle = gradient;
              ctx.lineWidth = Math.min(1.5, 0.8 + (1 - d / connectionDistance) * 1.2);
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(o.x, o.y);
              ctx.stroke();
            }
          }
          
          // Mouse connections
          if (mouse.current.x !== null && enableMouseEffects) {
            const md = Math.hypot(p.x - mouse.current.x, p.y - mouse.current.y);
            if (md < mouseConnectionDistance) {
              const mouseLineOpacity = (1 - md / mouseConnectionDistance) * p.opacity * 0.9;
              const pColor = colorPalette[Math.floor(p.colorIndex) % colorPalette.length];
              
              ctx.beginPath();
              ctx.strokeStyle = `hsla(${pColor}, 100%, 70%, ${mouseLineOpacity})`;
              ctx.lineWidth = 1 + (1 - md / mouseConnectionDistance) * 1.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.current.x, mouse.current.y);
              ctx.stroke();
              
              // Attract particles slightly toward mouse
              const angle = Math.atan2(mouse.current.y - p.y, mouse.current.x - p.x);
              const attractionStrength = 0.005 * (1 - md / mouseConnectionDistance);
              p.dx += Math.cos(angle) * attractionStrength;
              p.dy += Math.sin(angle) * attractionStrength;
              
              // Limit maximum velocity
              const speed = Math.hypot(p.dx, p.dy);
              if (speed > particleSpeed * 1.5) {
                p.dx = (p.dx / speed) * particleSpeed * 1.5;
                p.dy = (p.dy / speed) * particleSpeed * 1.5;
              }
            }
          }
        }
      }
      
      // Update and draw particles
      particles.current.forEach((p, i) => {
        // Update position
        p.x += p.dx;
        p.y += p.dy;
        
        // Boundary check with momentum preservation
        if (p.x < p.radius) {
          p.x = p.radius;
          p.dx *= -0.9; // Slight dampening
        } else if (p.x > width - p.radius) {
          p.x = width - p.radius;
          p.dx *= -0.9;
        }
        
        if (p.y < p.radius) {
          p.y = p.radius;
          p.dy *= -0.9;
        } else if (p.y > height - p.radius) {
          p.y = height - p.radius;
          p.dy *= -0.9;
        }
        
        // Collision detection
        if (enableCollisions) {
          for (let j = i + 1; j < particles.current.length; j++) {
            const o = particles.current[j];
            const dx = p.x - o.x;
            const dy = p.y - o.y;
            const dist = Math.hypot(dx, dy);
            const minDist = p.radius + o.radius;
            
            if (dist < minDist && dist > 0) {
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);
              
              // Particle velocity decomposition
              const v1 = { 
                x: p.dx * cos + p.dy * sin, 
                y: -p.dx * sin + p.dy * cos 
              };
              const v2 = { 
                x: o.dx * cos + o.dy * sin, 
                y: -o.dx * sin + o.dy * cos 
              };
              
              // Swap velocities for elastic collision
              const vxTotal = v1.x;
              v1.x = v2.x;
              v2.x = vxTotal;
              
              // Convert velocities back
              p.dx = v1.x * cos - v1.y * sin;
              p.dy = v1.x * sin + v1.y * cos;
              o.dx = v2.x * cos - v2.y * sin;
              o.dy = v2.x * sin + v2.y * cos;
              
              // Move particles apart to prevent overlap
              const overlap = (minDist - dist) / 2;
              p.x += overlap * (dx / dist);
              p.y += overlap * (dy / dist);
              o.x -= overlap * (dx / dist);
              o.y -= overlap * (dy / dist);
              
              // Transfer a small amount of color
              if (Math.random() < 0.3) {
                const colorTransfer = 0.1 + Math.random() * 0.1;
                const tempColor = p.colorIndex;
                p.colorIndex = p.colorIndex * (1 - colorTransfer) + o.colorIndex * colorTransfer;
                o.colorIndex = o.colorIndex * (1 - colorTransfer) + tempColor * colorTransfer;
              }
            }
          }
        }
        
        // Update opacity for fading particles
        if (p.lifespan !== Infinity) {
          const age = now - p.createTime;
          p.opacity = Math.max(0, 1 - age / p.lifespan);
        }
        
        // Update color index for smooth color transitions
        p.colorIndex = (p.colorIndex + p.colorDirection * p.colorSpeed) % colorPalette.length;
        if (p.colorIndex < 0) p.colorIndex = colorPalette.length - 1;
        
        // Pulsing effect
        p.pulseAmount += p.pulseSpeed * p.pulseDirection;
        if (p.pulseAmount > 0.3 || p.pulseAmount < 0) {
          p.pulseDirection *= -1;
        }
        
        const actualRadius = p.radius * (1 + p.pulseAmount * 0.15);
        const color = colorPalette[Math.floor(p.colorIndex) % colorPalette.length];
        
        // Draw particle with glow effect
        const glow = actualRadius * 2;
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glow
        );
        
        gradient.addColorStop(0, `hsla(${color}, 100%, 70%, ${p.opacity})`);
        gradient.addColorStop(0.6, `hsla(${color}, 100%, 60%, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${color}, 100%, 50%, 0)`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw particle core
        ctx.beginPath();
        ctx.fillStyle = `hsla(${color}, 100%, 80%, ${p.opacity})`;
        ctx.arc(p.x, p.y, actualRadius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animate();
    
    // Cleanup animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, isVisible, particleSpeed, particleSize, connectionDistance, mouseConnectionDistance, colorPalette, enableCollisions, enableConnections, enableMouseEffects, bgColor, blur]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    />
  );
}