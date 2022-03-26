// TODO: Move this file out of this package
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';

import type { CallResult } from './provider';

// TODO: Source these from other packages
const VM_TX_MEMORY = 360;
const TRANSACTION_SCRIPT_FIXED_SIZE = 112;
const WORD_SIZE = 8;
const CONTRACT_ID_LEN = 32;
const ASSET_ID_LEN = 32;
const AMOUNT_LEN = 8;

export class Script<TScriptData = void, TScriptResult = void> {
  bytes: Uint8Array;
  encodeScriptData: (data: TScriptData) => Uint8Array;
  decodeScriptResult: (result: CallResult) => TScriptResult;

  constructor(
    bytes: BytesLike,
    encodeScriptData: (data: TScriptData) => Uint8Array,
    decodeScriptResult: (result: CallResult) => TScriptResult
  ) {
    this.bytes = arrayify(bytes);
    this.encodeScriptData = encodeScriptData;
    this.decodeScriptResult = decodeScriptResult;
  }

  getScriptDataOffset() {
    return (
      VM_TX_MEMORY + TRANSACTION_SCRIPT_FIXED_SIZE + ASSET_ID_LEN + AMOUNT_LEN + this.bytes.length
    );
  }

  /**
   * Returns the memory offset for the contract call argument
   * Used for struct inputs
   */
  getArgOffset() {
    return this.getScriptDataOffset() + CONTRACT_ID_LEN + 2 * WORD_SIZE;
  }
}
