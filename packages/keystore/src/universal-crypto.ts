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

/**
 * Try to reuse available `crypto` module (usually Web Browsers)
 */
if (typeof globalThis?.crypto !== 'undefined') {
  selectedCrypto = globalThis.crypto;
  selectedStrategy = 'Web';
}

/**
 * Otherwise fallback to requiring `crypto` from NodeJS
 */
const isNode = typeof process?.versions?.node != null;
if (!selectedCrypto && isNode) {
  /**
   * TODO: Add banner/code-snippet using `createRequire` for ESM support
   *
   * In the `esm` output, `require` will not be available, only `import`.
   *
   * We need to use `createRequire` in order to work around it.
   *
   * Places using a similar approach:
   *    https://github.com/evanw/esbuild/issues/946#issuecomment-814703190
   *    https://github.com/egoist/tsup/discussions/505#discussioncomment-3911142
   */

  try {
    selectedCrypto = require.apply(this, ['crypto']);
    selectedStrategy = 'Node';
  } catch (err) {
    const { error } = console;
    error('Keystore expects a standard Web browser or Node environment.', err);
  }
}

export const crypto: UniversalCrypto = selectedCrypto;
export const strategy = selectedStrategy;
