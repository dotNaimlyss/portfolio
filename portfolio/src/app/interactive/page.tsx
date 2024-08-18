"use client";

import { motion } from "framer-motion";

const SpecialPage = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
      <motion.h1
        className="text-6xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to My Special Page
      </motion.h1>
      <motion.p
        className="mt-4 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Experience the professional elegance
      </motion.p>
    </div>
  );
};

export default SpecialPage;
