import Shape from "./Shape"

class Square extends Shape {
  constructor(
    x,
    y,
    ctx,
    radius,
    strokeStyle,
    velocityX,
    velocityY,
    rotationalVel
  ) {
    super(x, y, ctx, strokeStyle, velocityX, velocityY, rotationalVel)
    this.radius = radius
  }

  draw() {
    this.beginDraw()
    this.ctx.rect(
      this.x - this.radius,
      this.y - this.radius,
      2 * this.radius,
      2 * this.radius
    )
    this.endDraw()
  }
}

export default Square
