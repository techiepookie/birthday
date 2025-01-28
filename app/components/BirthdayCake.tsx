"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

const Candle = ({ isLit, onBlow }) => (
  <motion.div
    className={`w-2 h-8 bg-yellow-200 rounded-full relative ${isLit ? "animate-flicker" : ""}`}
    whileHover={{ scale: 1.2 }}
  >
    {isLit && (
      <motion.div
        className="w-4 h-4 bg-orange-500 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
        onClick={onBlow}
      />
    )}
  </motion.div>
)

export default function BirthdayCake() {
  const [litCandles, setLitCandles] = useState(10)

  const handleBlow = () => {
    if (litCandles > 0) {
      setLitCandles((prev) => prev - 1)
    }
  }

  return (
    <div className="mb-8">
      <div className="flex justify-center space-x-2 mb-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Candle key={i} isLit={i < litCandles} onBlow={handleBlow} />
        ))}
      </div>
      <div className="w-64 h-32 bg-pink-300 rounded-t-full relative">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-pink-400 rounded-t-full" />
      </div>
      {litCandles === 0 && (
        <motion.p
          className="text-2xl font-bold text-white mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Yay! You blew out all the candles!
        </motion.p>
      )}
    </div>
  )
}

