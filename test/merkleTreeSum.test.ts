import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import { BigNumber as BN, Contract } from 'ethers';
import { calcRoot, checkVerify } from '../packages/protocol/sumMerkleTree/sumMerkleTree';
import hash from '../packages/protocol/cryptography';

chai.use(solidity);
const { expect } = chai

describe('Sum Merkle tree', () => {
  let msto: Contract;

  beforeEach(async () => {
    const merkleSumTreeFactory = await ethers.getContractFactory('MerkleSumTree');
    msto = await merkleSumTreeFactory.deploy();
    await msto.deployed();
  });

  it('Compute root', async () => {
    const data = [];
    const values = [];
    const valuesBN = [];
    const size = 100;
    for (let i = 0; i < size; i += 1) {
      data.push(hash('0xabde'));
      values.push(BN.from(1).toHexString());
      valuesBN.push(BN.from(1));
    }
    const result = await msto.computeRoot(data, values);
    const res = calcRoot(valuesBN, data);

    // Compare results
    expect(res.sum).to.eql(BN.from(100)); // True answer
    expect(result[0]).to.eql(res.hash);
    expect(result[1]).to.eql(res.sum);
  });

  it('Verifications', async () => {
    const testCases = [
      { numLeaves: 100, proveLeaf: 100 },
      { numLeaves: 100, proveLeaf: 99 },
      { numLeaves: 99, proveLeaf: 42 },
      { numLeaves: 1, proveLeaf: 1 },
    ];

    for (let i = 0; i < testCases.length; i += 1) {
      // Expect success
      expect(
        await checkVerify(msto, testCases[i].numLeaves, testCases[i].proveLeaf, false, false)
      ).to.eql(true);

      // Tamper with data
      expect(
        await checkVerify(msto, testCases[i].numLeaves, testCases[i].proveLeaf, false, true)
      ).to.eql(false);

      // Tamper with sums
      expect(
        await checkVerify(msto, testCases[i].numLeaves, testCases[i].proveLeaf, true, false)
      ).to.eql(false);
    }
  });
});
