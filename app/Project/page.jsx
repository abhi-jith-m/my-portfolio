'use client';

import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import {
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

// Project data with detailed descriptions
const projects = [
  {
    name: 'California Wildfire Damage Prediction',
    image: '/wildfire-prediction.png', // Replace with actual path
    link: 'https://example.com/wildfire',
    github: 'https://github.com/username/wildfire',
    category: 'Machine Learning',
    date: 'May 2024',
    description: 'Developed a damage prediction model using machine learning and deployed a Streamlit UI for real-time predictions and visualizations.',
    technologies: ['Python', 'Machine Learning', 'Streamlit', 'Pandas', 'scikit-learn'],
    color: 'from-red-600 to-orange-400'
  },
  {
    name: 'HR Analysis using LLM',
    image: '/hr-llm.png', // Replace with actual path
    link: 'https://example.com/hr-llm',
    github: 'https://github.com/username/hr-llm',
    category: 'AI/LLM',
    date: 'Apr 2024',
    description: 'Built an AI platform for HR to automate employee selection, score resumes, rank candidates, and generate job descriptions using LLaMA 2.',
    technologies: ['Python', 'LLaMA 2', 'LangChain', 'Streamlit'],
    color: 'from-purple-600 to-purple-400'
  },
  {
    name: 'Stock Market Price Prediction Using LSTM',
    image: '/stock-lstm.png', // Replace with actual path
    link: 'https://example.com/stock-lstm',
    github: 'https://github.com/username/stock-lstm',
    category: 'Deep Learning',
    date: 'Mar 2024',
    description: 'Developed a stock market prediction app using LSTM with real-time data processing and interactive visualizations built on Django.',
    technologies: ['Python', 'LSTM', 'TensorFlow', 'Django', 'Matplotlib'],
    color: 'from-blue-600 to-blue-400'
  },
  {
    name: 'Crypto Analysis Dashboard',
    image: '/crypto-dashboard.png', // Replace with actual path
    link: 'https://example.com/crypto-dashboard',
    github: 'https://github.com/username/crypto-dashboard',
    category: 'Business Intelligence',
    date: 'Feb 2024',
    description: 'Created a real-time historical data analysis dashboard using Power BI with data fetched dynamically from cryptocurrency APIs.',
    technologies: ['Power BI', 'REST API', 'JSON', 'Data Modeling'],
    color: 'from-yellow-600 to-yellow-400'
  }
];


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
export default React.memo(function Projects() {
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
    const totalCards = projects.length;
    const containerWidth = 1200; // Width of your container
    const cardWidth = 340; // Width of each card
    
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
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }, 3000); // Slightly longer interval for better readability of project information
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused, inView, projects.length, isAutoplay]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

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

  const activeColor = colorMap[projects[activeIndex].color.split(' ')[0]];
  const activeProject = projects[activeIndex];

  return (
    <LazyMotion features={domAnimation}>
      <div 
        ref={sectionRef}
        className="relative w-full  bg-amber-50 max-w-full mx-auto h-[90vw] sm:h-[500px] mt-5 flex flex-col items-center justify-self-center overflow-x-hidden p-4"
        id="projects-section" 
        aria-label="Projects Section"
      >
        <div
          className="relative w-full max-w-[1200px] h-[520px] mx-auto flex justify-center items-center z-10 overflow-hidden px-20"
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
          aria-label="Projects carousel"
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


          <div className="relative  h-full w-full flex items-center justify-center" aria-live="polite">
            {projects.map((project, i) => {
              const isActive = i === activeIndex;
              const { position, scale, zIndex, opacity } = getCardStyles(i);
              
              return (
                <motion.div
                  key={project.name}
                  className="absolute cursor-pointer"
                  onClick={() => handleCardSelect(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onFocus={() => setFocusedIndex(i)}
                  onBlur={() => setFocusedIndex(null)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`${project.name} project`}
                  style={{
                    left: `calc(50% - 170px)`, // Center point (340px / 2 = 170px)
                    zIndex,
                    // Apply backface-visibility and transform settings directly to help with blur
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translateZ(0)',
                    WebkitFontSmoothing: 'subpixel-antialiased'
                  }}
                  animate={{
                    x: position,
                    scale,
                    opacity
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300, // Reduced from 350
                    damping: 30,    // Increased from 25
                    mass: 0.8,
                    restDelta: 0.001,
                    restSpeed: 0.001
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
                    {/* CARD DESIGN */}
                    <Card
                      className={ ` h-full w-[340px] sm:h-[500px] rounded-xl overflow-hidden shadow-xl transition-all duration-300 ${
                        focusedIndex === i ? 'ring-2 ring-blue-500' : ''
                      } ${isActive ? 'border border-blue-400/30' : ''}`}
                      style={{
                        // Add hardware acceleration properties to fix blurry text
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitFontSmoothing: 'antialiased',
                        WebkitTransform: 'translateZ(0)'
                      }}
                    >
                      {/* Image section - Top half of the card */}
                      <div className="relative w-full h-56 overflow-hidden">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url(/api/placeholder/400/320)`,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            WebkitTransform: 'translateZ(0)'
                          }}
                        />
                        
                        {/* Gradient overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-b ${project.color} opacity-60 mix-blend-multiply`}
                        />
                        
                        {/* Project title overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                          <h3 className="text-2xl font-bold tracking-tight drop-shadow-md line-clamp-2 mb-2">
                            {project.name}
                          </h3>
                          
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                              <Calendar size={12} />
                              {project.date}
                            </span>
                            <span className="text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                              <Tag size={12} />
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content section - Bottom half */}
                      <CardContent className="p-5 bg-white dark:bg-gray-900 flex flex-col h-[calc(100%-14rem)]">
                        {/* Description */}
                        <div className="   flex flex-col gap-4 ">
                          {/* Description */}
                          <div className=" mb-1.5  flex flex-col gap-4  pr-1">
                            {/* Description */}
                            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              {project.description}
                            </div>
                            {/* Technologies */}
                            <div>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                                Technologies
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                  <span 
                                    key={index} 
                                    className={`text-xs px-2 py-1 rounded-md border ${
                                      isActive 
                                        ? `bg-${project.color.split('-')[1]}-50 dark:bg-${project.color.split('-')[1]}-900/20 border-${project.color.split('-')[1]}-200 dark:border-${project.color.split('-')[1]}-700` 
                                        : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                    }`}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                                        
                        {/* Links - Bottom of card */}
                        <div className="flex mt-auto justify-between">
                          <motion.a
                            href={project.github}
                            className={`flex items-center gap-1 text-sm px-3 py-2 rounded-lg shadow-sm border transition-all
                            ${isActive 
                              ? `bg-${project.color.split('-')[1]}-50 dark:bg-${project.color.split('-')[1]}-900/20 border-${project.color.split('-')[1]}-200 dark:border-${project.color.split('-')[1]}-800 text-${project.color.split('-')[1]}-600 dark:text-${project.color.split('-')[1]}-400` 
                              : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github size={16} />
                            Code
                          </motion.a>
                          <motion.a
                            href={project.link}
                            className={`flex items-center gap-1 text-sm px-3 py-2 rounded-lg shadow-sm border transition-all
                            ${isActive 
                              ? `bg-${project.color.split('-')[1]}-600 border-${project.color.split('-')[1]}-700 text-white` 
                              : 'bg-gray-900 border-gray-800 text-white dark:bg-white dark:text-gray-900 dark:border-gray-100'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </motion.a>
                        </div>
                      </CardContent>
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