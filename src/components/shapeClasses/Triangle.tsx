import Shape from './Shape';

class Triangle extends Shape {
  draw() {
    this.beginDraw();
    this.ctx.lineTo(this.x - this.radius + 2 * this.radius, this.y - this.radius / 3);
    this.ctx.lineTo(this.x, this.y - this.radius / 3 + 2 * this.radius);
    this.ctx.lineTo(this.x - this.radius, this.y - this.radius / 3);
    this.endDraw();
  }
}

export default Triangle;
