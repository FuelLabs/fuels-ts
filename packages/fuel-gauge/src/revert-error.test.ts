import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import fs from 'fs';
import type { Contract, WalletUnlocked } from 'fuels';
import {
  RequireRevertError,
  RevertError,
  bn,
  ContractFactory,
  NativeAssetId,
  Provider,
} from 'fuels';
import path from 'path';

import FactoryAbi from '../test-projects/revert-error/out/debug/revert-error-abi.json';

let contractInstance: Contract;
let wallet: WalletUnlocked;

describe('Revert Error Testing', () => {
  beforeAll(async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    wallet = await generateTestWallet(provider, [[1_000, NativeAssetId]]);

    const bytecode = fs.readFileSync(
      path.join(__dirname, '../test-projects/revert-error/out/debug/revert-error.bin')
    );
    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    contractInstance = await factory.deployContract();
  });

  it('can validate_inputs [valid]', async () => {
    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(100);

    const { logs } = await contractInstance.functions
      .validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE)
      .call();

    expect(
      logs.map((d) => ({ token_id: d.token_id?.toString(), price: d.price?.toString() }))
    ).toEqual([
      {
        token_id: INPUT_TOKEN_ID.toString(),
        price: INPUT_PRICE.toString(),
      },
    ]);
  });

  it('can validate_inputs [invalid price]', async () => {
    const INPUT_PRICE = bn(0);
    const INPUT_TOKEN_ID = bn(100);

    expect(async () => {
      await contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call();
    }).rejects.toThrow(RevertError);
  });

  it('can validate_inputs [invalid price as RequireRevertError]', async () => {
    const INPUT_PRICE = bn(0);
    const INPUT_TOKEN_ID = bn(100);

    expect(async () => {
      await contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call();
    }).rejects.toThrow(RequireRevertError);
  });

  it('can validate_inputs [invalid token id]', async () => {
    const INPUT_PRICE = bn(10);
    const INPUT_TOKEN_ID = bn(55);

    expect(async () => {
      await contractInstance.functions.validate_inputs(INPUT_TOKEN_ID, INPUT_PRICE).call();
    }).rejects.toThrow(RequireRevertError);
  });
});
