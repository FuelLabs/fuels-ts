/// @dev The Fuel testing Merkle trees.
/// A set of useful helper methods for testing and deploying Merkle trees.
import { hash } from '@fuel-ts/hasher';

import { compactProof } from './proofs';
import { isLeaf, hashLeaf, hashNode, parseLeaf, parseNode } from './treeHasher';
import type SparseCompactMerkleProof from './types/sparseCompactMerkleProof';
import SparseMerkleProof from './types/sparseMerkleProof';
import type { MapStore } from './utils';
import { ZERO, MAX_HEIGHT, getBitAtFromMSB, reverseSideNodes, countCommonPrefix } from './utils';

export class SparseMerkleTree {
  ms: MapStore;

  root: string;

  constructor() {
    const ms: MapStore = {};
    this.ms = ms;
    this.root = ZERO;
    this.ms[this.root] = ZERO;
  }

  get(key: string): string {
    return this.ms[key];
  }

  set(key: string, value: string): void {
    this.ms[key] = value;
  }

  setRoot(root: string): void {
    this.root = root;
  }

  sideNodesForRoot(key: string, root: string): [string[], string, string, string] {
    const sideNodes: string[] = [];

    // If the root is a placeholder, there are no sidenodes to return.
    // The data is nil, and the sibling is nil
    if (root === ZERO) {
      return [sideNodes, ZERO, '', ''];
    }

    let currentData = this.get(root);

    // If the root is a leaf, there are also no sidenodes to return.
    // The data is the leaf data, and the sibling is nil
    if (isLeaf(currentData)) {
      return [sideNodes, root, currentData, ''];
    }

    let leftNode;
    let rightNode;
    let nodeHash = '';
    let sideNode = '';

    for (let i = 0; i < MAX_HEIGHT; i += 1) {
      [leftNode, rightNode] = parseNode(currentData);

      if (getBitAtFromMSB(key, i) === 1) {
        sideNode = leftNode;
        nodeHash = rightNode;
      } else {
        sideNode = rightNode;
        nodeHash = leftNode;
      }

      sideNodes.push(sideNode);

      // If the node is a placeholder, we've reached the end.
      if (nodeHash === ZERO) {
        currentData = '';
        break;
      }

      currentData = this.get(nodeHash);

      // If the node is a leaf, we've reached the end.
      if (isLeaf(currentData)) {
        break;
      }
    }

    const siblingData = this.get(sideNode);

    return [reverseSideNodes(sideNodes), nodeHash, currentData, siblingData];
  }

  deleteWithSideNodes(
    key: string,
    sideNodes: string[],
    oldLeafHash: string,
    oldLeafData: string
  ): string {
    // If value already zero, deletion changes nothing. Just return current root

    if (oldLeafHash === ZERO) {
      return this.root;
    }

    // If key is already empty (different key found in its place), deletion changed nothing. Just return current root
    const [actualPath] = parseLeaf(oldLeafData);

    if (actualPath !== key) {
      return this.root;
    }

    let currentHash = '';
    let currentData = '';
    let sideNode = '';
    let sideNodeValue = '';
    let nonPlaceholderReached = false;

    for (let i = 0; i < sideNodes.length; i += 1) {
      if (sideNodes[i] === '') {
        continue;
      }

      sideNode = sideNodes[i];

      if (currentData === '') {
        sideNodeValue = this.get(sideNode);

        if (isLeaf(sideNodeValue)) {
          // This is the leaf sibling that needs to be percolated up the tree.
          currentHash = sideNode;
          currentData = sideNode;
          continue;
        } else {
          // This is the node sibling that needs to be left in its place.
          currentData = ZERO;
          nonPlaceholderReached = true;
        }
      }

      if (!nonPlaceholderReached && sideNode === ZERO) {
        // We found another placeholder sibling node, keep going up the
        // tree until we find the first sibling that is not a placeholder.
        continue;
      } else if (!nonPlaceholderReached) {
        // We found the first sibling node that is not a placeholder, it is
        // time to insert our leaf sibling node here.
        nonPlaceholderReached = true;
      }

      if (getBitAtFromMSB(key, sideNodes.length - 1 - i) === 1) {
        [currentHash, currentData] = hashNode(sideNode, currentData);
      } else {
        [currentHash, currentData] = hashNode(currentData, sideNode);
      }
      this.set(currentHash, currentData);
      currentData = currentHash;
    }

    // The tree is empty; return placeholder value as root.
    // How can currentHash be '' / nil if it's a hash ?
    if (currentHash === '') {
      currentHash = ZERO;
    }

    return currentHash;
  }

