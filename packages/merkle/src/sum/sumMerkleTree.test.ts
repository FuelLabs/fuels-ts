import { toHex } from '@fuel-ts/math';

import { calcRoot, constructTree, getProof } from './sumMerkleTree';
import Proof from './types/proof';

/**
 * @group node
 */
describe('Sum Merkle Tree', () => {
  const size = 100;
  const sumAfterLeaves = toHex(((size - 1) * size) / 2);
  let data: string[] = [];
  let values: string[] = [];

  beforeEach(() => {
    data = [];
    values = [];
    for (let i = 0; i < size; i += 1) {
      data.push(toHex(i, 32));
      values.push(toHex(i));
    }
  });

  it('Compute root', () => {
    // Root from Go implementation : Size = 100; data[i] = bytes32(i)
    // const rootAfterLeaves = 'GO ROOT HERE';
    const res = calcRoot(values, data);
    const sum = res.sum;

    // Compare results
    expect(sum).toEqual(sumAfterLeaves);
  });

  it('Constructs a tree and provide a proof', () => {
    // Root from Go implementation : Size = 100; data[i] = bytes32(i)
    // const rootAfterLeaves = 'GO ROOT HERE';
    const nodeList = constructTree(values, data);

    const rootNode = nodeList[nodeList.length - 1];
    expect(nodeList.length).toEqual(size * 2 - 1);
    expect(rootNode.sum).toEqual(sumAfterLeaves);

    const rootProof: Proof = new Proof([], []);
    expect(getProof(nodeList, rootNode.index)).toEqual(rootProof);

    const proof = getProof(nodeList, 0);
    expect(proof.nodeSums.length).toEqual(7);
    expect(proof.sideNodes.length).toEqual(7);
  });
});
