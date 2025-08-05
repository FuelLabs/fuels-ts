import type { FuelError } from '@fuel-ts/errors';
import { bn, Contract, ErrorCode, type JsonAbi, ZeroBytes32 } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import {
  AdvancedLoggingOtherContractFactory,
  AdvancedLoggingFactory,
  CallTestContractFactory,
  ConfigurableContractFactory,
  CoverageContractFactory,
  AbiContractFactory,
} from '../test/typegen/contracts';
import { ScriptCallContract, ScriptCallLoggingContracts } from '../test/typegen/scripts';

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
    const { value, logs, groupedLogs } = await waitForResult();

    expect(value).toBeTruthy();
    logs[5].game_id = logs[5].game_id.toHex();
    logs[9].game_id = logs[9].game_id.toHex();

    const expectedLogs = [
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
    ];
    expect(logs).toEqual(expectedLogs);
    expect(groupedLogs).toStrictEqual({
      [advancedLogContract.id.toB256()]: expectedLogs,
    });
  });

  it('can get log data from require [condition=true]', async () => {
    using advancedLogContract = await launchTestContract({
      factory: AdvancedLoggingFactory,
    });

    const { waitForResult } = await advancedLogContract.functions
      .test_function_with_require(1, 1)
      .call();

    const { value, logs, groupedLogs } = await waitForResult();

    expect(value).toBeTruthy();
    expect(logs).toEqual(['Hello Tester', { Playing: 1 }]);
    expect(groupedLogs).toStrictEqual({
      [advancedLogContract.id.toB256()]: ['Hello Tester', { Playing: 1 }],
    });
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

    const { value, logs, groupedLogs } = await waitForResult();

    expect(value).toBeTruthy();
    expect(logs).toEqual([
      'Hello from main Contract',
      'Hello from other Contract',
      'Received value from main Contract:',
      INPUT,
    ]);
    expect(groupedLogs).toStrictEqual({
      [advancedLogContract.id.toB256()]: ['Hello from main Contract'],
      [otherAdvancedLogContract.id.toB256()]: [
        'Hello from other Contract',
        'Received value from main Contract:',
        INPUT,
      ],
    });
  });

  it('should not decode logs from external contracts when JSON ABIs are missing', async () => {
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

    const script = new ScriptCallLoggingContracts(wallet);

    const call = await script.functions
      .main(advancedLogContract.id.toB256(), otherAdvancedLogContract.id.toB256())
      .call();

    const { logs, groupedLogs } = await call.waitForResult();

    expect(logs).toBeDefined();

    expect(logs).toStrictEqual(['log from script 1', 'log from script 2']);
    expect(groupedLogs).toStrictEqual({
      [ZeroBytes32]: ['log from script 1', 'log from script 2'],
    });
  });

  it('should not decode logs from external contracts when JSON ABIs are missing [ADD ID ONLY]', async () => {
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

    const script = new ScriptCallLoggingContracts(wallet);

    const contractA = advancedLogContract.id.toB256();
    const contractB = otherAdvancedLogContract.id.toB256();

    const call = await script.functions
      .main(contractA, contractB)
      .addContracts([contractA, contractB])
      .call();

    const { logs, groupedLogs } = await call.waitForResult();

    expect(logs).toBeDefined();
    expect(logs).toStrictEqual(['log from script 1', 'log from script 2']);
    expect(groupedLogs).toStrictEqual({
      [ZeroBytes32]: ['log from script 1', 'log from script 2'],
    });
  });

  it('should decode logs from external contracts only when JSON ABI is present', async () => {
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

    const script = new ScriptCallLoggingContracts(wallet);

    const call = await script.functions
      .main(advancedLogContract.id.toB256(), otherAdvancedLogContract.id.toB256())
      .addContracts([advancedLogContract])
      .call();

    const { logs, groupedLogs } = await call.waitForResult();

    expect(logs).toBeDefined();
    expect(logs).toStrictEqual([
      'log from script 1',
      'Hello from main Contract',
      'log from script 2',
    ]);
    expect(groupedLogs).toStrictEqual({
      [ZeroBytes32]: ['log from script 1', 'log from script 2'],
      [advancedLogContract.id.toB256()]: ['Hello from main Contract'],
    });
  });

  it('should decode all logs when all contracts JSON ABIs are present', async () => {
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

    const script = new ScriptCallLoggingContracts(wallet);

    const call = await script.functions
      .main(advancedLogContract.id.toB256(), otherAdvancedLogContract.id.toB256())
      .addContracts([advancedLogContract, otherAdvancedLogContract])
      .call();

    const { logs, groupedLogs } = await call.waitForResult();

    expect(logs).toBeDefined();
    expect(logs).toStrictEqual([
      'log from script 1',
      'Hello from main Contract',
      'Hello from other Contract',
      'Received value from main Contract:',
      10,
      'log from script 2',
    ]);
    expect(groupedLogs).toStrictEqual({
      [ZeroBytes32]: ['log from script 1', 'log from script 2'],
      [advancedLogContract.id.toB256()]: ['Hello from main Contract'],
      [otherAdvancedLogContract.id.toB256()]: [
        'Hello from other Contract',
        'Received value from main Contract:',
        10,
      ],
    });
  });

  describe('should properly decode all logs in a multiCall with inter-contract calls', () => {
    const testStruct = {
      a: true,
      b: 100000,
    };

    it('when using InvocationScope', async () => {
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

      const { logs, groupedLogs } = await waitForResult();

      expect(logs).toStrictEqual([
        'Hello from main Contract',
        'Hello from other Contract',
        'Received value from main Contract:',
        10,
        expect.toEqualBn(100000),
        { tag: '000', age: 21, scores: [1, 3, 4] },
        'fuelfuel',
      ]);
      expect(groupedLogs).toStrictEqual({
        [advancedLogContract.id.toB256()]: ['Hello from main Contract'],
        [otherAdvancedLogContract.id.toB256()]: [
          'Hello from other Contract',
          'Received value from main Contract:',
          10,
        ],
        [coverage.id.toB256()]: ['fuelfuel'],
        [callTest.id.toB256()]: [expect.toEqualBn(100000)],
        [configurable.id.toB256()]: [{ tag: '000', age: 21, scores: [1, 3, 4] }],
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

      await request.estimateAndFund(wallet);

      const { waitForResult } = await wallet.sendTransaction(request, {
        estimateTxDependencies: false,
      });

      const { logs, groupedLogs } = await waitForResult();

      expect(logs).toStrictEqual([
        'Hello from main Contract',
        'Hello from other Contract',
        'Received value from main Contract:',
        10,
        expect.toEqualBn(100000),
        { tag: '000', age: 21, scores: [1, 3, 4] },
        'fuelfuel',
      ]);
      expect(groupedLogs).toStrictEqual({
        [advancedLogContract.id.toB256()]: ['Hello from main Contract'],
        [otherAdvancedLogContract.id.toB256()]: [
          'Hello from other Contract',
          'Received value from main Contract:',
          10,
        ],
        [coverage.id.toB256()]: ['fuelfuel'],
        [callTest.id.toB256()]: [expect.toEqualBn(100000)],
        [configurable.id.toB256()]: [{ tag: '000', age: 21, scores: [1, 3, 4] }],
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

      const { logs, groupedLogs } = await waitForResult();

      expect(logs).toStrictEqual(expectedLogs);
      expect(groupedLogs).toStrictEqual({
        [ZeroBytes32]: ['Hello from script'],
        [advancedLogContract.id.toB256()]: ['Hello from main Contract'],
        [otherAdvancedLogContract.id.toB256()]: [
          'Hello from other Contract',
          'Received value from main Contract:',
          amount,
        ],
      });
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

      await request.estimateAndFund(wallet);

      const { waitForResult } = await wallet.sendTransaction(request);

      const { logs, groupedLogs } = await waitForResult();

      expect(logs).toStrictEqual(expectedLogs);
      expect(groupedLogs).toStrictEqual({
        [ZeroBytes32]: ['Hello from script'],
        [advancedLogContract.id.toB256()]: ['Hello from main Contract'],
        [otherAdvancedLogContract.id.toB256()]: [
          'Hello from other Contract',
          'Received value from main Contract:',
          amount,
        ],
      });
    });

    it('should not throw when unable to decode a log with a missing JSON ABI', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [{ factory: AbiContractFactory }],
      });
      const {
        wallets: [wallet],
        contracts: [originalContract],
      } = launched;
      const abiWithoutLogs: JsonAbi = {
        ...originalContract.interface.jsonAbi,
        loggedTypes: [],
      };
      const contract = new Contract(originalContract.id, abiWithoutLogs, wallet);

      const { waitForResult } = await contract.functions.types_u8(8).call();
      const { logs, groupedLogs } = await waitForResult();

      const expectedLogEntry = {
        __decoded: false,
        data: '0xff',
        logId: '14454674236531057292',
      };
      expect(logs).toStrictEqual([expectedLogEntry]);
      expect(groupedLogs).toStrictEqual({
        [originalContract.id.toB256()]: [expectedLogEntry],
      });
    });

    it('should not display undecoded logs in the error message', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [{ factory: AbiContractFactory }],
      });
      const {
        wallets: [wallet],
        contracts: [originalContract],
      } = launched;
      const abiWithoutLogs: JsonAbi = {
        ...originalContract.interface.jsonAbi,
        loggedTypes: [],
      };
      const contract = new Contract(originalContract.id, abiWithoutLogs, wallet);

      const call = () => contract.functions.types_u8(255).call();

      await expectToThrowFuelError(call, {
        code: ErrorCode.SCRIPT_REVERTED,
        message: 'The transaction reverted because of an "assert_eq" statement.',
        metadata: {
          logs: [
            {
              __decoded: false,
              data: '0xff',
              logId: '14454674236531057292',
            },
            {
              __decoded: false,
              data: '0x08',
              logId: '14454674236531057292',
            },
          ],
        },
      });
    });
  });
});
