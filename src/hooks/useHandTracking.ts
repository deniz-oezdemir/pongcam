import { useEffect, useState } from 'react'
import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'

interface HandPosition {
  y: number
}

export const useHandTracking = (videoElement: HTMLVideoElement | null) => {
  const [handPosition, setHandPosition] = useState<HandPosition | null>(null)

  useEffect(() => {
    if (!videoElement) return

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      }
    })

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 0, // TODO: check if 0 better for performance than 1
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })

    hands.onResults((results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const hand = results.multiHandLandmarks[0]
        const rawY = hand[8].y // 8 for index finger tip, 0 for wrist

        // Apply sensitivity multiplier (adjust these values to tune sensitivity)
        const sensitivity = 2.5 // Increase this value for more sensitivity
        const centerPoint = 0.5 // Center point of the movement range
        const scaledY = centerPoint + (rawY - centerPoint) * sensitivity

        // Clamp the value between 0 and 1
        const clampedY = Math.max(0, Math.min(1, scaledY))

        setHandPosition({ y: clampedY })
      } else {
        setHandPosition(null)
      }
    })

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement })
      },
      width: 320,
      height: 240
    })

    camera.start()

    return () => {
      camera.stop()
      hands.close()
    }
  }, [videoElement])

  return handPosition
}
