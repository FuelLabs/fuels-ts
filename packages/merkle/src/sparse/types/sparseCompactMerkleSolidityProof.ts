import type SparseMerkleSolidityNode from './sparseMerkleSolidityNode';

class SparseCompactMerkleSolidityProof {
  SideNodes: string[];
  NonMembershipLeaf: SparseMerkleSolidityNode;
  BitMask: number[];
  NumSideNodes: number;
  Sibling: SparseMerkleSolidityNode;

  constructor(
    SideNodes: string[],
    NonMembershipLeaf: SparseMerkleSolidityNode,
    Bitmask: number[],
    NumSideNodes: number,
    Sibling: SparseMerkleSolidityNode
  ) {
    this.SideNodes = SideNodes;
    this.NonMembershipLeaf = NonMembershipLeaf;
    this.BitMask = Bitmask;
    this.NumSideNodes = NumSideNodes;
    this.Sibling = Sibling;
  }
}

export default SparseCompactMerkleSolidityProof;
