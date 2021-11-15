/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-loop-func */
import { hexlify } from '@ethersproject/bytes';
import { createHash } from 'crypto';

export function ephemeralMerkleRoot(leaves: Uint8Array[]): string {
  let width = (() => {
    let i = 2;
    while (i < leaves.length) {
      i *= 2;
    }
    return i;
  })();
  let len = leaves.length;

  if (width <= 2) {
    throw new Error('Not yet implemented');
  }

  width /= 2;
  len /= 2.0;

  let current = new Array(width).fill(0).map(() => new Uint8Array(32).fill(0));

  const c = leaves[Symbol.iterator]();

  current.forEach((_, i) => {
    const hasher = createHash('sha256');

    try {
      hasher.update(c.next().value);
      hasher.update(c.next().value);
    } catch {
      //
    }

    current[i] = Uint8Array.from(hasher.digest());
  });

  let next = [...current].map((v) => Uint8Array.from(v));

  while (width > 1) {
    [current, next] = [next, current];

    const c = current.slice(0, Math.ceil(len))[Symbol.iterator]();

    width /= 2;
    len /= 2.0;

    next.slice(0, width).forEach((_, i) => {
      const hasher = createHash('sha256');

      try {
        hasher.update(c.next().value);
        hasher.update(c.next().value);
      } catch {
        //
      }

      next[i] = Uint8Array.from(hasher.digest());
    });
  }

  return hexlify(next[0]);
}
