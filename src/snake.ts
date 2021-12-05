import { MapNode, random } from './common';

export enum SnakeDirection {
  MIN,
  UP = SnakeDirection.MIN,
  DOWN,
  LEFT,
  RIGHT,
  MAX,
}

export interface SnakeConfig {
  head: MapNode;
  ctx: CanvasRenderingContext2D;
  direction?: SnakeDirection;
  snakeLen?: number; // 初始长度，>= 1
  color: string;
}

const DirectionDelta = {
  // [Direction]: [deltaCol, deltaRow]
  [SnakeDirection.UP]: new MapNode(0, -1),
  [SnakeDirection.DOWN]: new MapNode(0, 1),
  [SnakeDirection.LEFT]: new MapNode(-1, 0),
  [SnakeDirection.RIGHT]: new MapNode(1, 0),
};

export default class Snake {
  ctx: CanvasRenderingContext2D;
  direction: SnakeDirection;
  nodes: MapNode[] = [];
  head: MapNode;
  color: string;

  constructor(config: SnakeConfig) {
    this.ctx = config.ctx;
    this.color = config.color;
    this.direction = typeof config.direction === 'number'
      && config.direction >= SnakeDirection.MIN
      && config.direction < SnakeDirection.MAX
      ? config.direction
      : random.randRange(SnakeDirection.MIN, SnakeDirection.MAX - 1);
    this.nodes.push(config.head);
    [this.head] = this.nodes;

    if (config.snakeLen) {
      for (let i = 1; i < config.snakeLen; i += 1) {
        this.nodes.push(new MapNode(
          this.head.col - DirectionDelta[this.direction].col,
          this.head.row - DirectionDelta[this.direction].row,
        ));
      }
    }
  }

  move(): MapNode {
    this.nodes.forEach((node) => node.move(...DirectionDelta[this.direction].toArray()));
    return this.head;
  }

  includes(node: MapNode): boolean {
    for (let i = 0; i < this.nodes.length; i += 1) {
      if (this.nodes[i].equals(node)) return true;
    }
    return false;
  }
}
