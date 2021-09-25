import { BigNumber as BN } from '@ethersproject/bignumber';

class Node {
  left: number;
  right: number;
  parent: number;
  hash: string;
  data: string;
  sum: BN;
  index: number;

  constructor(
    left: number,
    right: number,
    parent: number,
    hash: string,
    sum: BN,
    data: string,
    index: number = 0
  ) {
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.hash = hash;
    this.sum = sum;
    this.data = data;
    this.index = index;
  }
}

export default Node;
