import hash from '@fuel-ts/merkle-shared/dist/cryptography';

export const leafPrefix = '0x00';
export const nodePrefix = '0x01';

export function hashLeaf(key: string, data: string): [string, string] {
  // Slice off the '0x' on each argument to simulate abi.encode
  // prefix + key + hash(data)
  const value = '0x00'.concat(key.slice(2)).concat(hash(data).slice(2));
  return [hash(value), value];
}

export function hashNode(left: string, right: string): [string, string] {
  // prefix + left + right
  const value = '0x01'.concat(left.slice(2)).concat(right.slice(2));
  return [hash(value), value];
}

export function parseLeaf(data: string): [string, string] {
  // returns [key, hash(data)]
  const len = nodePrefix.length;
  return ['0x'.concat(data.slice(len, len + 64)), '0x'.concat(data.slice(len + 64))];
}

export function parseNode(data: string): [string, string] {
  // returns [left, right]
  const len = nodePrefix.length;
  return ['0x'.concat(data.slice(len, len + 64)), '0x'.concat(data.slice(len + 64))];
}

// How to do in solidity ?
export function isLeaf(data: string): boolean {
  return data.slice(0, 4) === leafPrefix;
}
