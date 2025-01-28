import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const memories = [
  { id: 1, src: "/memory1.jpg", caption: "First day of high school" },
  { id: 2, src: "/memory2.jpg", caption: "Sweet 16 party" },
  { id: 3, src: "/memory3.jpg", caption: "Family vacation" },
  { id: 4, src: "/memory4.jpg", caption: "Prom night" },
  { id: 5, src: "/memory5.jpg", caption: "Graduation day" },
  { id: 6, src: "/memory6.jpg", caption: "Best friends forever" },
]

export default function MemoryWall() {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Rashi's Memory Wall</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <Image src={memory.src || "/placeholder.svg"} alt={memory.caption} layout="fill" objectFit="cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-sm">{memory.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

