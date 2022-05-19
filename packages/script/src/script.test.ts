/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify } from '@ethersproject/bytes';
import { AbiCoder } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import type { CoinQuantityLike } from '@fuel-ts/providers';
import { Provider, ScriptTransactionRequest, ReceiptType } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';
import { seedWallet } from '@fuel-ts/wallet/dist/test-utils';
import { readFileSync } from 'fs';
import { join } from 'path';

import { Script } from './script';

const scriptBin = readFileSync(
  join(__dirname, './call-test-script/out/debug/call-test-script.bin')
);

const setup = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');

  // Create wallet
  const wallet = Wallet.generate({ provider });
  await seedWallet(wallet, [[5_000_000, NativeAssetId]]);

  return wallet;
};

const callScript = async <TData, TResult>(
  wallet: Wallet,
  script: Script<TData, TResult>,
  data: TData
): Promise<TResult> => {
  const request = new ScriptTransactionRequest({
    gasLimit: 1000000,
  });
  request.setScript(script, data);

  // Keep a list of coins we need to input to this transaction
  const requiredCoinQuantities: CoinQuantityLike[] = [];

  const amount = request.calculateFee();
  requiredCoinQuantities.push([amount]);

  // Get and add required coins to the transaction
  if (requiredCoinQuantities.length) {
    const coins = await wallet.getCoinsToSpend(requiredCoinQuantities);
    request.addCoins(coins);
  }

  const response = await wallet.sendTransaction(request);
  const encodedResult = await response.waitForResult();
  const result = script.decodeCallResult(encodedResult);

  return result;
};

const scriptAbi = [
  {
    type: 'function',
    name: 'main',
    inputs: [
      {
        name: 'my_struct',
        type: 'struct MyStruct',
        components: [
          {
            name: 'arg_one',
            type: 'bool',
          },
          {
            name: 'arg_two',
            type: 'u64',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'my_struct',
        type: 'struct MyStruct',
        components: [
          {
            name: 'arg_one',
            type: 'bool',
          },
          {
            name: 'arg_two',
            type: 'u64',
          },
        ],
      },
    ],
  },
];

type MyStruct = {
  arg_one: boolean;
  arg_two: bigint;
};

describe('Script', () => {
  let script: Script<MyStruct, MyStruct>;
  beforeAll(async () => {
    const abiCoder = new AbiCoder();
    script = new Script(
      scriptBin,
      (myStruct: MyStruct) => {
        const encoded = abiCoder.encode(scriptAbi[0].inputs, [myStruct]);
        return arrayify(encoded);
      },
      (scriptResult) => {
        if (scriptResult.returnReceipt.type === ReceiptType.Revert) {
          throw new Error('Reverted');
        }
        if (scriptResult.returnReceipt.type !== ReceiptType.ReturnData) {
          throw new Error('fail');
        }
        const decoded = abiCoder.decode(scriptAbi[0].outputs, scriptResult.returnReceipt.data);
        return (decoded as any)[0];
      }
    );
  });

  it('can call a script', async () => {
    const wallet = await setup();
    const obj = {
      arg_one: true,
      arg_two: 1337n,
    };
    const result = await callScript(wallet, script, obj);
    expect(result).toMatchObject(obj);
  });
});
