"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

export default function BirthdayWish() {
  const [showGift, setShowGift] = useState(false)

  const revealGift = () => {
    setShowGift(true)
  }

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={revealGift}
        className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-600 transition duration-300 mb-8"
      >
        Reveal Your Gift!
      </motion.button>
      {showGift && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Your Special Gift</h2>
            <p className="mb-4">
              Sarah, your smile lights up my world. I hope this birthday is as special as you are. Let's create more
              amazing memories together!
            </p>
            <button
              onClick={() => setShowGift(false)}
              className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

