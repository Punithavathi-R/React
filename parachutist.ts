export class Parachutist {
    public x: number;
    public y: number;
    private speed: number;
  
    constructor(x: number, y: number, speed: number) {
      this.x = x;
      this.y = y;
      this.speed = speed;
    }
  
    update() {
      this.y += this.speed;
      console.log('Parachutist updated to', this.y);
    }
  
    draw(context: CanvasRenderingContext2D) {
      context.fillStyle = 'red';
      context.beginPath();
      context.arc(this.x, this.y, 10, 0, Math.PI * 2);
      context.fill();
      console.log('Parachutist drawn at', this.x, this.y);
    }
  }
  