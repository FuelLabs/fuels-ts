import type { createCipheriv, createDecipheriv } from 'crypto';

type UniversalCrypto = {
  getRandomValues: (length: number) => Uint8Array;
  randomBytes: (length: number) => Uint8Array;
  subtle: SubtleCrypto;
  createCipheriv: typeof createCipheriv;
  createDecipheriv: typeof createDecipheriv;
};
let selectedCrypto;
let selectedStrategy: 'Node' | 'Web' = 'Node';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (typeof globalThis !== 'undefined' && globalThis.crypto) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  selectedCrypto = globalThis.crypto;
  selectedStrategy = 'Web';
}

if (!selectedCrypto && typeof require === 'function') {
  try {
    // eslint-disable-next-line global-require
    selectedCrypto = require('crypto');
    selectedStrategy = 'Node';
  } catch (error) {
    throw new Error(
      `keystore expects a standard Web browser or Node environment. Got error: ${error}`
    );
  }
}

export const crypto: UniversalCrypto = selectedCrypto;
export const strategy = selectedStrategy;
