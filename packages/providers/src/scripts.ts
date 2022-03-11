import { Script } from './script';

/**
 * A script that just returns zero
 *
 * Accepts nothing
 * Returns nothing
 *
 * Used for coin transfer transactions
 */
export const returnZeroScript = new Script(
  /*
    Opcode::RET(REG_ZERO)
    Opcode::NOOP
  */
  '0x24000000',
  () => new Uint8Array(0),
  () => undefined
);
