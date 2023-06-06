import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { BigNumberish } from 'fuels';
import { bn, Script, NativeAssetId, Provider } from 'fuels';
import { join } from 'path';

import abi from '../test-projects/script-with-vectors-in-struct/out/debug/script-with-vectors-in-struct-abi.json';

import { getScript, getSetupContract } from './utils';

const scriptBin = readFileSync(
  join(
    __dirname,
    '../test-projects/script-with-vectors-in-struct/out/debug/script-with-vectors-in-struct.bin'
  )
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
  it('can call script and use main argument [array]', async () => {
    const wallet = await setup();
    const someArray = [1, 100];
    const scriptInstance = getScript<[BigNumberish[]], void>('script-with-array', wallet);

    const { logs } = await scriptInstance.functions.main(someArray).call();

    expect(logs.map((n) => n.toNumber())).toEqual([1]);
  });

  it('can call script and use main argument [vec]', async () => {
    const wallet = await setup();
    const someVec = [7, 2, 1, 5];
    const scriptInstance = getScript<[BigNumberish[]], void>('script-with-vector', wallet);

    const { logs } = await scriptInstance.functions.main(someVec).call();

    const formattedLog = logs.map((l) => (typeof l === 'string' ? l : l.toNumber()));

    expect(formattedLog).toEqual([
      7,
      'vector.buf.ptr',
      11240,
      'vector.buf.cap',
      4,
      'vector.len',
      4,
      'addr_of vector',
      11216,
    ]);
  });

  it('can call script and use main arguments [vec in a struct]', async () => {
    const wallet = await setup();
    const contractId = {
      value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    };
    const struct = {
      some_number: 1,
      some_vec: [1],
    };
    const scriptInstance = getScript<[SomeContract, SomeStruct], void>(
      'script-with-vectors-in-struct',
      wallet
    );

    const { logs } = await scriptInstance.functions.main(contractId, struct).call();

    expect(logs.map((n) => n.toHexString())).toEqual(['0x753820666f6f0000', '0xffffffffffffffff']);
  });

  it('can call script and use main arguments [vec in a struct with add contract]', async () => {
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
