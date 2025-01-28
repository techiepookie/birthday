import React, { useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

interface BirthdayWishProps {
  onContinue: () => void
}

export default function BirthdayWish({ onContinue }: BirthdayWishProps) {
  useEffect(() => {
    const duration = 15 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(
        Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }),
      )
      confetti(
        Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }),
      )
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-white text-center">
      <motion.h1
        className="text-6xl md:text-8xl font-bold mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        Happy Birthday, My Love!
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Rashi, you light up my world. Here's to many more beautiful moments together!
      </motion.p>
      <motion.button
        className="bg-white text-red-600 px-6 py-3 rounded-full text-xl font-bold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
      >
        Choose Your Gift
      </motion.button>
    </div>
  )
}

