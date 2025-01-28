"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaPlay, FaPause, FaForward, FaMusic } from "react-icons/fa"
import Image from "next/image"

interface MusicPlayerProps {
  isPlaying: boolean
  togglePlay: () => void
  songTitle: string
  artist: string
  imageUrl: string
  nextSong: () => void
  showPrompt: boolean
  audioError: string | null
}

export default function MusicPlayer({
  isPlaying,
  togglePlay,
  songTitle,
  artist,
  imageUrl,
  nextSong,
  showPrompt,
  audioError,
}: MusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* Music Prompt */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg px-4 py-2 z-40 shadow-lg"
          >
            <p className="text-pink-600 text-sm font-medium">Play your favorite music first! 🎵</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Icon Button */}
      <motion.button
        className="fixed top-4 right-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full p-4 z-50 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <FaMusic className="text-white text-xl" />
      </motion.button>

      {/* Expanded Music Player */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={playerRef}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed top-20 right-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 z-50 shadow-lg w-64"
          >
            <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden group">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Album Art"
                layout="fill"
                objectFit="cover"
                className="rounded-lg transform transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity opacity-0 group-hover:opacity-100" />
            </div>
            <div className="mb-4">
              <motion.p
                className="text-white font-semibold truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {songTitle}
              </motion.p>
              <motion.p
                className="text-white text-sm opacity-75 truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {artist}
              </motion.p>
            </div>
            {audioError ? (
              <motion.p
                className="text-red-500 text-sm mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {audioError}
              </motion.p>
            ) : (
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-colors"
                >
                  {isPlaying ? <FaPause className="text-white text-xl" /> : <FaPlay className="text-white text-xl" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSong}
                  className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-colors"
                >
                  <FaForward className="text-white text-xl" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

