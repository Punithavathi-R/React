import { Game } from './game';

window.onload = () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  if (canvas) {
    console.log('Canvas initialized');
    const game = new Game(canvas);
    game.start();
  } else {
    console.error('Canvas not found');
  }
};
