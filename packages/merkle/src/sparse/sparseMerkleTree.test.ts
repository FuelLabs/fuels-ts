import { toHex } from '@fuel-ts/math';

import { hash } from '../common';

import { DeepSparseMerkleSubTree } from './deepSparseMerkleSubTree';
import { SparseMerkleTree } from './sparseMerkleTree';

describe('Sparse Merkle Tree', () => {
  it('Update and delete', () => {
    const smt = new SparseMerkleTree();
    const data = toHex(42, 32);
    const newData = toHex(43, 32);
    const n = 100;

    const rootAfterLeaves = '0xa158e23c958c24b6fe94197eb118076a559655e014df292e80dd9e626bc8445d';
    const rootAfterUpdateExisting =
      '0x76a25f66f97f58d7675c6abf5dfdb7000666eb192f5aa346184e0e74d5a8792a';
    const rootAfterUpdateNew = '0xd8e4e90abf13b44380e1d6109c14c477c7efe40528000b64c8557ac3e15ef8b7';

    // Add some leaves
    for (let i = 0; i < n; i += 1) {
      const key = hash(toHex(i, 32));
      smt.update(key, data);
    }
    expect(smt.root).toEqual(rootAfterLeaves);

    // Update an existing leaf to a new value
    smt.update(hash(toHex(n / 10, 32)), newData);
    expect(smt.root).toEqual(rootAfterUpdateExisting);

    // Update that leaf back to original value, expect original root
    smt.update(hash(toHex(n / 10, 32)), data);
    expect(smt.root).toEqual(rootAfterLeaves);

    // Add an new leaf
    smt.update(hash(toHex(n + 50, 32)), data);
    expect(smt.root).toEqual(rootAfterUpdateNew);

    // Delete that leaf, expect original root
    smt.delete(hash(toHex(n + 50, 32)));
    expect(smt.root).toEqual(rootAfterLeaves);
  });

  it('addBranch and update', () => {
    // Create a full SMT
    const smt = new SparseMerkleTree();
    const data = toHex(42, 32);
    const newData = toHex(43, 32);

    // Add some leaves
    for (let i = 0; i < 100; i += 1) {
      const key = hash(toHex(i, 32));
      smt.update(key, data);
    }

    // Create DSMST (sol + ts) and add some branches from the full SMT using compact proofs:
    const dsmst = new DeepSparseMerkleSubTree(smt.root);

    const keyNumbers = [4, 8, 15, 16, 23, 42];
    const keys: string[] = [];
    for (let i = 0; i < keyNumbers.length; i += 1) {
      keys.push(hash(toHex(keyNumbers[i], 32)));
    }

    for (let i = 0; i < keys.length; i += 1) {
      const keyToProveMembership = keys[i];
      const valueToProveMembership = data;
      const compactMembershipProof = smt.proveCompacted(keyToProveMembership);
      const res = dsmst.addBranchCompact(
        compactMembershipProof,
        keyToProveMembership,
        valueToProveMembership
      );
      // Check proof is valid and branch was successfully added
      expect(res);
    }

    // Update a leaf on the full SMT
    const keyToUpdate = keys[3];
    smt.update(keyToUpdate, newData);

    // Update same leaf on the DSMST (sol + ts)
    dsmst.update(keyToUpdate, newData);

    // Check roots are equal
    expect(dsmst.root).toEqual(smt.root);
  });
});
