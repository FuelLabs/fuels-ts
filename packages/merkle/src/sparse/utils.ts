export const ZERO = '0x0000000000000000000000000000000000000000000000000000000000000000';
export const EMPTY = '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
export const MAX_HEIGHT = 256;

export interface MapStore {
  [key: string]: string;
}

/**
 * Gets the bit at an offset from the most significant bit
 */
export function getBitAtFromMSB(data: string, position: number): number {
  // if int(data[position / 8]) & (1 << (8 - 1 - uint(position) % 8)) > 0

  // Slice off '0x'
  const slicedData = data.slice(2);
  // Get byte that contains the specified position
  const byte = '0x'.concat(
    slicedData.slice(Math.floor(position / 8) * 2, Math.floor(position / 8) * 2 + 2)
  );
  // Get bits from specified position within that byte
  const bits = Number(byte) & (1 << (8 - 1 - (position % 8)));

  // Bit at position = 0 IFF bits > 0.
  if (bits > 0) {
    return 1;
  }
  return 0;
}
/**
 * Reverse the nodes position
 */
export function reverseSideNodes(sideNodes: string[]): string[] {
  let left = 0;
  let right = sideNodes.length - 1;
  const reversedSideNodes: string[] = sideNodes;

  while (left < right) {
    [reversedSideNodes[left], reversedSideNodes[right]] = [
      reversedSideNodes[right],
      reversedSideNodes[left],
    ];
    left += 1;
    right -= 1;
  }

  return reversedSideNodes;
}

/**
 * Counts the common bit at at an offset from the most significant bit
 * between two inputs
 */
export function countCommonPrefix(data1: string, data2: string): number {
  let count = 0;
  for (let i = 0; i < MAX_HEIGHT; i += 1) {
    if (getBitAtFromMSB(data1, i) === getBitAtFromMSB(data2, i)) {
      count += 1;
    } else {
      break;
    }
  }
  return count;
}
