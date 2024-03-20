import type { Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('advanced-logging');
const setupOtherContract = getSetupContract('advanced-logging-other-contract');

let contractInstance: Contract;
let otherContractInstance: Contract;

beforeAll(async () => {
  contractInstance = await setupContract();
  otherContractInstance = await setupOtherContract({ cache: false });
});

/**
 * @group node
 */
describe('Advanced Logging', () => {
  it('can get log data', async () => {
    const { value, logs } = await contractInstance.functions.test_function().call();

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
    const { value, logs } = await contractInstance.functions
      .test_function_with_require(1, 1)
      .call();

    expect(value).toBeTruthy();
    expect(logs).toEqual(['Hello Tester', { Playing: 1 }]);
  });

  it('can get log data from require [condition=false]', async () => {
    const invocation = contractInstance.functions.test_function_with_require(1, 3);
    try {
      await invocation.call();

      throw new Error('it should have thrown');
    } catch (error) {
      if ((<Error>error).message) {
        expect((<Error>error).message).toMatch(
          JSON.stringify(
            [
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
            ],
            null,
            2
          )
        );
      } else {
        throw new Error('it should be possible to decode error from "require" statement');
      }
    }
  });

  it('can get log data from a downstream Contract', async () => {
    const INPUT = 3;
    const { value, logs } = await contractInstance.functions
      .test_log_from_other_contract(INPUT, otherContractInstance.id.toB256())
      .addContracts([otherContractInstance])
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
