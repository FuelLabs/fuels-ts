import { BigNumber as BN } from 'ethers';

class Node {
  left: number;

  right: number;

  parent: number;

  index: number;

  hash: string;

  sum: BN;

  data: string;

  constructor(left: number, right: number, parent: number, hash: string, sum: BN, data: string) {
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.hash = hash;
    this.sum = sum;
    this.data = data;
    this.index = 0;
  }
}

export default Node;
