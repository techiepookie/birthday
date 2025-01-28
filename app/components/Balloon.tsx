import { motion } from "framer-motion"

interface BalloonProps {
  color: string
}

export function Balloon({ color }: BalloonProps) {
  const randomX = Math.random() * 100
  const randomDelay = Math.random() * 2

  return (
    <motion.div
      className="absolute"
      initial={{ y: "100vh", x: `${randomX}vw` }}
      animate={{
        y: "-20vh",
        x: [`${randomX}vw`, `${randomX + Math.random() * 10}vw`, `${randomX - Math.random() * 10}vw`, `${randomX}vw`],
      }}
      transition={{
        duration: 15,
        delay: randomDelay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{ width: "30px", height: "40px" }}
    >
      <div className="w-full h-full rounded-t-full" style={{ backgroundColor: color }} />
      <div className="w-[2px] h-[20px] mx-auto" style={{ backgroundColor: color }} />
    </motion.div>
  )
}

