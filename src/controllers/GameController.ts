import type { GameState, GameConfig, Ball, Paddle } from '../types/game'

export class GameController {
  private readonly state: GameState
  private readonly config: GameConfig
  private isPaused: boolean = false

  constructor(config: GameConfig) {
    this.config = config
    this.state = this.getInitialState()
  }

  private getInitialState(): GameState {
    return {
      playerPaddle: {
        y: this.config.canvasHeight / 2,
        height: this.config.paddleHeight,
        width: this.config.paddleWidth
      },
      aiPaddle: {
        y: this.config.canvasHeight / 2,
        height: this.config.paddleHeight,
        width: this.config.paddleWidth
      },
      ball: {
        x: this.config.canvasWidth / 2,
        y: this.config.canvasHeight / 2,
        dx: this.config.ballSpeed,
        dy: this.config.ballSpeed,
        radius: this.config.ballRadius,
        speedMultiplier: 1.1
      },
      score: {
        player: 0,
        ai: 0
      }
    }
  }

  public setPaused(paused: boolean): void {
    this.isPaused = paused
  }

  // Do not let paddle move out of game
  private clampPaddlePosition(y: number, paddleHeight: number): number {
    return Math.max(
      paddleHeight / 2,
      Math.min(this.config.canvasHeight - paddleHeight / 2, y)
    )
  }

  private readonly SMOOTHING_FACTOR = 0.3 // Adjust between 0 and 1 (lower = smoother but more lag)

  // Vertical position of the hand (0-1)
  public updatePlayerPaddle(handY: number | null): void {
    if (handY !== null) {
      const targetY = handY * this.config.canvasHeight
      const currentY = this.state.playerPaddle.y

      // Smooth interpolation between current and target position to mediate shaky hands
      const newY = currentY + (targetY - currentY) * this.SMOOTHING_FACTOR
      this.state.playerPaddle.y = this.clampPaddlePosition(
        newY,
        this.state.playerPaddle.height
      )
    }
  }

  private updateAIPaddle(): void {
    const aiPaddle = this.state.aiPaddle
    const ball = this.state.ball

    const paddleCenter = aiPaddle.y
    const targetY = ball.y

    if (Math.abs(paddleCenter - targetY) > this.config.paddleSpeed) {
      const newY =
        aiPaddle.y + this.config.paddleSpeed * Math.sign(targetY - paddleCenter)
      // Clamp the AI paddle position within screen bounds
      aiPaddle.y = this.clampPaddlePosition(newY, aiPaddle.height)
    }
  }

  private updateBall(): void {
    const ball = this.state.ball

    ball.x += ball.dx
    ball.y += ball.dy

    // Wall collisions
    if (
      ball.y <= ball.radius ||
      ball.y >= this.config.canvasHeight - ball.radius
    ) {
      ball.dy *= -1
    }

    // Paddle collisions
    const playerPaddleHit = this.checkPaddleCollision(
      this.state.playerPaddle,
      ball
    )
    const aiPaddleHit = this.checkPaddleCollision(this.state.aiPaddle, ball)

    if (playerPaddleHit || aiPaddleHit) {
      const paddle = playerPaddleHit
        ? this.state.playerPaddle
        : this.state.aiPaddle

      // Calculate relative intersect point (-0.5 to 0.5)
      const relativeIntersectY = (paddle.y - ball.y) / (paddle.height / 2)
      const bounceAngle = relativeIntersectY * this.config.maxBounceAngle

      // Increase speed but cap it at 200%
      ball.speedMultiplier = Math.min(
        ball.speedMultiplier * ball.speedMultiplier,
        2
      )

      // Calculate new velocity with increased speed
      const speed = this.config.ballSpeed * ball.speedMultiplier
      ball.dx = Math.cos(bounceAngle) * speed * (playerPaddleHit ? 1 : -1)
      ball.dy = -Math.sin(bounceAngle) * speed
    }

    // Scoring
    if (ball.x <= 0) {
      this.state.score.ai += 1
      this.resetBall()
    } else if (ball.x >= this.config.canvasWidth) {
      this.state.score.player += 1
      this.resetBall()
    }
  }

  private checkPaddleCollision(paddle: Paddle, ball: Ball): boolean {
    const paddleLeft =
      paddle === this.state.playerPaddle
        ? 0
        : this.config.canvasWidth - paddle.width
    return (
      ball.x - ball.radius < paddleLeft + paddle.width &&
      ball.x + ball.radius > paddleLeft &&
      ball.y > paddle.y - paddle.height / 2 &&
      ball.y < paddle.y + paddle.height / 2
    )
  }

  private resetBall(): void {
    const ball = this.state.ball
    ball.x = this.config.canvasWidth / 2
    ball.y = this.config.canvasHeight / 2
    ball.speedMultiplier = 1.1 // Reset speed multiplier
    ball.dx = this.config.ballSpeed * (Math.random() > 0.5 ? 1 : -1)
    ball.dy = this.config.ballSpeed * (Math.random() > 0.5 ? 1 : -1)
  }

  public update(handPosition: number | null): void {
    // Only update game state if not paused
    if (!this.isPaused) {
      this.updatePlayerPaddle(handPosition)
      this.updateAIPaddle()
      this.updateBall()
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    // Clear canvas
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight)

    // Draw center line
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 5
    ctx.setLineDash([15, 10]) // Creates dashed line pattern [dash length, gap length]
    ctx.beginPath()
    ctx.moveTo(this.config.canvasWidth / 2, 0)
    ctx.lineTo(this.config.canvasWidth / 2, this.config.canvasHeight)
    ctx.stroke()
    ctx.setLineDash([]) // Reset line dash pattern for other drawings

    // Draw paddles
    ctx.fillStyle = 'white'
    ctx.fillRect(
      0,
      this.state.playerPaddle.y - this.state.playerPaddle.height / 2,
      this.state.playerPaddle.width,
      this.state.playerPaddle.height
    )
    ctx.fillRect(
      this.config.canvasWidth - this.state.aiPaddle.width,
      this.state.aiPaddle.y - this.state.aiPaddle.height / 2,
      this.state.aiPaddle.width,
      this.state.aiPaddle.height
    )

    // Draw ball
    ctx.beginPath()
    ctx.arc(
      this.state.ball.x,
      this.state.ball.y,
      this.state.ball.radius,
      0,
      Math.PI * 2
    )
    ctx.fill()

    // Draw score
    // ctx.font = '48px Arial';
    // ctx.fillText(this.state.score.player.toString(), this.config.canvasWidth / 4, 50);
    // ctx.fillText(this.state.score.ai.toString(), (3 * this.config.canvasWidth) / 4, 50);

    if (this.isPaused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight)
    }
  }

  public getScore(): { player: number; ai: number } {
    return { ...this.state.score }
  }
}
