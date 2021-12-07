import Shape from './Shape';

class Circle extends Shape {
  draw() {
    this.beginDraw();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.endDraw();
  }
}

export default Circle;
