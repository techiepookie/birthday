import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface LoveStoryProps {
  onContinue: () => void
}

const storyMilestones = [
  {
    id: 1,
    date: "January 28, 2022",
    title: "First Message",
    image: "https://iili.io/2QxbmAX.md.png",
    description: "The day I first messaged you, starting our beautiful journey.",
  },
  {
    id: 2,
    date: "January 17, 2023",
    title: "Kundli Match",
    image: "https://iili.io/2Qzuy2p.md.jpg",
    description: "Our kundlis matched 32 out of 36 guns. It was meant to be!",
  },
  {
    id: 3,
    date: "January 20, 2023",
    title: "The Apology",
    image: "https://iili.io/2Qxp5Bf.md.png",
    description: "I made a mistake, but you forgave me. You said I had guts, and that's why you forgave me.",
  },
  {
    id: 4,
    date: "October 14, 2023",
    title: "Head Boy and Head Girl",
    image: "hhttps://iili.io/2QzY5OB.md.png",
    description: "Our first photo together, when we became Head Boy and Head Girl.",
  },
  {
    id: 5,
    date: "February 8, 2024",
    title: "Scribble Day",
    image: "https://iili.io/2QzHo7V.md.jpg",
    description: "Our second photo together on Scribble Day. So many memories!",
  },
  {
    id: 6,
    date: "February 15, 2024",
    title: "Last Physical Meet",
    image: "https://iili.io/2QzCIcX.md.jpg",
    description: "The day we finally met in person. A day I'll never forget.",
  },
]

export default function LoveStory({ onContinue }: LoveStoryProps) {
  const [currentMilestone, setCurrentMilestone] = useState(0)

  const nextMilestone = () => {
    if (currentMilestone < storyMilestones.length - 1) {
      setCurrentMilestone(currentMilestone + 1)
    } else {
      onContinue()
    }
  }

  const prevMilestone = () => {
    if (currentMilestone > 0) {
      setCurrentMilestone(currentMilestone - 1)
    }
  }

  return (
    <div className="text-white text-center relative w-full h-full px-4 py-8 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Beautiful Odyssey </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMilestone}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 mb-4">
            <Image
              src={storyMilestones[currentMilestone].image || "/placeholder.svg"}
              alt={storyMilestones[currentMilestone].title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{storyMilestones[currentMilestone].date}</h3>
          <h4 className="text-lg md:text-xl font-semibold mb-2">{storyMilestones[currentMilestone].title}</h4>
          <p className="text-sm md:text-lg mb-4 max-w-md">{storyMilestones[currentMilestone].description}</p>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
        <motion.button
          className="bg-white text-pink-600 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevMilestone}
          disabled={currentMilestone === 0}
        >
          <FaChevronLeft size={24} />
        </motion.button>
        <motion.button
          className="bg-white text-pink-600 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextMilestone}
        >
          {currentMilestone < storyMilestones.length - 1 ? <FaChevronRight size={28} /> : "Continue"}
        </motion.button>
      </div>
      <p className="absolute bottom-20 left-0 right-0 text-sm opacity-75">Swipe left or right to navigate</p>
    </div>
  )
}

