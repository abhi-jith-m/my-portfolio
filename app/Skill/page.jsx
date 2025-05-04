'use client';

import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Book } from 'lucide-react';
import { Mic } from 'lucide-react';
import { Cpu } from 'lucide-react'
import {
  Badge,
  Brain,
  Code,
  Database,
  Grid,
  GitBranch,
  LineChart,
  Speech,
  Library,
  BarChart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

const colorMap = {
  'from-yellow-600': '#ca8a04', // Darker yellow for better visibility
  'from-blue-600': '#2563eb',
  'from-green-600': '#059669',  
  'from-purple-600': '#7c3aed',
  'from-red-600': '#dc2626',
  'from-indigo-600': '#4f46e5', // New color added
  'from-pink-600': '#ec4899', // New color for Generative AI
  'from-yellow-400': '#fbbf24', // Alternative yellow for better contrast
  'from-blue-400': '#60a5fa', // Light blue for added variety
  'from-green-400': '#34d399', // Lighter green for contrast
  'from-red-400': '#f87171', // Lighter red for added contrast
  'from-purple-400': '#a78bfa', // Lighter purple for variety
};

// Enhanced skills data with more detailed descriptions and added category
const skills = [
  {
    name: 'Python',
    icon: <Code size={24} />,
    level: 'Advanced',
    years: '2+ years',
    description: 'Data analysis, machine learning, API development, and automation scripts',
    category: 'Programming',
    color: 'from-yellow-600 to-yellow-400'
  },
  {
    name: 'SQL',
    icon: <Database size={24} />,
    level: 'Advanced',
    years: '2+ years',
    description: 'Database design, complex queries, performance optimization, and data warehousing',
    category: 'Databases',
    color: 'from-purple-600 to-purple-400'
  },
  {
    name: 'Machine Learning',
    icon: <Brain size={24} />,
    level: 'Intermediate',
    years: '1+ year',
    description: 'Supervised learning, unsupervised learning, neural networks, and NLP fundamentals',
    category: 'AI',
    color: 'from-green-600 to-green-400'
  },
  {
    name: 'Libraries',
    icon: <Book size={24} />,
    level: 'Intermediate',
    years: '1+ year',
    description: 'Data science libraries like NumPy, pandas, scikit-learn, seaborn, and matplotlib for analysis and visualization',
    category: 'Data Science',
    color: 'from-blue-600 to-blue-400'
  },
  {
    name: 'Deep Learning',
    icon: <Brain size={24} />,
    level: 'Intermediate',
    years: '1+ year',
    description: 'Working with TensorFlow, neural networks, RNNs, LSTMs, and CNNs for deep learning tasks',
    category: 'AI',
    color: 'from-red-600 to-red-400'
  },
  {
    name: 'NLP',
    icon: <Mic size={24} />,
    level: 'Beginner',
    years: '< 1 year',
    description: 'Understanding of text preprocessing, tokenization, and sentiment analysis using NLP techniques',
    category: 'AI',
    color: 'from-indigo-600 to-indigo-400'
  },
  {
    name: 'Gen AI',
    icon: <Cpu size={24} />,
    level: 'Beginner',
    years: '< 1 year',
    description: 'Basic understanding of generative models like GANs and their applications',
    category: 'AI',
    color: 'from-pink-600 to-pink-400'
  },
  {
    name: 'Power BI',
    icon: <BarChart size={24} />,
    level: 'Advanced',
    years: '1+ year',
    description: 'Creating dashboards, data modeling, and reporting using Power BI',
    category: 'Data Visualization',
    color: 'from-yellow-600 to-yellow-400'
  },
  {
    name: 'Java',
    icon: <Code size={24} />,
    level: 'Beginner',
    years: '< 1 year',
    description: 'Basic Java functions, object-oriented programming, and simple application development',
    category: 'Programming',
    color: 'from-green-600 to-green-400'
  },
  {
    name: 'HTML & CSS',
    icon: <Code size={24} />,
    level: 'Intermediate',
    years: '1+ year',
    description: 'Building responsive layouts, styling pages, and understanding web design fundamentals',
    category: 'Web Development',
    color: 'from-blue-600 to-blue-400'
  },
  {
    name: 'PostgreSQL',
    icon: <Database size={24} />,
    level: 'Beginner',
    years: '< 1 year',
    description: 'Basic queries, data manipulation, and understanding relational databases in PostgreSQL',
    category: 'Databases',
    color: 'from-purple-600 to-purple-400'
  },
  {
    name: 'Data Science',
    icon: <BarChart size={24} />,
    level: 'Intermediate',
    years: '1+ year',
    description: 'Experience with Exploratory Data Analysis (EDA), predictive modeling, A/B testing, and data visualization',
    category: 'Analytics',
    color: 'from-blue-600 to-blue-400'
  },
  {
    name: 'R',
    icon: <Code size={24} />,
    level: 'Beginner',
    years: '< 1 year',
    description: 'Basic statistical analysis and data visualization using R programming',
    category: 'Data Science',
    color: 'from-green-600 to-green-400'
  },
  {
    name: 'Excel',
    icon: <Grid size={24} />,
    level: 'Intermediate',
    years: '<1 year',
    description: 'Advanced Excel functions, pivot tables, data analysis, and chart creation for business insights',
    category: 'Data Analysis',
    color: 'from-yellow-600 to-yellow-400'
  }
];

// Progressive Progress Bar with Framer Motion
const ProgressBar = ({ level, active }) => {
  const levelValues = { 'Beginner': 50, 'Intermediate': 75, 'Advanced': 95 };
  const progressValue = levelValues[level] || 50;
  
  return (
    <div className="h-2 bg-white/20 rounded-full w-full">
      <motion.div
        className="h-full bg-white/90 rounded-full shadow-inner"
        initial={{ width: 0 }}
        animate={{ width: active ? `${progressValue}%` : 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 20,
          delay: active ? 0 : 0 
        }}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progressValue}
        role="progressbar"
        aria-label={`${level} proficiency level`}
      />
    </div>
  );
};

