/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify } from '@ethersproject/bytes';
import type { JsonFlatAbi } from '@fuel-ts/abi-coder';
import { AbiCoder } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/address/configs';
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
  const wallet = await generateTestWallet(provider, [[5_000_000, NativeAssetId]]);

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
    const abiCoder = new AbiCoder();
    scriptRequest = new ScriptRequest(
      scriptBin,
      (myStruct: MyStruct) => {
        const encoded = abiCoder.encode(jsonAbiFragmentMock[0].inputs, [myStruct]);
        return arrayify(encoded);
      },
      (scriptResult) => {
        if (scriptResult.returnReceipt.type === ReceiptType.Revert) {
          throw new Error('Reverted');
        }
        if (scriptResult.returnReceipt.type !== ReceiptType.ReturnData) {
          throw new Error('fail');
        }
        const decoded = abiCoder.decode(
          jsonAbiFragmentMock[0].outputs,
          scriptResult.returnReceipt.data
        );
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
    const transactionWithReceipts = await response.fetch();

    expect(transactionWithReceipts?.rawPayload).toBeDefined();
  });

  it('should throw if script has no configurable to be set', async () => {
    const wallet = await setup();

    let error;

    const newScript = new Script(scriptBin, jsonAbiFragmentMock, wallet);

    try {
      newScript.setConfigurableConstants({ FEE: 8 });
    } catch (e) {
      error = e;
    }

    expect((<Error>error).message).toMatch(/Script has no configurable constants to be set/);
  });

  it('should throw when setting configurable with wrong name', async () => {
    const wallet = await setup();

    const jsonAbiWithConfigurablesMock: JsonFlatAbi = {
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

    let error;

    const script = new Script(scriptBin, jsonAbiWithConfigurablesMock, wallet);

    try {
      script.setConfigurableConstants({ NOT_DEFINED: 8 });
    } catch (e) {
      error = e;
    }

    expect((<Error>error).message).toMatch(
      /Script has no configurable constant named: NOT_DEFINED/
    );
  });
});
