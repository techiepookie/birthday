"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import IntroSection from "./components/IntroSection"
import LoveStory from "./components/LoveStory"
import BirthdayWish from "./components/BirthdayWish"
import WishingPage from "./components/WishingPage"
import GiftSelection from "./components/GiftSelection"
import MusicPlayer from "./components/MusicPlayer"
import sound from "/public/Rashi.mp3"

const songs = [
  {
    title: "Co2",
    artist: "Prateek Kuhad",
    src: "/music/cant-help-falling-in-love.mp3",
    image: "https://iili.io/2QfIpJj.jpg",
  },
  {
    title: "Rashi",
    artist: "Nikhil",
    src: "/public/Rashi.mp3",
    image: "https://iili.io/2QzEOsS.png",
  },
  {
    title: "If the World Was Ending",
    artist: "JP Saxe ft. Julia Michaels",
    src: "https://jmp.sh/s/sQ8YvQOI6hKMiVlWeLNv",
    image: "https://iili.io/2QfTN7j.jpg",
  },
]

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [showMusicPrompt, setShowMusicPrompt] = useState(true)
  const [audioError, setAudioError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const confettiAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const loadAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.pause()
        }
        audioRef.current = new Audio(songs[currentSong].src)
        audioRef.current.loop = true
        await audioRef.current.load()
        setAudioError(null)
      } catch (error) {
        console.error("Error loading audio:", error)
        setAudioError("Failed to load audio. Please check your internet connection or try again later.")
      }
    }

    loadAudio()
    confettiAudioRef.current = new Audio("/sounds/confetti-pop.mp3")

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [currentSong])

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        if (isMusicPlaying) {
          try {
            await audioRef.current.play()
            setShowMusicPrompt(false)
            setAudioError(null)
          } catch (error) {
            console.error("Audio playback error:", error)
            setAudioError("Failed to play audio. Please check your internet connection or try again later.")
          }
        } else {
          audioRef.current.pause()
        }
      }
    }

    playAudio()
  }, [isMusicPlaying])

  const playConfettiSound = () => {
    if (confettiAudioRef.current) {
      confettiAudioRef.current.play().catch((error) => console.log("Confetti sound error:", error))
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    playConfettiSound()
  }

  const nextSong = () => {
    setCurrentSong((prevSong) => (prevSong + 1) % songs.length)
  }

  const sections = [
    { component: <IntroSection onContinue={() => setCurrentSection(1)} />, bg: "from-purple-600 to-pink-500" },
    { component: <LoveStory onContinue={() => setCurrentSection(2)} />, bg: "from-pink-500 to-red-500" },
    {
      component: <BirthdayWish onContinue={() => setCurrentSection(3)} triggerConfetti={triggerConfetti} />,
      bg: "from-red-500 to-yellow-500",
    },
    {
      component: <WishingPage onContinue={() => setCurrentSection(4)} triggerConfetti={triggerConfetti} />,
      bg: "from-yellow-500 to-orange-500",
    },
    { component: <GiftSelection triggerConfetti={triggerConfetti} />, bg: "from-orange-500 to-green-400" },
  ]

  return (
    <main className="h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          className={`h-full w-full flex items-center justify-center bg-gradient-to-br ${sections[currentSection].bg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>
      <MusicPlayer
        isPlaying={isMusicPlaying}
        togglePlay={() => setIsMusicPlaying(!isMusicPlaying)}
        songTitle={songs[currentSong].title}
        artist={songs[currentSong].artist}
        imageUrl={songs[currentSong].image}
        nextSong={nextSong}
        showPrompt={showMusicPrompt}
        audioError={audioError}
      />
    </main>
  )
}

