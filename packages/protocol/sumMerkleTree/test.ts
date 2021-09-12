import { expect } from 'chai';
import { BigNumber as BN } from '@ethersproject/bignumber';
import { calcRoot, constructTree, getProof } from './sumMerkleTree';
import { uintToBytes32 } from '../common';
import Proof from './types/proof';

describe('Sum Merkle Tree', () => {
  const size = 100;
  const sumAfterLeaves = BN.from(((size - 1) * size) / 2);
  let data: string[] = [];
  let values: BN[] = [];

  beforeEach(() => {
    data = [];
    values = [];
    for (let i = 0; i < size; i += 1) {
      data.push(uintToBytes32(i));
      values.push(BN.from(i));
    }
  });

  it('Compute root', () => {
    // Root from Go implementation : Size = 100; data[i] = bytes32(i)
    // const rootAfterLeaves = 'GO ROOT HERE';
    const res = calcRoot(values, data);
    const sum = res.sum;

    // Compare results
    expect(sum).to.eql(sumAfterLeaves);
  });

  it('Constructs a tree and provide a proof', () => {
    // Root from Go implementation : Size = 100; data[i] = bytes32(i)
    // const rootAfterLeaves = 'GO ROOT HERE';
    const nodeList = constructTree(values, data);

    const rootNode = nodeList[nodeList.length - 1];
    expect(nodeList.length).to.eql(size * 2 - 1);
    expect(rootNode.sum).to.eql(sumAfterLeaves);

    const rootProof: Proof = new Proof([], []);
    expect(getProof(nodeList, rootNode.index)).to.eql(rootProof);

    const proof = getProof(nodeList, 0);
    expect(proof.nodeSums.length).to.eql(7);
    expect(proof.sideNodes.length).to.eql(7);
  });
});
