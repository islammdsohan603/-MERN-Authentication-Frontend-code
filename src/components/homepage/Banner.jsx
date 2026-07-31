'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-green-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto flex flex-col items-center text-center py-16 md:py-24"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/60 text-emerald-800 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>New: AI-powered note organization</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#00b050] max-w-3xl leading-[1.15]"
        >
          Your thoughts, organized and accessible
          <span className="block text-slate-900 mt-1">everywhere</span>
        </motion.h1>

        {/* Subtitle / Paragraph */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed"
        >
          Capture ideas, organize thoughts, and collaborate seamlessly. The
          modern note-taking app that grows with you and keeps your ideas secure
          in the cloud.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-row items-center gap-3 sm:gap-4"
        >
          <Link
            href="/create-todo"
            className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3 rounded-lg text-white bg-[#00c853] hover:bg-[#00e676] transition-colors duration-200 font-medium text-sm sm:text-base shadow-sm group"
          >
            Start Taking Notes
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-200 font-medium text-sm sm:text-base shadow-sm border border-slate-200"
          >
            Watch Demo
          </Link>
        </motion.div>

        {/* Subtext / Features List */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-xs sm:text-sm text-slate-500 font-normal tracking-wide"
        >
          Free forever <span className="mx-1 font-semibold">•</span> No credit
          card required <span className="mx-1 font-semibold">•</span> 2 minutes
          setup
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Banner;
