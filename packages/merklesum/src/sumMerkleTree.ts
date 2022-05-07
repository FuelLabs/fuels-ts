/// @dev The Fuel testing Merkle trees.
/// A set of useful helper methods for testing and deploying Merkle trees.
import type { BigNumber as BN } from '@ethersproject/bignumber';
import { padUint } from '@fuel-ts/merkle-shared/dist/common';
import hash from '@fuel-ts/merkle-shared/dist/cryptography';

import Node from './types/node';
import Proof from './types/proof';

/**
 * Slice off the '0x' on each argument to simulate abi.encodePacked
 * hash(prefix + value + data)
 */
export function hashLeaf(value: BN, data: string): string {
  return hash('0x00'.concat(padUint(value).slice(2)).concat(data.slice(2)));
}

/**
 * Slice off the '0x' on each argument to simulate abi.encodePacked
 * hash (prefix + leftSum + leftHash + rightSum + rightHash)
 */
export function hashNode(leftValue: BN, left: string, rightValue: BN, right: string): string {
  return hash(
    '0x01'
      .concat(padUint(leftValue).slice(2))
      .concat(left.slice(2))
      .concat(padUint(rightValue).slice(2))
      .concat(right.slice(2))
  );
}

/**
 * Construct tree
 */
export function constructTree(sums: BN[], data: string[]): Node[] {
  const nodes = [];
  for (let i = 0, n = data.length; i < n; i += 1) {
    const hashed = hashLeaf(sums[i], data[i]);
    const leaf = new Node(-1, -1, -1, hashed, sums[i], data[i]);
    leaf.index = i;
    nodes.push(leaf);
  }
  const nodesList = [...nodes];
  let pNodes = [...nodes];
  let size = (nodes.length + 1) >> 1;
  let odd = nodes.length & 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let i = 0;
    for (; i < size - odd; i += 1) {
      const j = i << 1;
      const hashed = hashNode(pNodes[j].sum, pNodes[j].hash, pNodes[j + 1].sum, pNodes[j + 1].hash);
      nodes[i] = new Node(
        pNodes[j].index,
        pNodes[j + 1].index,
        -1,
        hashed,
        pNodes[j].sum.add(pNodes[j + 1].sum),
        ''
      );
      nodes[i].index = nodesList.length;
      nodesList[pNodes[j].index].parent = nodesList.length;
      nodesList[pNodes[j + 1].index].parent = nodesList.length;
      nodesList.push(nodes[i]);
    }
    if (odd === 1) {
      nodes[i] = pNodes[i << 1];
    }
    if (size === 1) {
      break;
    }
    odd = size & 1;
    size = (size + 1) >> 1;
    pNodes = [...nodes];
  }
  return nodesList;
}

/**
 * Compute the merkle root
 */
export function calcRoot(sums: BN[], data: string[]): Node {
  const nodes = [];
  for (let i = 0; i < data.length; i += 1) {
    const hashed = hashLeaf(sums[i], data[i]);
    nodes.push(new Node(-1, -1, -1, hashed, sums[i], data[i]));
  }
  let pNodes = nodes;
  let size = (nodes.length + 1) >> 1;
  let odd = nodes.length & 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let i = 0;
    for (; i < size - odd; i += 1) {
      const j = i << 1;
      const hashed = hashNode(pNodes[j].sum, pNodes[j].hash, pNodes[j + 1].sum, pNodes[j + 1].hash);
      nodes[i] = new Node(
        pNodes[j].index,
        pNodes[j + 1].index,
        -1,
        hashed,
        pNodes[j].sum.add(pNodes[j + 1].sum),
        ''
      );
    }
    if (odd === 1) {
      nodes[i] = pNodes[i << 1];
    }
    if (size === 1) {
      break;
    }
    odd = size & 1;
    size = (size + 1) >> 1;
    pNodes = nodes;
  }
  return nodes[0];
}

/**
 * Get proof for the leaf
 */
export function getProof(nodes: Node[], id: number): Proof {
  const proof: Proof = new Proof([], []);
  for (let prev = id, cur = nodes[id].parent; cur !== -1; prev = cur, cur = nodes[cur].parent) {
    if (nodes[cur].left === prev) {
      proof.sideNodes.push(nodes[nodes[cur].right].hash);
      proof.nodeSums.push(nodes[nodes[cur].right].sum);
    } else {
      proof.sideNodes.push(nodes[nodes[cur].left].hash);
      proof.nodeSums.push(nodes[nodes[cur].left].sum);
    }
  }
  return proof;
}
