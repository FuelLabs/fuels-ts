import type { JsonAbi } from '@fuel-ts/abi-coder';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';
import { PANIC_REASONS } from '@fuel-ts/transactions/configs';
import * as asm from '@fuels/vm-asm';

import { assembleRevertError } from './extract-tx-error';

const contractA = `0x${'11'.repeat(32)}`;
const contractB = `0x${'22'.repeat(32)}`;
const panicCode = '9223372036854775808';

function createAbi(msg: string, index = '0', specVersion = '1.2'): JsonAbi {
  return {
    specVersion,
    encodingVersion: '1',
    programType: 'contract',
    concreteTypes: [],
    metadataTypes: [],
    functions: [],
    loggedTypes: [],
    messagesTypes: [],
    configurables: [],
    errorCodes: {
      [index]: {
        pos: { pkg: msg, file: 'main.sw', line: 1, column: 1 },
        logId: null,
        msg,
      },
    },
  };
}

function revertReceipt(id: string, code = panicCode) {
  return { type: ReceiptType.Revert as const, id, val: bn(code), pc: bn(0), is: bn(0) };
}

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
    ['1.3', '42', '10736581511651276803'],
    ['1.10', '42', '10736581511651276803'],
  ])('decodes ABI %s panic metadata, including nested call sites', (specVersion, index, code) => {
    const abiError = {
      pos: { pkg: 'test', file: 'main.sw', line: 1, column: 1 },
      logId: null,
      msg: 'panic message',
    };
    const abi: JsonAbi = {
      ...createAbi('panic message', index, specVersion),
      programType: 'script',
      errorCodes: { [index]: abiError },
    };
    const abis = { main: abi, otherContractsAbis: {} };
    const error = assembleRevertError(
      [revertReceipt(ZeroBytes32, code)],
      [],
      {},
      `Revert(${code})`,
      abis
    );
    expect(error.message).toContain('panic message');
    expect(error.metadata).toMatchObject({ abiError, reason: code });

    if (specVersion === '1.2') {
      const rawRevert = assembleRevertError([], [], {}, 'Revert(42)', abis);
      expect(rawRevert.message).toBe('The transaction reverted with reason: 42.');
    }
  });

  it.each([
    ['1.1', '18446744069414584320', '18446744069414584320'],
    ['1.2', '0', panicCode],
    ['1.2', '42', '10736581511651276803'],
    ['1.3', '42', '10736581511651276803'],
    ['1.10', '42', '10736581511651276803'],
  ])('scopes ABI %s panic indices to the reverting contract', (specVersion, index, code) => {
    const main = createAbi('contract A panic', index, specVersion);
    const external = createAbi('contract B panic', index, specVersion);
    const abis = { main, mainContractId: contractA, otherContractsAbis: { [contractB]: external } };

    for (const [id, abi] of [
      [contractA, main],
      [contractB, external],
    ] as const) {
      const error = assembleRevertError([revertReceipt(id, code)], [], {}, `Revert(${code})`, abis);
      expect(error.metadata.abiError).toEqual(abi.errorCodes?.[index]);
      expect(error.message).toContain(abi.errorCodes?.[index].msg);
    }
  });

  it('uses a top-level call receipt when the primary contract ID was not provided', () => {
    const main = createAbi('contract A panic');
    const call = {
      type: ReceiptType.Call as const,
      id: ZeroBytes32,
      to: contractA,
      amount: bn(0),
      assetId: ZeroBytes32,
      gas: bn(0),
      param1: bn(0),
      param2: bn(0),
      pc: bn(0),
      is: bn(0),
    };
    const error = assembleRevertError(
      [call, revertReceipt(contractA)],
      [],
      {},
      `Revert(${panicCode})`,
      { main, otherContractsAbis: {} }
    );
    expect(error.metadata.abiError).toEqual(main.errorCodes?.['0']);
  });

  it('distinguishes a script panic from an external contract with the same index', () => {
    const main = { ...createAbi('script panic'), programType: 'script' as const };
    const external = createAbi('contract B panic');
    const abis = { main, otherContractsAbis: { [contractB]: external } };

    for (const [id, abi] of [
      [ZeroBytes32, main],
      [contractB, external],
    ] as const) {
      const error = assembleRevertError([revertReceipt(id)], [], {}, `Revert(${panicCode})`, abis);
      expect(error.metadata.abiError).toEqual(abi.errorCodes?.['0']);
    }
  });

  it.each(['unknown contract', 'unknown panic index', 'missing receipt', 'script context'])(
    'does not guess an ABI for %s',
    (scenario) => {
      const main = createAbi('contract A panic');
      const external = createAbi(
        'contract B panic',
        scenario === 'unknown panic index' ? '1' : '0'
      );
      const abis = {
        main,
        mainContractId: contractA,
        otherContractsAbis: { [contractB]: external },
      };
      let id = contractB;
      if (scenario === 'unknown contract') {
        id = `0x${'33'.repeat(32)}`;
      }
      if (scenario === 'script context') {
        id = ZeroBytes32;
      }
      const receipts = scenario === 'missing receipt' ? [] : [revertReceipt(id)];

      const error = assembleRevertError(receipts, [], {}, `Revert(${panicCode})`, abis);
      expect(error.message).toBe(`The transaction reverted with reason: ${panicCode}.`);
      expect(error.metadata.abiError).toBeUndefined();
    }
  );

  it('does not use a contract panic entry when the script has no matching entry', () => {
    const main = { ...createAbi('script panic', '1'), programType: 'script' as const };
    const abis = { main, otherContractsAbis: { [contractB]: createAbi('contract B panic') } };
    const error = assembleRevertError(
      [revertReceipt(ZeroBytes32)],
      [],
      {},
      `Revert(${panicCode})`,
      abis
    );
    expect(error.metadata.abiError).toBeUndefined();
  });
});
