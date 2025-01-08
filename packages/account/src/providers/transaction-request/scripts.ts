import { arrayify } from '@fuel-ts/utils';

import type { AbstractScriptRequest } from './types';

// We can't import this from `@fuel-ts/script` because it causes
// cyclic dependency errors so we duplicate it here.
/** @hidden */
export const returnZeroScript: AbstractScriptRequest<void> = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: arrayify('0x24000000'),
  encodeScriptData: () => new Uint8Array(0),
};

/** @hidden */
export const withdrawScript: AbstractScriptRequest<void> = {
  /*
          The following code loads some basic values into registers and calls SMO to create an output message
          5040C010 	- ADDI r16 $is i16   [r16 now points to memory 16 bytes from the start of this program (start of receiver data)]
          5D44C006	- LW r17 $is i6      [r17 set to the 6th word in this program (6*8=48 bytes from the start of this program)]
          4C400011	- SMO r16 r0 r0 r17  [send message out to address starting at memory position r16 with amount in r17]
          24000000	- RET                [return 0]
          00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 [recipient address]
          00000000 00000000 [amount value]
      */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: arrayify('0x5040C0105D44C0064C40001124000000'),
  encodeScriptData: () => new Uint8Array(0),
};
