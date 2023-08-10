import { ScriptRequest } from '@fuel-ts/program';

/**
 * @hidden
 *
 * A script that just returns zero
 *
 * Accepts nothing
 * Returns nothing
 *
 * Used for coin transfer transactions
 */
export const returnZeroScript = new ScriptRequest(
  /*
    Opcode::RET(REG_ZERO)
    Opcode::NOOP
  */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  '0x24000000',
  () => new Uint8Array(0),
  () => undefined
);
