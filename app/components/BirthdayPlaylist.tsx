import React, { useState } from "react"
import { motion } from "framer-motion"

const playlist = [
  { id: 1, title: "18", artist: "One Direction" },
  { id: 2, title: "Dancing Queen", artist: "ABBA" },
  { id: 3, title: "Teenage Dream", artist: "Katy Perry" },
  { id: 4, title: "Forever Young", artist: "Alphaville" },
  { id: 5, title: "I Gotta Feeling", artist: "The Black Eyed Peas" },
]

export default function BirthdayPlaylist() {
  const [currentSong, setCurrentSong] = useState(null)

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Rashi's Birthday Playlist</h2>
      <div className="bg-white bg-opacity-20 rounded-lg p-4">
        {playlist.map((song) => (
          <motion.div
            key={song.id}
            className={`p-2 mb-2 rounded-lg cursor-pointer ${currentSong === song.id ? "bg-white bg-opacity-30" : ""}`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setCurrentSong(song.id)}
          >
            <p className="font-bold">{song.title}</p>
            <p className="text-sm">{song.artist}</p>
          </motion.div>
        ))}
      </div>
      {currentSong && (
        <div className="mt-4 text-center">
          <p>Now playing: {playlist.find((song) => song.id === currentSong)?.title}</p>
          <p className="text-sm">by {playlist.find((song) => song.id === currentSong)?.artist}</p>
        </div>
      )}
    </div>
  )
}

