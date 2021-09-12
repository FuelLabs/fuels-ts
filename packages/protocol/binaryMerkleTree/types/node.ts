class Node {
  left: number;

  right: number;

  parent: number;

  index: number;

  hash: string;

  data: string;

  constructor(left: number, right: number, parent: number, hash: string, data: string) {
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.hash = hash;
    this.data = data;
    this.index = 0;
  }
}

export default Node;
