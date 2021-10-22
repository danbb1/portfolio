import Shape from "./Shape"

class Circle extends Shape {
  constructor(x, y, ctx, radius, strokeStyle, velocityX, velocityY) {
    super(x, y, ctx, strokeStyle, velocityX, velocityY)
    this.radius = radius
  }

  draw() {
    this.beginDraw()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.endDraw()
  }
}

export default Circle
