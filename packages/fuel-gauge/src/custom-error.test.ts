import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import fs from 'fs';
import type { Contract, WalletUnlocked } from 'fuels';
import { bn, ContractFactory, NativeAssetId, Provider } from 'fuels';
import path from 'path';

import FactoryAbi from '../test-projects/custom-error/out/debug/custom-error-abi.json';

let contractInstance: Contract;
let wallet: WalletUnlocked;

describe('Custom Error Testing', () => {
  beforeAll(async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    wallet = await generateTestWallet(provider, [[1_000, NativeAssetId]]);

    const bytecode = fs.readFileSync(
      path.join(__dirname, '../test-projects/custom-error/out/debug/custom-error.bin')
    );
    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    contractInstance = await factory.deployContract();
  });

  it.only('can validate_inputs [valid]', async () => {
    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(100);

    const { logs } = await contractInstance.functions
      .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
      .call();

    expect(logs).toEqual([
      {
        token_id: INPUT_TOKEN_ID,
        price: INPUT_PRICE,
      },
    ]);
  });

  it('can validate_inputs [invalid price]', async () => {
    const INPUT_PRICE = 0;
    const INPUT_TOKEN_ID = 100;

    const { logs } = await contractInstance.functions
      .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
      .call();

    expect(logs).toEqual([
      {
        token_id: INPUT_TOKEN_ID,
        price: INPUT_PRICE,
      },
    ]);
  });

  it('can validate_inputs [invalid id]', async () => {
    const INPUT_PRICE = 120;
    const INPUT_TOKEN_ID = 90;

    const { logs } = await contractInstance.functions
      .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
      .call();

    expect(logs).toEqual([
      {
        token_id: INPUT_TOKEN_ID,
        price: INPUT_PRICE,
      },
    ]);
  });
});
