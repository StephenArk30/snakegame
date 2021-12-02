type SnakeGameConfig = {
  ai?: boolean,
}

export class SnakeGame {
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;

  constructor(canvasId: string | HTMLCanvasElement = 'snake_container', config: SnakeGameConfig = {}) {
    console.log('constructing');
    if (typeof canvasId === 'string') this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    else this.canvas = canvasId;
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) throw new Error('no canvas')
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default SnakeGame;
