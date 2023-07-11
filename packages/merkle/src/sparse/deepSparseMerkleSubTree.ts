import { hash } from '../common';

import { decompactProof, verifyProof } from './proofs';
import { SparseMerkleTree } from './sparseMerkleTree';
import type SparseCompactMerkleProof from './types/sparseCompactMerkleProof';
import type SparseMerkleProof from './types/sparseMerkleProof';

export class DeepSparseMerkleSubTree extends SparseMerkleTree {
  constructor(root: string) {
    super();
    this.setRoot(root);
  }

  verify(proof: SparseMerkleProof, hashedKey: string, value: string): boolean {
    const [result] = verifyProof(proof, this.root, hashedKey, value);
    return result;
  }

  addBranch(proof: SparseMerkleProof, hashedKey: string, value: string): boolean {
    const [result, updates] = verifyProof(proof, this.root, hashedKey, value);

    if (!result) {
      return false;
    }

    for (let i = 0; i < updates.length; i += 1) {
      console.log(updates[i][0], updates[i]);
      this.set(updates[i][0], updates[i][1]);
    }

    if (proof.SiblingData !== '') {
      if (proof.SideNodes.length > 0) {
        this.set(proof.SideNodes[0], proof.SiblingData);
      }
    }
    return true;
  }

  verifyCompact(proof: SparseCompactMerkleProof, key: string, value: string): boolean {
    const hashedKey = hash(key);
    const decompactedProof = decompactProof(proof);
    return this.verify(decompactedProof, hashedKey, value);
  }

  addBranchCompact(proof: SparseCompactMerkleProof, key: string, value: string): boolean {
    const hashedKey = hash(key);
    const decompactedProof = decompactProof(proof);
    return this.addBranch(decompactedProof, hashedKey, value);
  }
}
