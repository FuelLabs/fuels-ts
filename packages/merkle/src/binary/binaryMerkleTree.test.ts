import { toHex } from '@fuel-ts/math';

import { calcRoot, constructTree, getProof } from './binaryMerkleTree';
import type Node from './types/node';

/**
 * @group node
 */
describe('Binary Merkle Tree', () => {
  const rootAfterLeaves = '0x9e59abcd7c89011ba919f9141624acb32b4cc31c24e76c6d4f64b25093ef366c';
  const size = 100;
  let data: string[];

  beforeEach(() => {
    data = [];
    for (let i = 0; i < size; i += 1) {
      data.push(toHex(i, 32));
    }
  });

  it('Compute root', () => {
    /// Root from Go implementation : Size = 100; data[i] = bytes32(i)
    const res = calcRoot(data);
    // Compare results
    expect(res).toEqual(rootAfterLeaves);
  });

  it('Constructs a tree and provide a proof', () => {
    const tree: Node[] = constructTree(data);

    expect(tree.length).toEqual(size * 2 - 1);
    expect(tree[tree.length - 1].hash).toEqual(rootAfterLeaves);

    const rootProof: string[] = getProof(tree, tree.length - 1);
    expect(rootProof).toEqual([]);

    const proof: string[] = getProof(tree, 0);
    expect(proof.length).toEqual(7);
  });
});
