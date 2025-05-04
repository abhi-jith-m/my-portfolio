"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

const PageTransition = ({ children }) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
