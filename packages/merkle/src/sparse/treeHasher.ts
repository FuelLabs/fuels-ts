import { hash } from '@fuel-ts/hasher';

export const leafPrefix = '0x00';
export const nodePrefix = '0x01';

/**
 * Slice off the '0x' on each argument to simulate abi.encode
 * prefix + key + hash(data)
 */
export function hashLeaf(key: string, data: string): [string, string] {
  const value = '0x00'.concat(key.slice(2)).concat(hash(data).slice(2));
  return [hash(value), value];
}

/**
 * Slice off the '0x' on each argument to simulate abi.encodePacked
 * prefix + key + hash(data)
 */
export function hashNode(left: string, right: string): [string, string] {
  const value = '0x01'.concat(left.slice(2)).concat(right.slice(2));
  return [hash(value), value];
}

/**
 * Parse a leaf
 */
export function parseLeaf(data: string): [string, string] {
  const len = nodePrefix.length;
  return ['0x'.concat(data.slice(len, len + 64)), '0x'.concat(data.slice(len + 64))];
}

/**
 * Parse a nodes
 */
export function parseNode(data: string): [string, string] {
  const len = nodePrefix.length;
  return ['0x'.concat(data.slice(len, len + 64)), '0x'.concat(data.slice(len + 64))];
}

/**
 * Check if data is a leaf by checking prefix
 */
export function isLeaf(data: string): boolean {
  return data.slice(0, 4) === leafPrefix;
}
