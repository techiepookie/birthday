import React from "react"
import { motion } from "framer-motion"

interface IntroSectionProps {
  onContinue: () => void
}

export default function IntroSection({ onContinue }: IntroSectionProps) {
  return (
    <div className="text-center text-white">
      <motion.h1
        className="text-6xl md:text-8xl font-bold mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        To My Dearest Rashi
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Welcome to a journey through our love story. Swipe left or right to navigate.
      </motion.p>
      <motion.button
        className="bg-white text-purple-600 px-6 py-3 rounded-full text-xl font-bold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
      >
        Begin Our Journey
      </motion.button>
    </div>
  )
}

