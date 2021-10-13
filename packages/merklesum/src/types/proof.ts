import { BigNumber as BN } from '@ethersproject/bignumber';

// Sum Merkle proof
class Proof {
  sideNodes: string[];
  nodeSums: BN[];

  constructor(sideNodes: string[], sums: BN[]) {
    this.sideNodes = sideNodes;
    this.nodeSums = sums;
  }
}

export default Proof;
