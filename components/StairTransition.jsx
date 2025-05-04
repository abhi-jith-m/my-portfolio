"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Total number of stairs
const totalSteps = 6;

// Helper function to reverse the index for staggering
const reverseIndex = (index) => {
  return totalSteps - index - 1;
};

// Animation variants for vertical movement
const stairAnimation = {
  initial: { opacity: 0, y: "100%" },  // Start off-screen at the bottom
  animate: { opacity: 1, y: "0%" },    // Move to normal position (visible)
  exit: { opacity: 0, y: "100%" },    // Exit upward
};

const StairTransition = () => {
  const pathname = usePathname();  // Get the current pathname to detect page change
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    // Reset the animation when pathname changes
    setShow(true);
    
    // After animation completes, hide the stairs
    const timer = setTimeout(() => {
      setShow(false);
    }, 800); // Reduced from 1200ms to 800ms
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <>
          <motion.div
            key={pathname || "initial"}
            className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50"
          >
            {/* Create stairs */}
            {[...Array(totalSteps)].map((_, index) => (
              <motion.div
                key={index}
                variants={stairAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: [0.2, 0.65, 0.3, 0.9], // Custom easing for smoother feel
                  delay: reverseIndex(index) * 0.07, // Reduced delay between stairs
                }}
                className="h-full w-full bg-white"
              />
            ))}
          </motion.div>
          <motion.div
            key="overlay"
            className="h-screen w-screen fixed bg-primary top-0 pointer-events-none z-40"
            initial={{ opacity: 1 }} // Set initial opacity to 1
            animate={{
              opacity: 0, // Animate opacity to 0 (fade out)
            }}
            transition={{
              delay: 1,   // Delay the animation by 1 second
              duration: 0.3, // Duration of the animation
              ease: "easeInOut" // Apply smooth easing
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default StairTransition;