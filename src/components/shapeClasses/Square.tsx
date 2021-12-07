import Shape from './Shape';

class Square extends Shape {
  draw() {
    this.beginDraw();
    this.ctx.rect(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
    this.endDraw();
  }
}

export default Square;
