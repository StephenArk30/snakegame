import Snake, { SnakeDirection } from './snake';
import { MapNode, random } from './common';
import Food from './food';

type SnakeGameConfig = {
  ai?: boolean,
  col?: number,
  row?: number,
  snakeColor?: string,
  bgColor?: string,
  direction?: SnakeDirection,
}

const defaultConfig: SnakeGameConfig = {
  col: 10,
  row: 10,
  snakeColor: '#fff',
  bgColor: '#000',
};

export class SnakeGameEnv {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  config: SnakeGameConfig = {};
  snake: Snake | null = null;
  food: Food | null = null;
  gridA: number = 0;
  score: number = 0;

  constructor(
    canvasId: string | HTMLCanvasElement = 'snake_container',
    config: SnakeGameConfig = {},
  ) {
    this.canvas = typeof canvasId === 'string'
      ? document.getElementById(canvasId) as HTMLCanvasElement
      : canvasId;
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) throw new Error('no canvas');
    this.config = {
      ...defaultConfig,
      ...config,
    };
    this.config.col = Math.min(this.config.col as number, this.canvas.width);
    this.config.row = Math.min(this.config.row as number, this.canvas.height);
    this.canvas.width -= this.canvas.width % this.config.col;
    this.gridA = this.canvas.width / this.config.col;
    this.canvas.height = this.config.row * this.gridA;
  }

  randomNode() {
    let col = random.randRange(this.config.col as number - 1);
    let row = random.randRange(this.config.row as number - 1);
    if (this.snake) {
      while (this.snake.includes(new MapNode(col, row))) {
        col = random.randRange(this.config.col as number - 1);
        row = random.randRange(this.config.row as number - 1);
      }
    }
    return new MapNode(col, row);
  }

  reset() {
    this.snake = new Snake({
      head: this.randomNode(),
      ctx: this.ctx as CanvasRenderingContext2D,
      color: this.config.snakeColor as string,
      direction: this.config.direction,
    });
    this.food = new Food(
      this.randomNode(),
      this.ctx as CanvasRenderingContext2D,
      this.gridA,
      this.config.snakeColor as string,
      this.config.bgColor as string,
    );
    this.score = 0;
  }

  fillCanvas() {
    this.ctx!.fillStyle = this.config.bgColor as string;
    this.ctx!.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    this.fillCanvas();
    this.food!.draw();
  }

  step() {
    this.snake!.move();
    if (this.snake!.includes(this.food as MapNode)) {
      this.score += 1;
    }
  }
}

export default SnakeGameEnv;
