import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const memories = [
  { year: 2005, event: "Born", image: "/images/baby-rashi.jpg" },
  { year: 2010, event: "First Day of School", image: "/images/school-rashi.jpg" },
  { year: 2015, event: "Won Science Fair", image: "/images/science-fair-rashi.jpg" },
  { year: 2020, event: "Sweet 16", image: "/images/sweet-16-rashi.jpg" },
  { year: 2023, event: "Graduation", image: "/images/graduation-rashi.jpg" },
]

export default function MemoryTimeline() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-4xl font-bold mb-8">Rashi's Journey</h2>
      <div className="relative w-full max-w-4xl">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.year}
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? "text-right pr-4" : "text-left pl-4"}`}>
              <h3 className="text-2xl font-bold">{memory.year}</h3>
              <p>{memory.event}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Image
                src={memory.image || "/placeholder.svg"}
                alt={memory.event}
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <div className={`w-1/2 ${index % 2 === 0 ? "text-left pl-4" : "text-right pr-4"}`}></div>
          </motion.div>
        ))}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white"></div>
      </div>
    </div>
  )
}

