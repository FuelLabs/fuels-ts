import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BigNumberish } from 'fuels';
import { NativeAssetId, Provider } from 'fuels';

import { getScript } from './utils';

const setup = async (balance = 5_000) => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');

  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, NativeAssetId]]);

  return wallet;
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
});