  updateWithSideNodes(
    key: string,
    value: string,
    sideNodes: string[],
    oldLeafHash: string,
    oldLeafData: string
  ): string {
    let currentHash;
    let currentData;

    this.set(hash(value), value);

    [currentHash, currentData] = hashLeaf(key, value);
    this.set(currentHash, currentData);

    currentData = currentHash;

    // If the leaf node that sibling nodes lead to has a different actual path
    // than the leaf node being updated, we need to create an intermediate node
    // with this leaf node and the new leaf node as children.
    //
    // First, get the number of bits that the paths of the two leaf nodes share
    // in common as a prefix.

    let commonPrefixCount;

    if (oldLeafHash === ZERO) {
      commonPrefixCount = MAX_HEIGHT;
    } else {
      const [actualPath] = parseLeaf(oldLeafData);
      commonPrefixCount = countCommonPrefix(key, actualPath);
    }

    if (commonPrefixCount !== MAX_HEIGHT) {
      if (getBitAtFromMSB(key, commonPrefixCount) === 1) {
        [currentHash, currentData] = hashNode(oldLeafHash, currentData);
      } else {
        [currentHash, currentData] = hashNode(currentData, oldLeafHash);
      }
      this.set(currentHash, currentData);
      currentData = currentHash;
    }

    for (let i = 0; i < MAX_HEIGHT; i += 1) {
      let sideNode;
      const offsetOfSideNodes = MAX_HEIGHT - sideNodes.length;

      // If there are no sidenodes at this height, but the number of
      // bits that the paths of the two leaf nodes share in common is
      // greater than this height, then we need to build up the tree
      // to this height with placeholder values at siblings.

      if (i - offsetOfSideNodes < 0 || sideNodes[i - offsetOfSideNodes] === '') {
        if (commonPrefixCount !== MAX_HEIGHT && commonPrefixCount > MAX_HEIGHT - 1 - i) {
          sideNode = ZERO;
        } else {
          continue;
        }
      } else {
        sideNode = sideNodes[i - offsetOfSideNodes];
      }

      if (getBitAtFromMSB(key, MAX_HEIGHT - 1 - i) === 1) {
        [currentHash, currentData] = hashNode(sideNode, currentData);
      } else {
        [currentHash, currentData] = hashNode(currentData, sideNode);
      }

      this.set(currentHash, currentData);
      currentData = currentHash;
    }

    return currentHash;
  }

  update(key: string, value: string): void {
    const [sideNodes, oldLeafHash, oldLeafData] = this.sideNodesForRoot(key, this.root);
    const newRoot = this.updateWithSideNodes(key, value, sideNodes, oldLeafHash, oldLeafData);
    this.setRoot(newRoot);
  }

  delete(key: string): void {
    const [sideNodes, oldLeafHash, oldLeafData] = this.sideNodesForRoot(key, this.root);
    const newRoot = this.deleteWithSideNodes(key, sideNodes, oldLeafHash, oldLeafData);
    this.setRoot(newRoot);
  }

  prove(key: string): SparseMerkleProof {
    const [sideNodes, leafHash, leafData, siblingData] = this.sideNodesForRoot(key, this.root);

    const nonEmptySideNodes: string[] = [];

    for (let i = 0; i < sideNodes.length; i += 1) {
      if (sideNodes[i] !== '') {
        nonEmptySideNodes.push(sideNodes[i]);
      }
    }

    // Deal with non-membership proofs. If the leaf hash is the placeholder
    // value, we do not need to add anything else to the proof.
    let nonMembershipLeafData = '';
    if (leafHash !== ZERO) {
      const [actualPath] = parseLeaf(leafData);
      if (actualPath !== key) {
        // This is a non-membership proof that involves showing a different leaf.
        // Add the leaf data to the proof.
        nonMembershipLeafData = leafData;
      }
    }

    const proof = new SparseMerkleProof(nonEmptySideNodes, nonMembershipLeafData, siblingData);
    return proof;
  }

  proveCompacted(key: string): SparseCompactMerkleProof {
    const proof = this.prove(key);
    const compactedProof = compactProof(proof);
    return compactedProof;
  }
}
