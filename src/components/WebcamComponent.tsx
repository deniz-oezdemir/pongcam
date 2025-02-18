import React, { useRef } from 'react'
import Webcam from 'react-webcam'

const WEBCAM_CONFIG = {
  width: 320,
  height: 240,
  facingMode: 'user',
  frameRate: { ideal: 30, max: 30 } // TODO: check on different devices whether reduced webcam framerate helps reducing lag if any
}

interface WebcamComponentProps {
  onVideoRef: (video: HTMLVideoElement | null) => void;
  mirrored?: boolean;
}

const WebcamComponent: React.FC<WebcamComponentProps> = ({
  onVideoRef,
  mirrored = true
}) => {
  const webcamRef = useRef<Webcam>(null)

  return (
    <div className="webcam-container">
      <Webcam
        ref={webcamRef}
        width={WEBCAM_CONFIG.width}
        height={WEBCAM_CONFIG.height}
        videoConstraints={WEBCAM_CONFIG}
        mirrored={mirrored}
        onLoadedMetadata={() => {
          if (webcamRef.current) {
            onVideoRef(webcamRef.current.video)
          }
        }}
      />
    </div>
  )
}

export default WebcamComponent
