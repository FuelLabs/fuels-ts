// Sum Merkle proof
class Proof {
  sideNodes: string[];
  nodeSums: bigint[];

  constructor(sideNodes: string[], sums: bigint[]) {
    this.sideNodes = sideNodes;
    this.nodeSums = sums;
  }
}

export default Proof;
