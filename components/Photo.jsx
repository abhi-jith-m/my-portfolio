"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const Photo = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null); // Ref for 3D animation

  const [imageDimensions, setImageDimensions] = useState({
    width: 400,
    height: Math.round((400 / 2505) * 2740), // Initial size
  });

  // Handle responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      // Dynamically adjust image size based on the viewport
      const newWidth = window.innerWidth < 768 ? 250 : 400; // Mobile vs Desktop width
      const newHeight = Math.round((newWidth / 2505) * 2740); // Maintain aspect ratio
      setImageDimensions({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to set the correct initial size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;

    if (!container || !card) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Add smooth 3D effect using gsap for rotation
      gsap.to(card, {
        duration: 0.6,
        rotateX: (-y / rect.height) * 15,
        rotateY: (x / rect.width) * 15,
        scale: 1.05, // slight zoom effect
        ease: "power3.out", // smooth easing for better effect
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.8,
        rotateX: 0,
        rotateY: 0,
        scale: 1, // reset the zoom
        ease: "power3.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: imageDimensions.width,
        height: imageDimensions.height,
        perspective: 1000, // perspective for depth
      }}
      className="relative flex items-center justify-center"
    >
      <div
        ref={cardRef}
        className="w-full h-full rounded-3xl overflow-hidden will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.4s ease", // smooth transition
        }}
      >
        <div className="relative">
          <Image
            src="/assets/abhi1.png"
            alt="Abhijith M"
            width={imageDimensions.width}
            height={imageDimensions.height}
            quality={100}
            className="object-cover object-center rounded-3xl"
            priority
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 400px" // Responsive sizing for different breakpoints
          />
        </div>
      </div>
    </div>
  );
};

export default Photo;
  