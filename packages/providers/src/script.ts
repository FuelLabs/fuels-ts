// TODO: Move this file out of this package
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';

// TODO: Source these from other packages
const VM_TX_MEMORY = 360;
const TRANSACTION_SCRIPT_OFFSET = 104;
const WORD_SIZE = 8;
const CONTRACT_ID_LEN = 32;

export class Script {
  bytes: Uint8Array;

  constructor(bytes: BytesLike) {
    this.bytes = arrayify(bytes);
  }

  getScriptDataOffset() {
    return VM_TX_MEMORY + TRANSACTION_SCRIPT_OFFSET + this.bytes.length;
  }

  /**
   * Returns the memory offset for the contract call argument
   * Used for struct inputs
   */
  getArgOffset() {
    return this.getScriptDataOffset() + CONTRACT_ID_LEN + 2 * WORD_SIZE;
  }
}
