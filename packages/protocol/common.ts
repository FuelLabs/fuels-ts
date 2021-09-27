/// @dev The Fuel testing Merkle trees.
/// A set of useful helper methods for testing and deploying Merkle trees.
import { BigNumber as BN } from '@ethersproject/bignumber';

export const EMPTY = '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
export const ZERO = '0x0000000000000000000000000000000000000000000000000000000000000000';
export const MAX_HEIGHT = 256;

// Does a util exist for this in ethers.js ?
export function uintToBytes32(i: number): string {
  const value = BN.from(i).toHexString();
  let trimmedValue = value.slice(2);
  trimmedValue = '0'.repeat(64 - trimmedValue.length).concat(trimmedValue);
  return '0x'.concat(trimmedValue);
}

export function padUint(value: BN): string {
  // uint256 is encoded as 32 bytes, so pad that string.
  let trimmedValue = value.toHexString().slice(2);
  trimmedValue = '0'.repeat(64 - trimmedValue.length).concat(trimmedValue);
  return '0x'.concat(trimmedValue);
}
