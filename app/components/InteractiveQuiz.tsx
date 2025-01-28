import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface InteractiveQuizProps {
  onContinue: () => void
}

const questions = [
  {
    question: "What's Rashi's favorite color?",
    options: ["Blue", "Purple", "Pink", "Green"],
    correctAnswer: 1,
  },
  {
    question: "What's Rashi's dream travel destination?",
    options: ["Paris", "Tokyo", "New York", "Bali"],
    correctAnswer: 3,
  },
  {
    question: "What's Rashi's favorite subject in school?",
    options: ["Math", "Science", "Literature", "Art"],
    correctAnswer: 2,
  },
  {
    question: "What's Rashi's favorite food?",
    options: ["Pizza", "Sushi", "Tacos", "Pasta"],
    correctAnswer: 1,
  },
  {
    question: "What's Rashi's favorite hobby?",
    options: ["Reading", "Dancing", "Painting", "Photography"],
    correctAnswer: 3,
  },
]

export default function InteractiveQuiz({ onContinue }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  return (
    <div className="text-white text-center">
      <h2 className="text-4xl font-bold mb-8">How Well Do You Know Rashi?</h2>
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl mb-4">{questions[currentQuestion].question}</h3>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  className="bg-white text-red-600 px-4 py-2 rounded-full text-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl mb-4">Quiz Complete!</h3>
            <p className="text-xl mb-4">
              You scored {score} out of {questions.length}
            </p>
            <motion.button
              className="bg-white text-yellow-600 px-6 py-3 rounded-full text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
            >
              Continue to Future Dreams
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

