import type SparseCompactMerkleSolidityProof from './sparseCompactMerkleSolidityProof';

class SparseCompactMerkleBranch {
  proof: SparseCompactMerkleSolidityProof;
  key: string;
  value: string;

  constructor(proof: SparseCompactMerkleSolidityProof, key: string, value: string) {
    this.proof = proof;
    this.key = key;
    this.value = value;
  }
}

export default SparseCompactMerkleBranch;