// Function to synchronize animations with frame updates for smoother performance
const useFramerSync = () => {
  useEffect(() => {
    const handleRAF = () => {
      // Optional frame synchronization logic
    };
    const id = requestAnimationFrame(handleRAF);
    return () => cancelAnimationFrame(id);
  }, []);
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(function Skills() {
  // Enable frame synchronization for 60fps animations
  useFramerSync();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const cardsContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  const [focusedIndex, setFocusedIndex] = useState(null);
  
  // For keyboard navigation
  const getCardStyles = useCallback((index) => {
    const totalCards = skills.length;
    const containerWidth = 1200; // Width of your container
    const cardWidth = 280; // Width of each card
    
    // Calculate the position based on active index
    let position;
    let scale;
    let opacity;
    
    // Calculate relative position
    let distanceFromActive = index - activeIndex;
    if (distanceFromActive < -totalCards/2) distanceFromActive += totalCards;
    if (distanceFromActive > totalCards/2) distanceFromActive -= totalCards;
    
    // Calculate absolute distance for styling
    const distance = Math.abs(distanceFromActive);
    
    // Only show 3 cards - center card and one on each side
    if (distance > 1) {
      // For cards that are further away than immediate neighbors, push them
      // far off screen or make them very small
      position = distanceFromActive * (containerWidth * 0.75);
      scale = 0.4; // Make them very small
      opacity = 0; // Hide them completely
    } else {
      // For center card and immediate neighbors (3 cards total)
      
      // Center card
      if (index === activeIndex) {
        position = 0;
        scale = 1;
        opacity = 1;
      } 
      // Immediate neighbor cards (left and right)
      else {
        // Set position to show exactly at sides with right spacing
        // This is the key setting for controlling visible cards
        const gap = (containerWidth - cardWidth) / 2 * 0.8; // Adjustable spacing
        position = distanceFromActive * gap;
        scale = 0.85; // Scale down side cards slightly
        opacity = 0.8; // Make side cards slightly transparent
      }
    }
    
    // Z-index calculation - center card on top
    const zIndex = index === activeIndex ? 70 : (20 - distance);
    
    return {
      position,
      scale,
      zIndex,
      opacity
    };
  }, [activeIndex]);
  
  // Autoplay with performance optimizations
  useEffect(() => {
    if (!isPaused && inView && isAutoplay) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % skills.length);
      }, 3000); // Slightly longer interval for better readability
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused, inView, skills.length, isAutoplay]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % skills.length);
  }, [skills.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + skills.length) % skills.length);
  }, [skills.length]);

  const handleCardSelect = useCallback((index) => {
    setActiveIndex(index);
    setIsAutoplay(false); // Stop autoplay when user interacts
    setTimeout(() => setIsAutoplay(true), 5000); // Resume after 5 seconds
  }, []);

  const handleKeyDown = useCallback((e, index) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        handleNext();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        handlePrev();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleCardSelect(index);
        break;
      default:
        break;
    }
  }, [handleNext, handlePrev, handleCardSelect]);

  const handlePointerDown = useCallback((e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX);
    setIsPaused(true); // Pause autoplay during interaction
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    // Optional: implement drag animation here if desired
  }, []);

  const handlePointerUp = useCallback((e) => {
    if (!isDraggingRef.current) return;
    
    const currentX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    const diff = currentX - startXRef.current;

    if (diff < -50) handleNext();
    else if (diff > 50) handlePrev();

    isDraggingRef.current = false;
    setIsPaused(false); // Resume autoplay
    setIsAutoplay(true);
  }, [handleNext, handlePrev]);

  const activeColor = colorMap[skills[activeIndex].color.split(' ')[0]];
  const activeSkill = skills[activeIndex];

  return (
    <LazyMotion features={domAnimation}>
      <div 
        ref={sectionRef}
        className="relative w-full max-w-full mx-auto max-h-[700px] mt-20 flex flex-col items-center justify-self-center overflow-hidden p-4"
        id="skills-section" 
        aria-label="Technical Skills Section"
      >
        <div
          className="relative w-full max-w-[1200px] h-[420px] mx-auto flex justify-center items-center z-10 overflow-hidden px-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={cardsContainerRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          role="region"
          aria-label="Skills carousel"
          style={{ perspective: '2000px' }} // Add perspective for 3D effect
        >
          <motion.button
              className="hidden md:flex absolute left-4 z-20 bg-white/90 text-black rounded-full p-3 shadow-lg hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handlePrev}
              aria-label="Previous project"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              className="hidden md:flex absolute right-4 z-20 bg-white/90 text-black rounded-full p-3 shadow-lg hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleNext}
              aria-label="Next project"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight size={20} />
            </motion.button>

          <div className="relative h-full w-full flex items-center justify-center" aria-live="polite">
            {skills.map((skill, i) => {
              const isActive = i === activeIndex;
              const { position, scale, zIndex, opacity } = getCardStyles(i);
              
              return (
                <motion.div
                key={skill.name}
                className="absolute cursor-pointer"
                onClick={() => handleCardSelect(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onFocus={() => setFocusedIndex(i)}
                onBlur={() => setFocusedIndex(null)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${skill.name} ${skill.level} skill`}
                style={{
                  left: `calc(50% - 140px)`,
                  zIndex,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                animate={{
                  x: position,
                  scale,
                  opacity
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
              >
                <motion.div


                   whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.6,
                    restDelta: 0.001
                  }}
                  style={{
                    // Improved anti-aliasing and blur prevention properties
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased',
                    WebkitTransform: 'translateZ(0)',
                    // Add these additional properties to prevent blurring
                    filter: 'blur(0)',
                    WebkitFilter: 'blur(0)'
                  }}
                              >
                <Card
                   className={`w-[280px] h-[400px] text-white rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${skill.color} relative ${
                    focusedIndex === i ? 'ring-2 ring-white' : ''
                  } ${isActive ? 'border border-white/30' : 'border border-white/10'} transition-all duration-300 hover:shadow-2xl`}
                  style={{
                    // Simple transform will cause less blur issues
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                >
                      {/* Add glass morphism effect overlay */}
                      <div className="absolute inset-0 bg-white/5 backdrop-filter backdrop-blur-[2px] z-0"></div>
                      
                      {/* Add subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-10 z-0" 
                           style={{
                             backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 10%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 8%)',
                             backgroundSize: '60px 60px'
                           }}>
                      </div>
                      
                      {/* Glowing orb effect in background */}
                      <motion.div 
                        className="absolute rounded-full filter blur-xl z-0" 
                        style={{
                          background: `radial-gradient(circle at center, white, ${skill.color.split(' ')[0].replace('from-', '')})`,
                          width: '150px',
                          height: '150px',
                          top: '10%',
                          right: '-20%'
                        }}
                        animate={{
                          opacity: isActive ? 0.4 : 0.2,
                          scale: isActive ? 1.1 : 1
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <CardContent className="flex flex-col h-full p-6 relative z-10">
                        <div className="flex justify-between items-center mb-5">
                          <motion.div 
                            className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg ring-1 ring-white/30"
                            whileHover={{ scale: 1.1, rotate: isActive ? 5 : 0 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {React.cloneElement(skill.icon, { className: "text-white" })}
                          </motion.div>
                          <motion.span 
                            className="text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md ring-1 ring-white/30"
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            transition={{ delay: isActive ? 0.2 : 0 }}
                          >
                            {skill.level}
                          </motion.span>
                        </div>

                        <div className="space-y-2">
                          <motion.h3 
                            className="text-3xl font-bold tracking-tight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: isActive ? 0.1 : 0 }}
                          >
                            {skill.name}
                          </motion.h3>
                          <motion.span 
                            className="inline-block text-xs font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full shadow-inner border border-white/20"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: isActive ? 0.2 : 0 }}
                          >
                            {skill.category} • {skill.years}
                          </motion.span>
                        </div>

                        <div className="flex flex-col gap-3 mt-5">
                          <motion.p 
                            className="text-sm opacity-90 leading-relaxed font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: isActive ? 0.3 : 0 }}
                          >
                            {skill.description}
                          </motion.p>
                          <div className="mt-auto pt-4">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-xs font-medium text-white/80">Proficiency</p>
                              <span className="text-xs font-bold">{skill.level}</span>
                            </div>
                            <ProgressBar level={skill.level} active={isActive} />
                          </div>
                        </div>
                        
                        {/* Add subtle corner accents */}
                        <motion.div 
                          className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-white/30 rounded-tr-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
                          transition={{ delay: isActive ? 0.2 : 0 }}
                        />
                        <motion.div 
                          className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-white/30 rounded-bl-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
                          transition={{ delay: isActive ? 0.2 : 0 }}
                        />
                      </CardContent>
                      
                      {/* Hover state effect - only visible on active card */}
                      {isActive && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-5"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
});