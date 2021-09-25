// Sparse Merkle proof
class SparseMerkleProof {
  SideNodes: string[];
  NonMembershipLeafData: string;
  SiblingData: string;

  constructor(sideNodes: string[], NonMembershipLeafData: string, SiblingData: string) {
    this.SideNodes = sideNodes;
    this.NonMembershipLeafData = NonMembershipLeafData;
    this.SiblingData = SiblingData;
  }
}

export default SparseMerkleProof;
