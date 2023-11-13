import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { RequireRevertError, ScriptResultDecoderError } from 'fuels';

import { getProgramDir } from './utils';

const advancedLoggingDir = getProgramDir('advanced-logging');
const advancedLoggingOtherContractDir = getProgramDir('advanced-logging-other-contract');

/**
 * @group node
 */
describe('Advanced Logging', () => {
  beforeAll(async (ctx) => {});

  it('can get log data', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [advancedLoggingDir],
    });
    const {
      contracts: [contract],
    } = launched;
    const { minGasPrice: gasPrice } = contract.provider.getGasConfig();
    const { value, logs } = await contract.functions.test_function().txParams({ gasPrice }).call();

    expect(value).toBeTruthy();
    logs[5].game_id = logs[5].game_id.toHex();
    logs[9].game_id = logs[9].game_id.toHex();

    expect(logs).toEqual([
      'Game State',
      { Playing: 1 },
      'Contract Id',
      {
        value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      },
      'Game Ref',
      {
        score: 0,
        time_left: 100,
        ammo: 10,
        game_id: '0x18af8',
        state: { Playing: 1 },
        contract_Id: {
          value: '0xfffffffffffffffffffffffffffffffff00fffffffffffffffffffffffffffff',
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
          value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        },
        difficulty: { Hard: true },
      },
      'Was True',
    ]);
  });

  it('can get log data from require [condition=true]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [advancedLoggingDir],
    });
    const {
      contracts: [contract],
    } = launched;
    const { minGasPrice: gasPrice } = contract.provider.getGasConfig();
    const { value, logs } = await contract.functions
      .test_function_with_require(1, 1)
      .txParams({ gasPrice })
      .call();

    expect(value).toBeTruthy();
    expect(logs).toEqual(['Hello Tester', { Playing: 1 }]);
  });

  it('can get log data from require [condition=false]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [advancedLoggingDir],
    });
    const {
      contracts: [contract],
    } = launched;
    const { minGasPrice: gasPrice } = contract.provider.getGasConfig();
    const invocation = contract.functions.test_function_with_require(1, 3).txParams({ gasPrice });
    try {
      await invocation.call();

      throw new Error('it should have thrown');
    } catch (error) {
      if (error instanceof RequireRevertError && error.cause instanceof ScriptResultDecoderError) {
        const logs = error.cause.logs;
        logs[0].game_id = logs[0].game_id.toHex();
        expect(logs).toEqual([
          {
            score: 0,
            time_left: 100,
            ammo: 10,
            game_id: '0x18af8',
            state: { Playing: 1 },
            contract_Id: {
              value: '0xfffffffffffffffffffffffffffffffff00fffffffffffffffffffffffffffff',
            },
            difficulty: { Medium: true },
          },
        ]);
      } else {
        throw new Error('it should throw RequireRevertError');
      }
    }
  });

  it('can get log data from a downstream Contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [advancedLoggingDir, advancedLoggingOtherContractDir],
    });
    const {
      contracts: [contract, otherContract],
    } = launched;
    const { minGasPrice: gasPrice } = contract.provider.getGasConfig();

    const INPUT = 3;
    const { value, logs } = await contract.functions
      .test_log_from_other_contract(INPUT, otherContract.id.toB256())
      .addContracts([otherContract])
      .txParams({ gasPrice })
      .call();

    expect(value).toBeTruthy();
    expect(logs).toEqual([
      'Hello from main Contract',
      'Hello from other Contract',
      'Received value from main Contract:',
      INPUT,
    ]);
  });
});
