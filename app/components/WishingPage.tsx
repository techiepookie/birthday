import React, { useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import confetti from "canvas-confetti"
import { Balloon } from "./Balloon"

interface WishingPageProps {
  onContinue: () => void
}

const photos = [
  { src: "https://iili.io/2Qz3o6g.md.jpg", alt: "Rashi's beautiful smile" },
  { src: "https://iili.io/2Qz2hEg.md.jpg", alt: "Rashi's candid moment" },
  { src: "https://iili.io/2QzFQXS.md.jpg", alt: "Rashi's celebration" },
]

export default function WishingPage({ onContinue }: WishingPageProps) {
  useEffect(() => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }),
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }),
      )
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
      {/* Floating Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <Balloon key={i} color={`hsl(${i * 36}, 70%, 50%)`} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Happy Birthday Rashi! 🎉</h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="relative w-64 h-64 rounded-lg overflow-hidden shadow-xl"
            >
              <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8"
        >
          On this special day, I want to celebrate the amazing person you are. Your smile lights up my world, your
          kindness touches hearts, and your presence makes every moment beautiful. Here's to you, my dear Rashi, may
          this year bring you all the joy and happiness you deserve! 💖
        </motion.p>

        <motion.button
          className="bg-white text-pink-600 px-8 py-4 rounded-full text-xl font-bold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
        >
          Open Your Gifts 🎁
        </motion.button>
      </motion.div>
    </div>
  )
}

