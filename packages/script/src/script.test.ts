/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JsonAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import type { Account, TransactionResponse, TransactionResult } from '@fuel-ts/account';
import { Provider, ScriptTransactionRequest } from '@fuel-ts/account';
import { FUEL_NETWORK_URL } from '@fuel-ts/account/configs';
import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { BigNumberish } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { ScriptRequest } from '@fuel-ts/program';
import { ReceiptType } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import { getScriptForcProject, ScriptProjectsEnum } from '../test/fixtures';
import { jsonAbiMock } from '../test/mocks';

import { Script } from './index';

const { abiContents: scriptJsonAbi, binHexlified: scriptBin } = getScriptForcProject(
  ScriptProjectsEnum.CALL_TEST_SCRIPT
);

const setup = async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const baseAssetId = provider.getBaseAssetId();

  // Create wallet
  const wallet = await generateTestWallet(provider, [[5_000_000, baseAssetId]]);

  return wallet;
};

const callScript = async <TData, TResult>(
  account: Account,
  script: ScriptRequest<TData, TResult>,
  data: TData
): Promise<{
  transactionResult: TransactionResult<any>;
  result: TResult;
  response: TransactionResponse;
}> => {
  const request = new ScriptTransactionRequest();
  request.setScript(script, data);

  // Keep a list of coins we need to input to this transaction

  const txCost = await account.getTransactionCost(request);

  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;

  await account.fund(request, txCost);

  const response = await account.sendTransaction(request);
  const transactionResult = await response.waitForResult();
  const result = script.decodeCallResult(transactionResult);

  return { transactionResult, result, response };
};

// #region script-init
// #import { ScriptRequest, arrayify };
// #context const scriptBin = readFileSync(join(__dirname, './path/to/script-binary.bin'));

type MyStruct = {
  arg_one: boolean;
  arg_two: BigNumberish;
};

/**
 * @group node
 */
describe('Script', () => {
  let scriptRequest: ScriptRequest<MyStruct, MyStruct>;
  beforeAll(() => {
    const abiInterface = new Interface(scriptJsonAbi);
    scriptRequest = new ScriptRequest(
      scriptBin,
      (myStruct: MyStruct) => {
        const encoded = abiInterface.functions.main.encodeArguments([myStruct]);

        return arrayify(encoded);
      },
      (scriptResult) => {
        if (scriptResult.returnReceipt.type === ReceiptType.Revert) {
          throw new Error('Reverted');
        }
        if (scriptResult.returnReceipt.type !== ReceiptType.ReturnData) {
          throw new Error('fail');
        }

        const decoded = abiInterface.functions.main.decodeOutput(scriptResult.returnReceipt.data);
        return (decoded as any)[0];
      }
    );
  });
  // #endregion script-init

  it('can call a script', async () => {
    const wallet = await setup();
    const input = {
      arg_one: true,
      arg_two: 1337,
    };
    const output = {
      arg_one: true,
      arg_two: bn(1337),
    };
    const { transactionResult, result } = await callScript(wallet, scriptRequest, input);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(output));
    expect(transactionResult.gasUsed?.toNumber()).toBeGreaterThan(0);
  });

  it('should TransactionResponse fetch return graphql transaction and also decoded transaction', async () => {
    const wallet = await setup();
    const input = {
      arg_one: true,
      arg_two: 1337,
    };
    const { response } = await callScript(wallet, scriptRequest, input);
    const transaction = await response.fetch();

    expect(transaction?.rawPayload).toBeDefined();
  });

  it('should throw if script has no configurable to be set', async () => {
    const wallet = await setup();

    const newScript = new Script(scriptBin, jsonAbiMock, wallet);

    await expectToThrowFuelError(
      () => newScript.setConfigurableConstants({ FEE: 8 }),
      new FuelError(
        FuelError.CODES.INVALID_CONFIGURABLE_CONSTANTS,
        'Error setting configurable constants: The script does not have configurable constants to be set.'
      )
    );
  });

  it('should throw when setting configurable with wrong name', async () => {
    const wallet = await setup();

    const jsonAbiWithConfigurablesMock: JsonAbi = {
      ...jsonAbiMock,
      configurables: [
        {
          name: 'FEE',
          concreteTypeId: 'a760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
          offset: 44,
        },
      ],
    };

    const script = new Script(scriptBin, jsonAbiWithConfigurablesMock, wallet);

    await expectToThrowFuelError(
      () => script.setConfigurableConstants({ NOT_DEFINED: 8 }),
      new FuelError(
        FuelError.CODES.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: The script does not have a configurable constant named: 'NOT_DEFINED'.`
      )
    );
  });
});
