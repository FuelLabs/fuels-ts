import type { FuelError } from '@fuel-ts/errors';
import type { Contract, Provider, WalletUnlocked } from 'fuels';
import { Script, bn } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('advanced-logging');
const setupOtherContract = getSetupContract('advanced-logging-other-contract');

let provider: Provider;
let advancedLogContract: Contract;
let otherAdvancedLogContract: Contract;
let advancedLogId: string;
let otherLogId: string;
let baseAssetId: string;

beforeAll(async () => {
  advancedLogContract = await setupContract();
  otherAdvancedLogContract = await setupOtherContract({ cache: false });
  provider = advancedLogContract.provider;
  advancedLogId = advancedLogContract.id.toB256();
  otherLogId = otherAdvancedLogContract.id.toB256();
  baseAssetId = provider.getBaseAssetId();
});

/**
 * @group node
 */
describe('Advanced Logging', () => {
  it('can get log data', async () => {
    const { value, logs } = await advancedLogContract.functions.test_function().call();

    expect(value).toBeTruthy();
    logs[5].game_id = logs[5].game_id.toHex();
    logs[9].game_id = logs[9].game_id.toHex();

    expect(logs).toEqual([
      'Game State',
      { Playing: 1 },
      'Contract Id',
      {
        bits: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      },
      'Game Ref',
      {
        score: 0,
        time_left: 100,
        ammo: 10,
        game_id: '0x18af8',
        state: { Playing: 1 },
        contract_Id: {
          bits: '0xfffffffffffffffffffffffffffffffff00fffffffffffffffffffffffffffff',
        },
        difficulty: { Medium: true },
      },
      'Game Ref Score',
      0,
      'Direct Game',
      {
        score: 101,
        time_left: 12,
        ammo: 3,
        game_id: '0x20157',
        state: { Playing: 1 },
        contract_Id: {
          bits: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        },
        difficulty: { Hard: true },
      },
      'Was True',
    ]);
  });

  it('can get log data from require [condition=true]', async () => {
    const { value, logs } = await advancedLogContract.functions
      .test_function_with_require(1, 1)
      .call();

    expect(value).toBeTruthy();
    expect(logs).toEqual(['Hello Tester', { Playing: 1 }]);
  });

  it('can get log data from require [condition=false]', async () => {
    const invocation = advancedLogContract.functions.test_function_with_require(1, 3);
    try {
      await invocation.call();

      throw new Error('it should have thrown');
    } catch (error) {
      if ((<Error>error).message) {
        expect(JSON.stringify((<FuelError>error).metadata.logs)).toMatch(
          JSON.stringify([
            {
              score: 0,
              time_left: 100,
              ammo: 10,
              game_id: bn(0x18af8),
              state: { Playing: 1 },
              contract_Id: {
                bits: '0xfffffffffffffffffffffffffffffffff00fffffffffffffffffffffffffffff',
              },
              difficulty: { Medium: true },
            },
          ])
        );
      } else {
        throw new Error('it should be possible to decode error from "require" statement');
      }
    }
  });

  it('can get log data from a downstream Contract', async () => {
    const INPUT = 3;
    const { value, logs } = await advancedLogContract.functions
      .test_log_from_other_contract(INPUT, otherAdvancedLogContract.id.toB256())
      .addContracts([otherAdvancedLogContract])
      .call();

    expect(value).toBeTruthy();
    expect(logs).toEqual([
      'Hello from main Contract',
      'Hello from other Contract',
      'Received value from main Contract:',
      INPUT,
    ]);
  });

  describe('should properly decode all logs in a multicall with inter-contract calls', () => {
    const setupCallTest = getSetupContract(FuelGaugeProjectsEnum.CALL_TEST_CONTRACT);
    const setupConfigurable = getSetupContract(FuelGaugeProjectsEnum.CONFIGURABLE_CONTRACT);
    const setupCoverage = getSetupContract(FuelGaugeProjectsEnum.COVERAGE_CONTRACT);

    let wallet: WalletUnlocked;
    const testStruct = {
      a: true,
      b: 100000,
    };

    const expectedLogs = [
      'Hello from main Contract',
      'Hello from other Contract',
      'Received value from main Contract:',
      10,
      bn(100000),
      { tag: '000', age: 21, scores: [1, 3, 4] },
      'fuelfuel',
    ];

    beforeAll(async () => {
      wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    });

    it('when using InvacationScope', async () => {
      const callTest = await setupCallTest({ cache: false });
      const configurable = await setupConfigurable({ cache: false });
      const coverage = await setupCoverage({ cache: false });

      const { logs } = await callTest
        .multiCall([
          advancedLogContract.functions
            .test_log_from_other_contract(10, otherLogId)
            .addContracts([otherAdvancedLogContract]),
          callTest.functions.boo(testStruct),
          configurable.functions.echo_struct(),
          coverage.functions.echo_str_8('fuelfuel'),
        ])
        .call();

      logs.forEach((log, i) => {
        expect(JSON.stringify(log)).toBe(JSON.stringify(expectedLogs[i]));
      });
    });

    it('when using ScriptTransactionRequest', async () => {
      const callTest = await setupCallTest({ cache: false });
      const configurable = await setupConfigurable({ cache: false });
      const coverage = await setupCoverage({ cache: false });

      const request = await callTest
        .multiCall([
          advancedLogContract.functions
            .test_log_from_other_contract(10, otherLogId)
            .addContracts([otherAdvancedLogContract]),
          callTest.functions.boo(testStruct),
          configurable.functions.echo_struct(),
          coverage.functions.echo_str_8('fuelfuel'),
        ])
        .getTransactionRequest();

      const txCost = await provider.getTransactionCost(request, {
        resourcesOwner: wallet,
      });

      request.gasLimit = txCost.gasUsed;
      request.maxFee = txCost.maxFee;

      await wallet.fund(request, txCost);

      const tx = await wallet.sendTransaction(request, { estimateTxDependencies: false });

      const { logs } = await tx.waitForResult();

      expect(logs).toBeDefined();

      logs?.forEach((log, i) => {
        if (typeof log === 'object') {
          expect(JSON.stringify(log)).toBe(JSON.stringify(expectedLogs[i]));
        } else {
          expect(log).toBe(expectedLogs[i]);
        }
      });
    });
  });

  describe('decode logs from a script set to manually call other contracts', () => {
    const { abiContents, binHexlified } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.SCRIPT_CALL_CONTRACT
    );

    const amount = Math.floor(Math.random() * 10) + 1;

    let wallet: WalletUnlocked;

    const expectedLogs = [
      'Hello from script',
      'Hello from main Contract',
      'Hello from other Contract',
      'Received value from main Contract:',
      amount,
    ];

    beforeAll(async () => {
      wallet = await generateTestWallet(provider, [[300_000, baseAssetId]]);
    });

    it('when using InvocationScope', async () => {
      const script = new Script(binHexlified, abiContents, wallet);
      const { logs } = await script.functions
        .main(advancedLogId, otherLogId, amount)
        .addContracts([advancedLogContract, otherAdvancedLogContract])
        .call();

      expect(logs).toStrictEqual(expectedLogs);
    });

    it('when using ScriptTransactionRequest', async () => {
      const script = new Script(binHexlified, abiContents, wallet);

      const request = await script.functions
        .main(advancedLogId, otherLogId, amount)
        .addContracts([advancedLogContract, otherAdvancedLogContract])
        .getTransactionRequest();

      const txCost = await provider.getTransactionCost(request, {
        resourcesOwner: wallet,
      });

      request.gasLimit = txCost.gasUsed;
      request.maxFee = txCost.maxFee;

      await wallet.fund(request, txCost);

      const tx = await wallet.sendTransaction(request);

      const { logs } = await tx.waitForResult();

      expect(logs).toBeDefined();

      expect(logs).toStrictEqual(expectedLogs);
    });
  });
});
