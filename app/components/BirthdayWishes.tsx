import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

const initialWishes = [
  {
    id: 1,
    name: "Mom & Dad",
    message: "Happy 18th birthday, Rashi! We're so proud of the amazing young woman you've become.",
  },
  {
    id: 2,
    name: "Best Friend Anya",
    message: "Rashi, you're finally 18! Can't wait to celebrate with you. Love you loads!",
  },
  {
    id: 3,
    name: "Grandma",
    message: "My dearest Rashi, wishing you all the happiness in the world on your special day.",
  },
]

export default function BirthdayWishes() {
  const [wishes, setWishes] = useState(initialWishes)
  const [newWish, setNewWish] = useState({ name: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setWishes([...wishes, { id: wishes.length + 1, ...newWish }])
    setNewWish({ name: "", message: "" })
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-4xl font-bold mb-8">Birthday Wishes for Rashi</h2>
      <div className="max-w-4xl w-full">
        <div className="mb-8 max-h-96 overflow-y-auto">
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 mb-4"
            >
              <h3 className="font-bold">{wish.name}</h3>
              <p>{wish.message}</p>
            </motion.div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={newWish.name}
            onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
            className="w-full mb-2 p-2 rounded bg-white bg-opacity-50 text-black"
            required
          />
          <textarea
            placeholder="Your Wish"
            value={newWish.message}
            onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
            className="w-full mb-2 p-2 rounded bg-white bg-opacity-50 text-black"
            required
          ></textarea>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
            Send Wish
          </button>
        </form>
      </div>
    </div>
  )
}

