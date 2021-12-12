import { MapNode } from './common';

export default class Food extends MapNode {
  ctx: CanvasRenderingContext2D;
  radius: number;
  color: string;
  bgColor: string;

  constructor(
    node: MapNode,
    ctx: CanvasRenderingContext2D,
    radius: number,
    color: string = '#fff',
    bgColor: string = '#000',
  ) {
    super(node.col, node.row);
    this.ctx = ctx;
    this.radius = radius;
    this.color = color;
    this.bgColor = bgColor;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.col,
      this.row,
      this.radius,
      0,
      Math.PI * 2,
      true,
    );
    this.ctx.fill();
  }

  clear() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(this.col, this.row, this.radius * 2, this.radius * 2);
  }
}
