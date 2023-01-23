import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import fs from 'fs';
import type { Contract, WalletUnlocked } from 'fuels';
import { bn, ContractFactory, NativeAssetId, Provider } from 'fuels';
import path from 'path';

import FactoryAbi from '../test-projects/output-test/out/debug/output-test-abi.json';

let contractInstance: Contract;
let wallet: WalletUnlocked;

describe('Output Testing', () => {
  beforeAll(async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    wallet = await generateTestWallet(provider, [[1_000, NativeAssetId]]);

    const bytecode = fs.readFileSync(
      path.join(__dirname, '../test-projects/output-test/out/debug/output-test.bin')
    );
    const factory = new ContractFactory(bytecode, FactoryAbi, wallet);
    contractInstance = await factory.deployContract();
  });

  it('can get output [call]', async () => {
    const ASSET = { value: '0x0000000000000000000000000000000000000000000000000000000000000000' };
    const SEED = '0x3212e7f73bb27139133be858aab231776abaa8f2e68d449fc4d55ed901010101';
    const fee = (await contractInstance.functions.get_fee(ASSET).get()).value;

    const result = await contractInstance.functions
      .request(SEED)
      .txParams({ gasPrice: 1 })
      .callParams({ forward: { amount: fee, assetId: ASSET.value } })
      .call();

    expect(result.value.toString()).toEqual(bn(31337).toString());
  });

  it('can get output [dryRun]', async () => {
    const ASSET = { value: '0x0000000000000000000000000000000000000000000000000000000000000000' };
    const SEED = '0x3212e7f73bb27139133be858aab231776abaa8f2e68d449fc4d55ed901010101';
    const fee = (await contractInstance.functions.get_fee(ASSET).get()).value;

    const result = await contractInstance.functions
      .request(SEED)
      .txParams({ gasPrice: 1 })
      .callParams({ forward: { amount: fee, assetId: ASSET.value } })
      .dryRun();

    expect(result.value.toString()).toEqual(bn(31337).toString());
  });
});
