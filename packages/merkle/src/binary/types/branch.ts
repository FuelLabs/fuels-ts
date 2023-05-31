class BinaryMerkleBranch {
  proof: string[];
  key: string;
  value: string;

  constructor(proof: string[], key: string, value: string) {
    this.proof = proof;
    this.key = key;
    this.value = value;
  }
}

export default BinaryMerkleBranch;
