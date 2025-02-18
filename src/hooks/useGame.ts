import { useRef, useEffect, useState } from 'react'
import { GameController } from '../controllers/GameController'
import type { GameConfig, Score } from '../types/game'

const DEFAULT_CONFIG: GameConfig = {
  canvasWidth: 800,
  canvasHeight: 600,
  paddleHeight: 100,
  paddleWidth: 20,
  ballRadius: 10,
  paddleSpeed: 5,
  ballSpeed: 7,
  maxBounceAngle: Math.PI / 3,
  FPS: 30
} as const

export const useGame = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  handPosition: number | null
): { score: Score; isPaused: boolean } => {
  const gameController = useRef<GameController | null>(null)
  const handPositionRef = useRef(handPosition)
  const [score, setScore] = useState({ player: 0, ai: 0 })
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    if (gameController.current) {
      const paused = handPosition === null
      setIsPaused(paused)
      gameController.current.setPaused(handPosition === null)
      handPositionRef.current = handPosition
    }
  }, [handPosition])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    gameController.current = new GameController(DEFAULT_CONFIG)
    gameController.current.setPaused(true) // Initalize as paused

    const interval = setInterval(() => {
      if (gameController.current) {
        gameController.current.update(handPositionRef.current)
        gameController.current.draw(ctx)
        setScore(gameController.current.getScore())
      }
    }, 1000 / DEFAULT_CONFIG.FPS)

    return () => {
      clearInterval(interval)
    }
  }, [canvasRef]) // Only recreate game loop when canvas changes
  return { score, isPaused }
}
