import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { FuelError } from '@fuel-ts/errors';
import { Script, bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';
import type {
  AdvancedLoggingAbi,
  AdvancedLoggingOtherContractAbi,
  CallTestContractAbi,
  ConfigurableContractAbi,
  CoverageContractAbi,
} from '../test/typegen/contracts';
import {
  AdvancedLoggingAbi__factory,
  AdvancedLoggingOtherContractAbi__factory,
  CallTestContractAbi__factory,
  ConfigurableContractAbi__factory,
  CoverageContractAbi__factory,
} from '../test/typegen/contracts';
import AdvancedLoggingAbiHex from '../test/typegen/contracts/AdvancedLoggingAbi.hex';
import AdvancedLoggingOtherContractAbiHex from '../test/typegen/contracts/AdvancedLoggingOtherContractAbi.hex';
import CallTestContractAbiHex from '../test/typegen/contracts/CallTestContractAbi.hex';
import ConfigurableContractAbiHex from '../test/typegen/contracts/ConfigurableContractAbi.hex';
import CoverageContractAbiHex from '../test/typegen/contracts/CoverageContractAbi.hex';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('Advanced Logging', () => {
  it('can get log data', async () => {
    using advancedLogContract = await launchTestContract({
      deployer: AdvancedLoggingAbi__factory,
      bytecode: AdvancedLoggingAbiHex,
    });

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
    using advancedLogContract = await launchTestContract({
      deployer: AdvancedLoggingAbi__factory,
      bytecode: AdvancedLoggingAbiHex,
    });

    const { value, logs } = await advancedLogContract.functions
      .test_function_with_require(1, 1)
      .call();

    expect(value).toBeTruthy();
    expect(logs).toEqual(['Hello Tester', { Playing: 1 }]);
  });

  it('can get log data from require [condition=false]', async () => {
    using advancedLogContract = await launchTestContract({
      deployer: AdvancedLoggingAbi__factory,
      bytecode: AdvancedLoggingAbiHex,
    });

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
    using launched = await launchTestNode({
      contractsConfigs: [
        { deployer: AdvancedLoggingAbi__factory, bytecode: AdvancedLoggingAbiHex },
        {
          deployer: AdvancedLoggingOtherContractAbi__factory,
          bytecode: AdvancedLoggingOtherContractAbiHex,
        },
      ],
    });

    // #TODO: Find a cleaner way to infer these types
    const advancedLogContract = launched.contracts[0] as AdvancedLoggingAbi;
    const otherAdvancedLogContract = launched.contracts[1] as AdvancedLoggingOtherContractAbi;

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

  describe('should properly decode all logs in a multicall with inter-contract calls', async () => {
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
          { deployer: AdvancedLoggingAbi__factory, bytecode: AdvancedLoggingAbiHex },
          {
            deployer: AdvancedLoggingOtherContractAbi__factory,
            bytecode: AdvancedLoggingOtherContractAbiHex,
          },
          { deployer: CallTestContractAbi__factory, bytecode: CallTestContractAbiHex },
          { deployer: ConfigurableContractAbi__factory, bytecode: ConfigurableContractAbiHex },
          { deployer: CoverageContractAbi__factory, bytecode: CoverageContractAbiHex },
        ],
      });

      // #TODO: Find a cleaner way to infer these types
      const advancedLogContract = launched.contracts[0] as AdvancedLoggingAbi;
      const otherAdvancedLogContract = launched.contracts[1] as AdvancedLoggingAbi;
      const callTest = launched.contracts[2] as CallTestContractAbi;
      const configurable = launched.contracts[3] as ConfigurableContractAbi;
      const coverage = launched.contracts[4] as CoverageContractAbi;

      const { logs } = await callTest
        .multiCall([
          advancedLogContract.functions
            .test_log_from_other_contract(10, otherAdvancedLogContract.id.toB256())
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
      using launched = await launchTestNode({
        contractsConfigs: [
          { deployer: AdvancedLoggingAbi__factory, bytecode: AdvancedLoggingAbiHex },
          {
            deployer: AdvancedLoggingOtherContractAbi__factory,
            bytecode: AdvancedLoggingOtherContractAbiHex,
          },
          { deployer: CallTestContractAbi__factory, bytecode: CallTestContractAbiHex },
          { deployer: ConfigurableContractAbi__factory, bytecode: ConfigurableContractAbiHex },
          { deployer: CoverageContractAbi__factory, bytecode: CoverageContractAbiHex },
        ],
      });

      // #TODO: Find a cleaner way to infer these types
      const advancedLogContract = launched.contracts[0] as AdvancedLoggingAbi;
      const otherAdvancedLogContract = launched.contracts[1] as AdvancedLoggingAbi;
      const callTest = launched.contracts[2] as CallTestContractAbi;
      const configurable = launched.contracts[3] as ConfigurableContractAbi;
      const coverage = launched.contracts[4] as CoverageContractAbi;

      const wallet = await generateTestWallet(launched.provider, [
        [500_000, launched.provider.getBaseAssetId()],
      ]);

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

      const txCost = await launched.provider.getTransactionCost(request, {
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

  describe('decode logs from a script set to manually call other contracts', async () => {
    const amount = Math.floor(Math.random() * 10) + 1;

    const expectedLogs = [
      'Hello from script',
      'Hello from main Contract',
      'Hello from other Contract',
      'Received value from main Contract:',
      amount,
    ];

    beforeAll(async () => {});

    it('when using InvocationScope', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          { deployer: AdvancedLoggingAbi__factory, bytecode: AdvancedLoggingAbiHex },
          {
            deployer: AdvancedLoggingOtherContractAbi__factory,
            bytecode: AdvancedLoggingOtherContractAbiHex,
          },
        ],
      });

      const advancedLogContract = launched.contracts[0] as AdvancedLoggingAbi;
      const otherAdvancedLogContract = launched.contracts[1] as AdvancedLoggingAbi;

      const wallet = await generateTestWallet(launched.provider, [
        [300_000, launched.provider.getBaseAssetId()],
      ]);

      const { abiContents, binHexlified } = getFuelGaugeForcProject(
        FuelGaugeProjectsEnum.SCRIPT_CALL_CONTRACT
      );
      const script = new Script(binHexlified, abiContents, wallet);
      const { logs } = await script.functions
        .main(advancedLogContract.id.toB256(), otherAdvancedLogContract.id.toB256(), amount)
        .addContracts([advancedLogContract, otherAdvancedLogContract])
        .call();

      expect(logs).toStrictEqual(expectedLogs);
    });

    it('when using ScriptTransactionRequest', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          { deployer: AdvancedLoggingAbi__factory, bytecode: AdvancedLoggingAbiHex },
          {
            deployer: AdvancedLoggingOtherContractAbi__factory,
            bytecode: AdvancedLoggingOtherContractAbiHex,
          },
        ],
      });

      const advancedLogContract = launched.contracts[0] as AdvancedLoggingAbi;
      const otherAdvancedLogContract = launched.contracts[1] as AdvancedLoggingAbi;

      const wallet = await generateTestWallet(launched.provider, [
        [300_000, launched.provider.getBaseAssetId()],
      ]);
      const { abiContents, binHexlified } = getFuelGaugeForcProject(
        FuelGaugeProjectsEnum.SCRIPT_CALL_CONTRACT
      );

      const script = new Script(binHexlified, abiContents, wallet);

      const request = await script.functions
        .main(advancedLogContract.id.toB256(), otherAdvancedLogContract.id.toB256(), amount)
        .addContracts([advancedLogContract, otherAdvancedLogContract])
        .getTransactionRequest();

      const txCost = await launched.provider.getTransactionCost(request, {
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
