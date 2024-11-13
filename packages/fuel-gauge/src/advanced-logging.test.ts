import type { FuelError } from '@fuel-ts/errors';
import { bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  AdvancedLoggingOtherContractFactory,
  AdvancedLoggingFactory,
  CallTestContractFactory,
  ConfigurableContractFactory,
  CoverageContractFactory,
} from '../test/typegen/contracts';
import { ScriptCallContract } from '../test/typegen/scripts';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('Advanced Logging', () => {
  it('can get log data', async () => {
    using advancedLogContract = await launchTestContract({
      factory: AdvancedLoggingFactory,
    });

    const { waitForResult } = await advancedLogContract.functions.test_function().call();
    const { value, logs } = await waitForResult();

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
    using advancedLogContract = await launchTestContract({
      factory: AdvancedLoggingFactory,
    });

    const { waitForResult } = await advancedLogContract.functions
      .test_function_with_require(1, 1)
      .call();

    const { value, logs } = await waitForResult();

    expect(value).toBeTruthy();
    expect(logs).toEqual(['Hello Tester', { Playing: 1 }]);
  });

  it('can get log data from require [condition=false]', async () => {
    using advancedLogContract = await launchTestContract({
      factory: AdvancedLoggingFactory,
    });

    const invocation = advancedLogContract.functions.test_function_with_require(1, 3);
    try {
      const { waitForResult } = await invocation.call();
      await waitForResult();

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
    using launched = await launchTestNode({
      contractsConfigs: [
        { factory: AdvancedLoggingFactory },
        { factory: AdvancedLoggingOtherContractFactory },
      ],
    });

    const {
      contracts: [advancedLogContract, otherAdvancedLogContract],
    } = launched;

    const INPUT = 3;
    const { waitForResult } = await advancedLogContract.functions
      .test_log_from_other_contract(INPUT, otherAdvancedLogContract.id.toB256())
      .addContracts([otherAdvancedLogContract])
      .call();

    const { value, logs } = await waitForResult();

    expect(value).toBeTruthy();
    expect(logs).toEqual([
      'Hello from main Contract',
      'Hello from other Contract',
      'Received value from main Contract:',
      INPUT,
    ]);
  });

  describe('should properly decode all logs in a multicall with inter-contract calls', () => {
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

    it('when using InvacationScope', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          { factory: AdvancedLoggingFactory },
          { factory: AdvancedLoggingOtherContractFactory },
          { factory: CallTestContractFactory },
          { factory: ConfigurableContractFactory },
          { factory: CoverageContractFactory },
        ],
      });

      const {
        contracts: [
          advancedLogContract,
          otherAdvancedLogContract,
          callTest,
          configurable,
          coverage,
        ],
      } = launched;

      const { waitForResult } = await callTest
        .multiCall([
          advancedLogContract.functions
            .test_log_from_other_contract(10, otherAdvancedLogContract.id.toB256())
            .addContracts([otherAdvancedLogContract]),
          callTest.functions.boo(testStruct),
          configurable.functions.echo_struct(),
          coverage.functions.echo_str_8('fuelfuel'),
        ])
        .call();

      const { logs } = await waitForResult();

      logs.forEach((log, i) => {
        expect(JSON.stringify(log)).toBe(JSON.stringify(expectedLogs[i]));
      });
    });

    it('when using ScriptTransactionRequest', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          { factory: AdvancedLoggingFactory },
          { factory: AdvancedLoggingOtherContractFactory },
          { factory: CallTestContractFactory },
          { factory: ConfigurableContractFactory },
          { factory: CoverageContractFactory },
        ],
      });

      const {
        contracts: [
          advancedLogContract,
          otherAdvancedLogContract,
          callTest,
          configurable,
          coverage,
        ],
        wallets: [wallet],
      } = launched;

      const request = await callTest
        .multiCall([
          advancedLogContract.functions
            .test_log_from_other_contract(10, otherAdvancedLogContract.id.toB256())
            .addContracts([otherAdvancedLogContract]),
          callTest.functions.boo(testStruct),
          configurable.functions.echo_struct(),
          coverage.functions.echo_str_8('fuelfuel'),
        ])
        .getTransactionRequest();

      const txCost = await wallet.getTransactionCost(request);

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
    const amount = Math.floor(Math.random() * 10) + 1;

    const expectedLogs = [
      'Hello from script',
      'Hello from main Contract',
      'Hello from other Contract',
      'Received value from main Contract:',
      amount,
    ];

    it('when using InvocationScope', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          { factory: AdvancedLoggingFactory },
          { factory: AdvancedLoggingOtherContractFactory },
        ],
      });

      const {
        contracts: [advancedLogContract, otherAdvancedLogContract],
        wallets: [wallet],
      } = launched;

      const script = new ScriptCallContract(wallet);

      const { waitForResult } = await script.functions
        .main(advancedLogContract.id.toB256(), otherAdvancedLogContract.id.toB256(), amount)
        .addContracts([advancedLogContract, otherAdvancedLogContract])
        .call();

      const { logs } = await waitForResult();

      expect(logs).toStrictEqual(expectedLogs);
    });

    it('when using ScriptTransactionRequest', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          { factory: AdvancedLoggingFactory },
          { factory: AdvancedLoggingOtherContractFactory },
        ],
      });

      const {
        contracts: [advancedLogContract, otherAdvancedLogContract],
        wallets: [wallet],
      } = launched;

      const script = new ScriptCallContract(wallet);

      const request = await script.functions
        .main(advancedLogContract.id.toB256(), otherAdvancedLogContract.id.toB256(), amount)
        .addContracts([advancedLogContract, otherAdvancedLogContract])
        .getTransactionRequest();

      const txCost = await wallet.getTransactionCost(request);

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
