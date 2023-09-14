/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify } from '@ethersproject/bytes';
import type { JsonAbi } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { safeExec } from '@fuel-ts/errors/test-utils';
import type { BigNumberish } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { ScriptRequest } from '@fuel-ts/program';
import type { CoinQuantityLike, TransactionResponse, TransactionResult } from '@fuel-ts/providers';
import { Provider, ScriptTransactionRequest } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';
import type { Account } from '@fuel-ts/wallet';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import { join } from 'path';

import { jsonAbiMock, jsonAbiFragmentMock } from '../test/fixtures/mocks';

import { Script } from './script';

const scriptBin = readFileSync(
  join(__dirname, './call-test-script/out/debug/call-test-script.bin')
);

const setup = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');

  // Create wallet
  const wallet = await generateTestWallet(provider, [[5_000_000, BaseAssetId]]);

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
  const request = new ScriptTransactionRequest({
    gasLimit: 1000000,
  });
  request.setScript(script, data);

  // Keep a list of coins we need to input to this transaction
  const requiredCoinQuantities: CoinQuantityLike[] = [];

  requiredCoinQuantities.push(request.calculateFee());

  // Get and add required coins to the transaction
  if (requiredCoinQuantities.length) {
    const resources = await account.getResourcesToSpend(requiredCoinQuantities);
    request.addResources(resources);
  }

  const response = await account.sendTransaction(request);
  const transactionResult = await response.waitForResult();
  const result = script.decodeCallResult(transactionResult);

  return { transactionResult, result, response };
};

// #region script-init
// #context import { Script, AbiCoder, arrayify } from 'fuels';
// #context const scriptBin = readFileSync(join(__dirname, './path/to/script-binary.bin'));

type MyStruct = {
  arg_one: boolean;
  arg_two: BigNumberish;
};

describe('Script', () => {
  let scriptRequest: ScriptRequest<MyStruct, MyStruct>;
  beforeAll(() => {
    const abiInterface = new Interface(jsonAbiFragmentMock);
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

    const newScript = new Script(scriptBin, jsonAbiFragmentMock, wallet);

    const { error } = await safeExec(() => newScript.setConfigurableConstants({ FEE: 8 }));

    const errMsg = `Error setting configurable constants: The script does not have configurable constants to be set.`;

    expect((<Error>error).message).toBe(errMsg);
  });

  it('should throw when setting configurable with wrong name', async () => {
    const wallet = await setup();

    const jsonAbiWithConfigurablesMock: JsonAbi = {
      ...jsonAbiMock,
      configurables: [
        {
          name: 'FEE',
          configurableType: {
            name: '',
            type: 1,
            typeArguments: null,
          },
          offset: 44,
        },
      ],
    };

    const script = new Script(scriptBin, jsonAbiWithConfigurablesMock, wallet);

    const { error } = await safeExec(() => script.setConfigurableConstants({ NOT_DEFINED: 8 }));

    const errMsg = `Error setting configurable constants: The script does not have a configurable constant named: 'NOT_DEFINED'.`;

    expect((<Error>error).message).toBe(errMsg);
  });
});
