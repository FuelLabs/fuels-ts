class SparseCompactMerkleProof {
  SideNodes: string[];
  NonMembershipLeafData: string;
  BitMask: number[];
  NumSideNodes: number;
  SiblingData: string;

  constructor(
    SideNodes: string[],
    NonMembershipLeafData: string,
    Bitmask: number[],
    NumSideNodes: number,
    SiblingData: string
  ) {
    this.SideNodes = SideNodes;
    this.NonMembershipLeafData = NonMembershipLeafData;
    this.BitMask = Bitmask;
    this.NumSideNodes = NumSideNodes;
    this.SiblingData = SiblingData;
  }
}

export default SparseCompactMerkleProof;
