class Shape {
  constructor(x, y, ctx, strokeStyle, velocityX, velocityY) {
    this.x = x
    this.y = y
    this.ctx = ctx
    this.strokeStyle = strokeStyle
    this.lineWidth = 4
    this.velocityX = velocityX
    this.velocityY = velocityY
    this.orientation = 0
    this.centre = [x, y]
  }

  beginDraw() {
    this.ctx.beginPath()
    this.ctx.lineWidth = this.lineWidth
    this.ctx.strokeStyle = this.strokeStyle
  }

  endDraw() {
    // this.ctx.translate(this.x, this.y)
    // this.ctx.rotate(this.orientation)
    this.ctx.closePath()
    this.ctx.stroke()
  }

  move() {
    this.x += this.velocityX
    this.y += this.velocityY
    // this.orientation += 1

    if (
      this.x + this.velocityX > this.ctx.canvas.width ||
      this.x + this.velocityX < 0
    )
      this.velocityX = -this.velocityX

    if (
      this.y + this.velocityY > this.ctx.canvas.height ||
      this.y + this.velocityY < 0
    )
      this.velocityY = -this.velocityY
  }
}

export default Shape
