import { uintToBytes32 } from '@fuels-ts/merkle-shared/dist/common';
import { expect } from 'chai';

import { calcRoot, constructTree, getProof } from './binaryMerkleTree';
import type Node from './types/node';

describe('Binary Merkle Tree', () => {
  const rootAfterLeaves = '0x9e59abcd7c89011ba919f9141624acb32b4cc31c24e76c6d4f64b25093ef366c';
  const size = 100;
  let data: string[];

  beforeEach(() => {
    data = [];
    for (let i = 0; i < size; i += 1) {
      data.push(uintToBytes32(i));
    }
  });

  it('Compute root', () => {
    /// Root from Go implementation : Size = 100; data[i] = bytes32(i)
    const res = calcRoot(data);
    // Compare results
    expect(res).to.eql(rootAfterLeaves);
  });

  it('Constructs a tree and provide a proof', () => {
    const tree: Node[] = constructTree(data);

    expect(tree.length).to.eql(size * 2 - 1);
    expect(tree[tree.length - 1].hash).to.eql(rootAfterLeaves);

    const rootProof: string[] = getProof(tree, tree.length - 1);
    expect(rootProof).to.eql([]);

    const proof: string[] = getProof(tree, 0);
    expect(proof.length).to.eql(7);
  });
});
