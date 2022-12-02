import type { Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('advanced-logging');

let contractInstance: Contract;

beforeAll(async () => {
  contractInstance = await setupContract();
});

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
    const { value, logs, ...rest } = await contractInstance.functions
      .test_function_with_require(1, 3)
      .call();

    console.log('value', value);
    console.log('logs', logs);
    console.log('rest', rest);
    expect(value).toBeTruthy();
  });
});
