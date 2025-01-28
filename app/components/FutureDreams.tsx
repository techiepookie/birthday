import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const dreams = [
  { id: 1, title: "Travel the World", description: "Visit at least 30 countries before turning 30" },
  { id: 2, title: "Start a Business", description: "Launch your own tech startup and make a positive impact" },
  { id: 3, title: "Learn a New Language", description: "Become fluent in Japanese to explore the culture" },
  { id: 4, title: "Run a Marathon", description: "Train and complete your first full marathon" },
  { id: 5, title: "Write a Book", description: "Author a novel that inspires young adults" },
]

export default function FutureDreams() {
  const [currentDream, setCurrentDream] = useState(0)

  const nextDream = () => {
    setCurrentDream((prev) => (prev + 1) % dreams.length)
  }

  return (
    <div className="text-white text-center">
      <h2 className="text-4xl font-bold mb-8">Rashi's Future Dreams</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDream}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold mb-4">{dreams[currentDream].title}</h3>
          <p className="text-xl">{dreams[currentDream].description}</p>
        </motion.div>
      </AnimatePresence>
      <motion.button
        className="bg-white text-green-600 px-6 py-3 rounded-full text-xl font-bold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextDream}
      >
        Next Dream
      </motion.button>
    </div>
  )
}

