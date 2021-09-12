import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import { uintToBytes32 } from '../packages/protocol/common';
import SparseMerkleTree from '../packages/protocol/sparseMerkleTree/sparseMerkleTree';
import SparseCompactMerkleBranch from '../packages/protocol/sparseMerkleTree/types/sparseCompactMerkleBranch';
import hash from '../packages/protocol/cryptography';
import DeepSparseMerkleSubTree from '../packages/protocol/sparseMerkleTree/deepSparseMerkleSubTree';
import SparseCompactMerkleSolidityProof from '../packages/protocol/sparseMerkleTree/types/sparseCompactMerkleSolidityProof';
import SparseMerkleSolidityNode from '../packages/protocol/sparseMerkleTree/types/sparseMerkleSolidityNode';
import { ZERO } from '../packages/protocol/sparseMerkleTree/utils';

chai.use(solidity);
const { expect } = chai;

describe('Sparse Merkle Tree', () => {
	it('Proof verification', async () => {
		// Create a SMT
		const smt = new SparseMerkleTree();
		const data = uintToBytes32(42);

		// Add some leaves
		for (let i = 0; i < 100; i += 1) {
			const key = hash(uintToBytes32(i));
			smt.update(key, data);
		}

		const merkleTreeFactory = await ethers.getContractFactory('DeepSparseMerkleSubTree');
		const dsmsto = await merkleTreeFactory.deploy();
		await dsmsto.deployed();

		const indexToProve = 51;
		const keyToProve = hash(uintToBytes32(indexToProve));
		let compactMembershipProof = smt.proveCompacted(keyToProve);

		// Need to convert typescript proof (with raw data) into solidity proof (with nodes):
		let proofSideNodes = compactMembershipProof.SideNodes;
		let nonMembershipLeaf = new SparseMerkleSolidityNode(
			compactMembershipProof.NonMembershipLeafData
		);
		let bitmask = compactMembershipProof.BitMask;
		let numSideNodes = compactMembershipProof.NumSideNodes;
		let sibling = new SparseMerkleSolidityNode(compactMembershipProof.SiblingData);

		let solidityProof = new SparseCompactMerkleSolidityProof(
			proofSideNodes,
			nonMembershipLeaf,
			bitmask,
			numSideNodes,
			sibling
		);

		const badData = uintToBytes32(999);

		// Valid membership proof
		expect(await dsmsto.verifyCompact(solidityProof, keyToProve, data, smt.root)).to.be.true;
		// Invalid membership proof
		expect(await dsmsto.verifyCompact(solidityProof, keyToProve, badData, smt.root)).to.be
			.false;

		const nonMembershipIndex = 200;
		const nonMembershipKey = hash(uintToBytes32(nonMembershipIndex));

		compactMembershipProof = smt.proveCompacted(nonMembershipKey);

		// Need to convert typescript proof (with raw data) into solidity proof (with nodes):
		proofSideNodes = compactMembershipProof.SideNodes;
		nonMembershipLeaf = new SparseMerkleSolidityNode(
			compactMembershipProof.NonMembershipLeafData
		);
		bitmask = compactMembershipProof.BitMask;
		numSideNodes = compactMembershipProof.NumSideNodes;
		sibling = new SparseMerkleSolidityNode(compactMembershipProof.SiblingData);

		solidityProof = new SparseCompactMerkleSolidityProof(
			proofSideNodes,
			nonMembershipLeaf,
			bitmask,
			numSideNodes,
			sibling
		);

		// Valid Non-membership proof
		expect(await dsmsto.verifyCompact(solidityProof, nonMembershipKey, ZERO, smt.root)).to.be
			.true;
		// Invalid Non-membership proof
		expect(await dsmsto.verifyCompact(solidityProof, keyToProve, ZERO, smt.root)).to.be.false;
	});

	it('add branches and update', async () => {
		// Create a SMT
		const smt = new SparseMerkleTree();
		const data = uintToBytes32(42);
		const newData = uintToBytes32(43);

		// Add some leaves
		for (let i = 0; i < 100; i += 1) {
			const key = hash(uintToBytes32(i));
			smt.update(key, data);
		}

		// Create DSMST (ts) and add some branches from the full SMT using compact proofs:
		const dsmst = new DeepSparseMerkleSubTree(smt.root);

		const merkleTreeFactory = await ethers.getContractFactory('DeepSparseMerkleSubTree');
		const dsmsto = await merkleTreeFactory.deploy();
		await dsmsto.deployed();

		const branches: SparseCompactMerkleBranch[] = [];

		const keyNumbers = [4, 8, 15, 16, 23, 42];
		const keys: string[] = [];
		for (let i = 0; i < keyNumbers.length; i += 1) {
			keys.push(hash(uintToBytes32(keyNumbers[i])));
		}

		for (let i = 0; i < keys.length; i += 1) {
			const keyToAdd = keys[i];
			const valueToAdd = data;
			const compactMembershipProof = smt.proveCompacted(keyToAdd);
			const res = dsmst.addBranchCompact(compactMembershipProof, keyToAdd, valueToAdd);

			// Need to convert typescript proof (with raw data) into solidity proof (with nodes):

			const proofSideNodes = compactMembershipProof.SideNodes;
			const nonMembershipLeaf = new SparseMerkleSolidityNode(
				compactMembershipProof.NonMembershipLeafData
			);
			const bitmask = compactMembershipProof.BitMask;
			const numSideNodes = compactMembershipProof.NumSideNodes;
			const sibling = new SparseMerkleSolidityNode(compactMembershipProof.SiblingData);

			const solidityProof = new SparseCompactMerkleSolidityProof(
				proofSideNodes,
				nonMembershipLeaf,
				bitmask,
				numSideNodes,
				sibling
			);

			branches.push(new SparseCompactMerkleBranch(solidityProof, keyToAdd, valueToAdd));

			// Check proof is valid and branch was successfully added for typescript
			expect(res);
		}

		// UPDATE
		const keyToUpdate = keys[3];
		// Add branches and update on the DSMST (solidity)
		let solRoot = await dsmsto.addBranchesAndUpdate(branches, smt.root, keyToUpdate, newData);

		// Update a leaf on the full SMT
		smt.update(keyToUpdate, newData);

		// Update same leaf on the DSMST (ts)
		dsmst.update(keyToUpdate, newData);

		// Check roots are equal
		expect(dsmst.root).to.eql(smt.root);
		expect(solRoot).to.eql(dsmst.root);

		// DELETION
		// Delete the key we just updated
		const keyToDelete = keyToUpdate;

		// Delete a leaf on the full SMT
		smt.delete(keyToDelete);

		// Delete same leaf on the DSMST (ts)
		dsmst.delete(keyToDelete);

		// Add branches and delete on the DSMST (solidity)
		solRoot = await dsmsto.addBranchesAndDelete(branches, smt.root, keyToDelete);

		// Check roots are equal
		expect(dsmst.root).to.eql(smt.root);
		expect(solRoot).to.eql(dsmst.root);
	});
});
