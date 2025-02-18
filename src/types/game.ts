export interface Position {
  x: number
  y: number
}

export interface Ball extends Position {
  dx: number
  dy: number
  radius: number
  speedMultiplier: number
}

export interface Paddle {
  y: number
  height: number
  width: number
}

export interface Score {
  player: number
  ai: number
}

export interface GameState {
  readonly playerPaddle: Paddle
  readonly aiPaddle: Paddle
  readonly ball: Ball
  readonly score: Score
}

export interface GameConfig {
  readonly canvasWidth: number
  readonly canvasHeight: number
  readonly paddleHeight: number
  readonly paddleWidth: number
  readonly ballRadius: number
  readonly paddleSpeed: number
  readonly ballSpeed: number
  readonly maxBounceAngle: number
  readonly FPS: number
}
