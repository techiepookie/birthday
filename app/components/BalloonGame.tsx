"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const colors = ["red", "blue", "green", "yellow", "purple"]

const Balloon = ({ color, onClick }) => (
  <motion.div
    className={`w-16 h-20 rounded-full bg-${color}-500 cursor-pointer`}
    initial={{ y: "100vh" }}
    animate={{ y: "-100vh" }}
    transition={{ duration: Math.random() * 2 + 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
    onClick={onClick}
  />
)

export default function BalloonGame() {
  const [score, setScore] = useState(0)
  const [balloons, setBalloons] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (balloons.length < 5) {
        setBalloons((prev) => [
          ...prev,
          {
            id: Date.now(),
            color: colors[Math.floor(Math.random() * colors.length)],
          },
        ])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [balloons])

  const handlePop = (id) => {
    setBalloons((prev) => prev.filter((balloon) => balloon.id !== id))
    setScore((prev) => prev + 1)
  }

  return (
    <div className="w-full h-96 relative overflow-hidden">
      <div className="absolute top-4 left-4 bg-white rounded-full px-4 py-2 text-xl font-bold">Score: {score}</div>
      {balloons.map((balloon) => (
        <Balloon key={balloon.id} color={balloon.color} onClick={() => handlePop(balloon.id)} />
      ))}
    </div>
  )
}

