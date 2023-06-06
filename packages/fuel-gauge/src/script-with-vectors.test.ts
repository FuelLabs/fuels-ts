import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { BigNumberish } from 'fuels';
import { bn, Script, NativeAssetId, Provider } from 'fuels';
import { join } from 'path';

import abi from '../test-projects/script-with-vectors/out/debug/script-with-vectors-abi.json';

import { getSetupContract } from './utils';

const scriptBin = readFileSync(
  join(__dirname, '../test-projects/script-main-args/out/debug/script-main-args.bin')
);

const setup = async (balance = 5_000) => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');

  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, NativeAssetId]]);

  return wallet;
};

type SomeContract = {
  value: string;
};

type SomeStruct = {
  some_number: BigNumberish;
  some_vec: BigNumberish[];
};

describe('Script With Vectors', () => {
  it('can call script and use main arguments', async () => {
    const wallet = await setup();
    const contractId = {
      value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    };
    const struct = {
      some_number: 1,
      some_vec: [1],
    };
    const scriptInstance = new Script<[SomeContract, SomeStruct], unknown>(scriptBin, abi, wallet);

    const { logs } = await scriptInstance.functions.main(contractId, struct).call();

    expect(logs).toEqual([bn('0x753820666f6f0000'), bn('0xffffffffffffffff')]);
  });

  it('can call script and use main arguments [alternative]', async () => {
    const wallet = await setup();
    const contractInstance = await getSetupContract('coverage-contract')();
    const struct = {
      some_number: 1,
      some_vec: [1],
    };
    const scriptInstance = new Script<[SomeContract, SomeStruct], unknown>(scriptBin, abi, wallet);

    const { logs } = await scriptInstance.functions
      .main({ value: contractInstance.id.toHexString() }, struct)
      .addContracts([contractInstance])
      .txParams({ gasPrice: 1 })
      .call();

    expect(logs).toEqual([
      bn('0x753820666f6f0000'),
      bn(contractInstance.id.toB256().substring(0, 18)),
    ]);
  });
});
