import Shape from "./Shape"

class Triangle extends Shape {
  constructor(x, y, ctx, radius, strokeStyle, velocityX, velocityY) {
    super(x, y, ctx, strokeStyle, velocityX, velocityY)
    this.radius = radius
  }

  draw() {
    this.beginDraw()
    this.ctx.lineTo(
      this.x - this.radius + 2 * this.radius,
      this.y - this.radius / 3
    )
    this.ctx.lineTo(this.x, this.y - this.radius / 3 + 2 * this.radius)
    this.ctx.lineTo(this.x - this.radius, this.y - this.radius / 3)
    this.endDraw()
  }
}

export default Triangle
