import Snake, { SnakeDirection } from './snake';
import { MapNode, random } from './common';

type SnakeGameConfig = {
  ai?: boolean,
  col?: number,
  row?: number,
  snakeColor?: string,
  direction?: SnakeDirection,
}

const defaultConfig: SnakeGameConfig = {
  col: 10,
  row: 10,
  snakeColor: '#fff',
};

export class SnakeGameEnv {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  config: SnakeGameConfig = {};
  snake: Snake | null = null;
  food: MapNode | null = null;

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
    this.canvas.height -= this.canvas.height % this.config.row;
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
    this.food = this.randomNode();
  }

  // render() {}
}

export default SnakeGameEnv;
