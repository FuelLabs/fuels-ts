// Sum Merkle proof
class Proof {
  sideNodes: string[];
  nodeSums: string[];

  constructor(sideNodes: string[], sums: string[]) {
    this.sideNodes = sideNodes;
    this.nodeSums = sums;
  }
}

export default Proof;
