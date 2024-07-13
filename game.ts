import { Boat } from './boat';
import { Parachutist } from './parachutist';

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private boat: Boat;
  private parachutists: Parachutist[] = [];
  private score: number = 0;
  private lives: number = 3;
  private isGameOver: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.boat = new Boat(this.canvas.width / 2 - 50, this.canvas.height - 30, 100, 20);
    
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    console.log('Game initialized');
  }

  start() {
    console.log('Game started');
    this.spawnParachutist();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.boat.moveLeft();
      console.log('Boat moved left');
    } else if (event.key === 'ArrowRight') {
      this.boat.moveRight(this.canvas.width);
      console.log('Boat moved right');
    }
  }

  private spawnParachutist() {
    const parachutist = new Parachutist(Math.random() * (this.canvas.width - 20), 0, 2 + Math.random() * 3);
    this.parachutists.push(parachutist);
    console.log('Parachutist spawned', parachutist);

    setTimeout(() => this.spawnParachutist(), 2000);
  }

  private update() {
    this.parachutists.forEach((parachutist) => {
      parachutist.update();
    });

    this.parachutists = this.parachutists.filter((parachutist) => {
      if (parachutist.y > this.canvas.height) {
        this.lives -= 1;
        console.log('Parachutist missed', parachutist);
        if (this.lives <= 0) {
          this.isGameOver = true;
        }
        return false;
      }

      if (
        parachutist.y + 20 >= this.canvas.height - this.boat.height &&
        parachutist.x >= this.boat.x &&
        parachutist.x <= this.boat.x + this.boat.width
      ) {
        this.score += 10;
        console.log('Parachutist caught', parachutist);
        return false;
      }

      return true;
    });
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw boat
    this.boat.draw(this.context);

    // Draw parachutists
    this.parachutists.forEach((parachutist) => {
      parachutist.draw(this.context);
    });

    // Draw score and lives
    this.context.fillStyle = 'black';
    this.context.font = '20px Arial';
    this.context.fillText(`Score: ${this.score}`, 10, 20);
    this.context.fillText(`Lives: ${this.lives}`, 10, 50);

    if (this.isGameOver) {
      this.context.fillStyle = 'red';
      this.context.font = '50px Arial';
      this.context.fillText('Game Over', this.canvas.width / 2 - 150, this.canvas.height / 2);
    }
    console.log('Canvas drawn');
  }

  private gameLoop() {
    if (!this.isGameOver) {
      this.update();
      this.draw();
      requestAnimationFrame(this.gameLoop.bind(this));
      console.log('Game loop running');
    }
  }
}
