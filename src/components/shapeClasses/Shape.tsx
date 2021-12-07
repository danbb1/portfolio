enum StrokeStyle {
  RED = '#D64933',
  BLUE = '#99E1D9',
  YELLOW = '#D7F75B',
}

const getRandomEnumVal = <T,>(anEnum: T): T[keyof T] => {
  const enumValues = Object.values(anEnum) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);

  return enumValues[randomIndex];
};

abstract class Shape {
  public radius: 20;

  public x;

  public y;

  public readonly ctx;

  public velocityX;

  public velocityY;

  public rotationalVel;

  public readonly strokeStyle;

  private readonly lineWidth;

  private orientation;

  constructor(ctx: CanvasRenderingContext2D) {
    this.radius = 20;
    this.ctx = ctx;
    this.x = this.getRandomPoint(this.ctx.canvas.width);
    this.y = this.getRandomPoint(this.ctx.canvas.height);
    this.strokeStyle = getRandomEnumVal(StrokeStyle);
    console.log(this.strokeStyle);
    this.lineWidth = 4;
    this.velocityX = this.getRandomVel(3);
    this.velocityY = this.getRandomVel(3);
    this.orientation = 0.0;
    this.rotationalVel = this.getRandomRot();
  }

  getRandomPoint(max: number): number {
    return Math.floor(Math.random() * (max - 2 * this.radius) + this.radius);
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomVel(max: number): number {
    return ((Math.floor(Math.random() * max) + 1) / 2) * (Math.random() < 0.5 ? -1 : 1);
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomRot(): number {
    return Math.random() * 0.08 * (Math.random() < 0.5 ? -1 : 1);
  }

  beginDraw() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.orientation);
    this.ctx.translate(-this.x, -this.y);
  }

  endDraw() {
    this.ctx.restore();
    this.ctx.closePath();
    this.ctx.stroke();
  }

  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.orientation += this.rotationalVel;

    if (this.x + this.velocityX > this.ctx.canvas.width || this.x + this.velocityX < 0) {
      this.velocityX = -this.velocityX;
    }

    if (this.y + this.velocityY > this.ctx.canvas.height || this.y + this.velocityY < 0) {
      this.velocityY = -this.velocityY;
    }
  }
}

export default Shape;
