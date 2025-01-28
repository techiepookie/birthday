import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface MemoryJourneyProps {
  onContinue: () => void
}

const memories = [
  {
    id: 1,
    year: 2005,
    title: "Welcome to the World",
    image: "/images/baby-rashi.jpg",
    description: "You were born on this day, bringing joy to everyone around you.",
  },
  {
    id: 2,
    year: 2010,
    title: "First Day of School",
    image: "/images/school-rashi.jpg",
    description: "You bravely stepped into your first classroom, ready to learn and make new friends.",
  },
  {
    id: 3,
    year: 2015,
    title: "Science Fair Champion",
    image: "/images/science-fair-rashi.jpg",
    description: "Your curiosity and hard work paid off as you won first place in the science fair.",
  },
  {
    id: 4,
    year: 2020,
    title: "Sweet Sixteen",
    image: "/images/sweet-16-rashi.jpg",
    description: "Surrounded by loved ones, you celebrated your 16th birthday in style.",
  },
  {
    id: 5,
    year: 2023,
    title: "Graduation Day",
    image: "/images/graduation-rashi.jpg",
    description: "You achieved a major milestone, graduating with honors and ready for the next chapter.",
  },
]

export default function MemoryJourney({ onContinue }: MemoryJourneyProps) {
  const [currentMemory, setCurrentMemory] = useState(0)

  const nextMemory = () => {
    if (currentMemory < memories.length - 1) {
      setCurrentMemory(currentMemory + 1)
    } else {
      onContinue()
    }
  }

  return (
    <div className="text-white text-center">
      <h2 className="text-4xl font-bold mb-8">A Journey Through Your Memories</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMemory}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Image
            src={memories[currentMemory].image || "/placeholder.svg"}
            alt={memories[currentMemory].title}
            width={400}
            height={300}
            className="rounded-lg mb-4"
          />
          <h3 className="text-2xl font-bold mb-2">
            {memories[currentMemory].year}: {memories[currentMemory].title}
          </h3>
          <p className="text-lg mb-4 max-w-md">{memories[currentMemory].description}</p>
        </motion.div>
      </AnimatePresence>
      <motion.button
        className="bg-white text-pink-600 px-6 py-3 rounded-full text-xl font-bold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextMemory}
      >
        {currentMemory < memories.length - 1 ? "Next Memory" : "Continue to Quiz"}
      </motion.button>
    </div>
  )
}

