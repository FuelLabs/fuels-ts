/* eslint-disable @typescript-eslint/no-unused-vars */
// #region full
import { calcRoot, constructTree, getProof, hashLeaf } from '@fuel-ts/merkle';
import { hash } from 'fuels';

// #region create-tree
// Prepare your data as hex strings
const data = ['0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'];

// Construct the full Merkle tree
const tree = constructTree(data);

// Compute the Merkle root directly
const root = calcRoot(data);
// #endregion create-tree

// #region multi-leaf
// Create a tree with multiple leaves
const leaves = [
  hash(new Uint8Array([1])),
  hash(new Uint8Array([2])),
  hash(new Uint8Array([3])),
  hash(new Uint8Array([4])),
  hash(new Uint8Array([5])),
];

const multiTree = constructTree(leaves);
const multiRoot = calcRoot(leaves);
// #endregion multi-leaf

// #region get-proof
// Get the proof for leaf at index 0
const proof = getProof(multiTree, 0);
// proof is an array of sibling hashes needed to reconstruct the root
// #endregion get-proof

// #region hash-leaf
// Hash a single leaf using the Merkle leaf prefix (0x00)
const leafHash = hashLeaf(leaves[0]);
// #endregion hash-leaf

// #endregion full
