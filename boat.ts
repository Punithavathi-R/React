export class Boat {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    private speed: number = 20;
  
    constructor(x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    moveLeft() {
      this.x -= this.speed;
      if (this.x < 0) {
        this.x = 0;
      }
    }
  
    moveRight(canvasWidth: number) {
      this.x += this.speed;
      if (this.x + this.width > canvasWidth) {
        this.x = canvasWidth - this.width;
      }
    }
  
    draw(context: CanvasRenderingContext2D) {
      context.fillStyle = 'brown';
      context.fillRect(this.x, this.y, this.width, this.height);
      console.log('Boat drawn at', this.x, this.y);
    }
  }
  