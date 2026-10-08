import type { JsonAbi } from '@fuel-ts/abi-coder';
import { PANIC_REASONS } from '@fuel-ts/transactions/configs';
import * as asm from '@fuels/vm-asm';

import { assembleRevertError } from './extract-tx-error';

/**
 * @group node
 * @group browser
 */
describe('extractTxError', () => {
  it('should ensure all panic reasons are present within PANIC_REASONS constant', async () => {
    await asm.initWasm();
    const panicReasons = asm.PanicReason;

    const stringReasons = Object.keys(panicReasons).filter((key) => Number.isNaN(Number(key)));

    expect(new Set(PANIC_REASONS)).toStrictEqual(new Set(stringReasons));
  });

  it.each([
    ['1.1', '18446744069414584320', '18446744069414584320'],
    ['1.2', '0', '9223372036854775808'],
    ['1.2', '42', '10736581511651276803'],
  ])('decodes ABI %s panic metadata, including nested call sites', (specVersion, index, code) => {
    const abiError = {
      pos: { pkg: 'test', file: 'main.sw', line: 1, column: 1 },
      logId: null,
      msg: 'panic message',
    };
    const abi: JsonAbi = {
      specVersion,
      encodingVersion: '1',
      programType: 'script',
      concreteTypes: [],
      metadataTypes: [],
      functions: [],
      loggedTypes: [],
      messagesTypes: [],
      configurables: [],
      errorCodes: { [index]: abiError },
    };
    const abis = { main: abi, otherContractsAbis: {} };
    const error = assembleRevertError([], [], {}, `Revert(${code})`, abis);
    expect(error.message).toContain('panic message');
    expect(error.metadata).toMatchObject({ abiError, reason: code });

    if (specVersion === '1.2') {
      const rawRevert = assembleRevertError([], [], {}, 'Revert(42)', abis);
      expect(rawRevert.message).toBe('The transaction reverted with reason: 42.');
    }
  });
});
