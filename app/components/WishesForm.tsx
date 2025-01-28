"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function WishesForm() {
  const [name, setName] = useState("")
  const [wish, setWish] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to a server
    console.log("Submitted:", { name, wish })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mt-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
        <p>Your birthday wish for Rashi has been recorded.</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Leave a Birthday Wish for Rashi</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 rounded-lg text-purple-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="wish" className="block mb-2">
            Your Wish:
          </label>
          <textarea
            id="wish"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            required
            className="w-full p-2 rounded-lg text-purple-900"
            rows={4}
          />
        </div>
        <motion.button
          type="submit"
          className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Wish
        </motion.button>
      </form>
    </div>
  )
}

