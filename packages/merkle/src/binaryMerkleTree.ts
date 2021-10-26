// A set of useful helper methods for testing binary Merkle trees.
import hash from '@fuel-ts/merkle-shared/dist/cryptography';

import Node from './types/node';

export function hashLeaf(data: string): string {
  // Slice off the '0x' on each argument to simulate abi.encodePacked
  return hash('0x00'.concat(data.slice(2)));
}

export function hashNode(left: string, right: string): string {
  // Slice off the '0x' on each argument to simulate abi.encodePacked
  // hash(prefix +  left + right)
  return hash('0x01'.concat(left.slice(2)).concat(right.slice(2)));
}

// construct tree
export function constructTree(data: string[]): Node[] {
  const nodes = [];
  for (let i = 0; i < data.length; i += 1) {
    const hashed = hashLeaf(data[i]);
    const leaf = new Node(-1, -1, -1, hashed, data[i]);
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
      const hashed = hashNode(pNodes[j].hash, pNodes[j + 1].hash);
      nodes[i] = new Node(pNodes[j].index, pNodes[j + 1].index, -1, hashed, '');
      const nextIndex = nodesList.length;
      nodes[i].index = nextIndex;

      nodesList[pNodes[j].index].parent = nextIndex;
      nodesList[pNodes[j + 1].index].parent = nextIndex;
      nodesList.push(nodes[i]);
    }

    if (size === 1) {
      break;
    }

    if (odd === 1) {
      nodes[i] = pNodes[i << 1];
    }

    odd = size & 1;
    size = (size + 1) >> 1;
    pNodes = [...nodes];
  }
  return nodesList;
}

// compute root
export function calcRoot(data: string[]): string {
  const nodes = [];
  for (let i = 0; i < data.length; i += 1) {
    const hashed = hashLeaf(data[i]);
    nodes.push(new Node(-1, -1, -1, hashed, data[i]));
  }
  let pNodes = nodes;
  let size = (nodes.length + 1) >> 1;
  let odd = nodes.length & 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let i = 0;
    for (; i < size - odd; i += 1) {
      const j = i << 1;
      const hashed = hashNode(pNodes[j].hash, pNodes[j + 1].hash);
      nodes[i] = new Node(pNodes[j].index, pNodes[j + 1].index, -1, hashed, '');
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
  return nodes[0].hash;
}

// get proof for the leaf
export function getProof(nodes: Node[], id: number): string[] {
  const proof: string[] = [];
  for (let prev = id, cur = nodes[id].parent; cur !== -1; prev = cur, cur = nodes[cur].parent) {
    if (nodes[cur].left === prev) {
      proof.push(nodes[nodes[cur].right].hash);
    } else {
      proof.push(nodes[nodes[cur].left].hash);
    }
  }
  return proof;
}
