import chai from 'chai';
import { ethers } from 'hardhat';
import { solidity } from 'ethereum-waffle';
import { BigNumber as BN, Contract } from 'ethers';
import {
	constructTree,
	getProof,
	calcRoot,
	checkVerify,
	checkAppend,
	hashLeaf,
} from '../packages/protocol/binaryMerkleTree/binaryMerkleTree';
import { uintToBytes32, ZERO} from '../packages/protocol/common';
import BinaryMerkleBranch from '../packages/protocol/binaryMerkleTree/types/branch';

chai.use(solidity);
const { expect } = chai;

describe('Binary Merkle tree', () => {
	let bmto: Contract;

	beforeEach(async () => {
		const merkleSumTreeFactory = await ethers.getContractFactory('BinaryMerkleTree');
		bmto = await merkleSumTreeFactory.deploy();
		await bmto.deployed();
	});

	it('Compute root', async () => {
		const data = [];
		const size = 20;
		for (let i = 0; i < size; i += 1) {
			data.push(BN.from(i).toHexString());
		}
		const result = await bmto.computeRoot(data);
		const res = calcRoot(data);

		// Compare results
		expect(result).to.be.equal(res);
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
				await checkVerify(bmto, testCases[i].numLeaves, testCases[i].proveLeaf, false)
			).to.equal(true);

			// Tamper with data
			expect(
				await checkVerify(bmto, testCases[i].numLeaves, testCases[i].proveLeaf, true)
			).to.equal(false);
		}
	});

	it('Append', async () => {
		const testCases = [1, 5, 100];
		for (let i = 0; i < testCases.length; i += 1) {
			// Correct proof should succees
			expect(await checkAppend(bmto, testCases[i], false)).to.equal(true);
			// Incorrect proof should fail
			expect(await checkAppend(bmto, testCases[i], true)).to.equal(false);
		}
	});

	it('AddBranches and update', async () => {
		// First build a full tree in TS
		const numLeaves = 100;
		const data = [];
		const keys = [];
		const size = numLeaves;

		for (let i = 0; i < size; i += 1) {
			data.push(BN.from(i).toHexString());
			keys.push(BN.from(i).toHexString());
		}

		let nodes = constructTree(data);

		// Build branches for a selection of keys
		const branches: BinaryMerkleBranch[] = [];
		const keyNumbers = [4, 8, 15, 16, 23, 42];
		const keysToAdd: string[] = [];
		for (let i = 0; i < keyNumbers.length; i += 1) {
			keysToAdd.push(uintToBytes32(keyNumbers[i]));
		}

		for (let i = 0; i < keysToAdd.length; i += 1) {
			const keyToAdd = keysToAdd[i];
			const valueToAdd = data[BN.from(keysToAdd[i]).toNumber()];
			const proof = getProof(nodes, BN.from(keysToAdd[i]).toNumber());
			branches.push(new BinaryMerkleBranch(proof, keyToAdd, valueToAdd));
		}

		// Add branches and update a key
		const keyToUpdate = keysToAdd[4]; // Index into 'keyNumbers', not 'keys'
		const newData = BN.from(9999).toHexString();
		let newSolRoot = await bmto.addBranchesAndUpdate(
			branches,
			nodes[nodes.length - 1].hash,
			keyToUpdate,
			newData,
			numLeaves
		);

		// Change data and rebuild tree (ts)
		data[parseInt(keyToUpdate, 16)] = newData;
		nodes = constructTree(data);
		const newTSRoot = nodes[nodes.length - 1].hash;

		// Check roots are equal
		expect(newSolRoot).to.equal(newTSRoot);

		// Trivial cases
		// Tree is empty
		newSolRoot = await bmto.addBranchesAndUpdate([], ZERO, ZERO, newData, 0);
		expect(newSolRoot).to.equal(hashLeaf(newData));

		// Tree has only one leaf
		newSolRoot = await bmto.addBranchesAndUpdate(
			[new BinaryMerkleBranch([], ZERO, uintToBytes32(42))],
			hashLeaf(uintToBytes32(42)),
			ZERO,
			uintToBytes32(43),
			1
		);
		expect(newSolRoot).to.equal(hashLeaf(uintToBytes32(43)));
	});
});
