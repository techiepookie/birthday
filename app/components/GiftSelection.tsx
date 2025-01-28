import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GiftSelectionProps {
  triggerConfetti: () => void
}

const gifts = [
  {
    id: 1,
    name: "Let's Meet & Chat",
    description: "Let's spend some quality time together, share stories, and create new memories.",
    emoji: "☕",
  },
  {
    id: 2,
    name: "Surprise Date",
    description: "A special evening planned just for you, with lots of surprises.",
    emoji: "🌟",
  },
  {
    id: 3,
    name: "Movie & Dinner",
    description: "Your favorite movie followed by dinner at your chosen restaurant.",
    emoji: "🎬",
  },
]

export default function GiftSelection({ triggerConfetti }: GiftSelectionProps) {
  const [selectedGift, setSelectedGift] = useState<number | null>(null)
  const [revealedGift, setRevealedGift] = useState<number | null>(null)

  const handleGiftClick = (giftId: number) => {
    if (revealedGift === null) {
      setSelectedGift(giftId)
    }
  }

  const handleReveal = () => {
    if (selectedGift !== null) {
      setRevealedGift(selectedGift)
      triggerConfetti()
    }
  }

  return (
    <div className="text-white text-center px-4 py-8 h-full overflow-y-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Special Gift</h2>
      <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
        {gifts.map((gift) => (
          <motion.div
            key={gift.id}
            className={`relative cursor-pointer ${
              revealedGift !== null && revealedGift !== gift.id ? "opacity-50" : ""
            }`}
            whileHover={{ scale: revealedGift === null ? 1.05 : 1 }}
            whileTap={{ scale: revealedGift === null ? 0.95 : 1 }}
            onClick={() => handleGiftClick(gift.id)}
          >
            <div
              className={`
              bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg 
              rounded-lg p-6 h-full
              ${selectedGift === gift.id ? "border-4 border-yellow-400" : ""}
            `}
            >
              <AnimatePresence mode="wait">
                {revealedGift === gift.id ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <div className="text-6xl mb-4">{gift.emoji}</div>
                    <h3 className="text-2xl font-bold mb-2">{gift.name}</h3>
                    <p>{gift.description}</p>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-6xl">
                    🎁
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedGift !== null && revealedGift === null && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white text-pink-600 px-8 py-4 rounded-full text-xl font-bold"
          onClick={handleReveal}
        >
          Reveal Your Gift 🎉
        </motion.button>
      )}

      {revealedGift !== null && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-2xl">
          <p>I can't wait to celebrate with you! 💖</p>
          <p className="text-lg mt-2">This is just the beginning of making your birthday special!</p>
        </motion.div>
      )}
    </div>
  )
}

