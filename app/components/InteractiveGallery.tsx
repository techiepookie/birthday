import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const images = [
  { id: 1, src: "/images/rashi-1.jpg", caption: "Beach day with friends" },
  { id: 2, src: "/images/rashi-2.jpg", caption: "Family vacation in Paris" },
  { id: 3, src: "/images/rashi-3.jpg", caption: "Prom night" },
  { id: 4, src: "/images/rashi-4.jpg", caption: "Volunteering at the animal shelter" },
  { id: 5, src: "/images/rashi-5.jpg", caption: "First place in debate competition" },
  { id: 6, src: "/images/rashi-6.jpg", caption: "Learning to drive" },
]

export default function InteractiveGallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-4xl font-bold mb-8">Rashi's Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
        {images.map((image) => (
          <motion.div
            key={image.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.caption}
              width={300}
              height={200}
              className="rounded-lg cursor-pointer"
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-4 rounded-lg max-w-3xl"
            >
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.caption}
                width={800}
                height={600}
                className="rounded-lg"
              />
              <p className="text-black text-center mt-4">{selectedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

