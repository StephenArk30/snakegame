interface MapNodeInterface {
  col: number;
  row: number;
}

export class MapNode implements MapNodeInterface {
  col: number;
  row: number;

  constructor(col: number, row: number) {
    this.col = col;
    this.row = row;
  }

  move(col: number, row: number) {
    this.col += col;
    this.row += row;
  }

  toArray(): [number, number] {
    return [this.col, this.row];
  }

  equals(node: MapNode) {
    return this.col === node.col && this.row === node.row;
  }
}

export const random = {
  choice: (arr: any[]) => arr[Math.floor(Math.random() * arr.length)],
  randRange(min: number, max?: number): number {
    return max ? Math.floor(
      Math.random() * (Math.floor(max) - Math.ceil(min) + 1),
    ) + Math.ceil(min) : random.randRange(0, min);
  },
};

export default {
  MapNode,
  util: {
    random,
  },
};
