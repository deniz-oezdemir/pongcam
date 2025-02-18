import { useRef, useState } from 'react'
import WebcamComponent from './components/WebcamComponent'
import { useHandTracking } from './hooks/useHandTracking'
import { useGame } from './hooks/useGame'
import './App.css'

function App() {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  )
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handPosition = useHandTracking(videoElement)
  const { score, isPaused } = useGame(canvasRef, handPosition?.y ?? null)

  return (
    <div className="game-container">
      <div className="side-container">
        <div className="score">{score.player}</div>
        <WebcamComponent onVideoRef={setVideoElement} />
      </div>
      <div className="main-container">
        <div className="instructions">
          👉 Enable your webcam to control the paddle with your index finger 👈
        </div>
        <canvas ref={canvasRef} width={800} height={600} />
        <div className={`pause-message ${!isPaused ? 'hidden' : ''}`}>
          👋 Show your hand to play
        </div>
      </div>
      <div className="side-container">
        <div className="score">{score.ai}</div>
        <div className="robot-container">
          <h1>🤖</h1>
        </div>
      </div>
    </div>
  )
}

export default App
