import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { BigNumberish } from 'fuels';
import { Provider, bn, Script, BaseAssetId } from 'fuels';
import { join } from 'path';

import scriptAbi from '../fixtures/forc-projects/script-main-args/out/debug/script-main-args-abi.json';

import { getScript } from './utils';

const scriptBin = readFileSync(
  join(__dirname, '../fixtures/forc-projects/script-main-args/out/debug/script-main-args.bin')
);

const setup = async (balance = 5_000) => {
  const provider = await Provider.connect('http://127.0.0.1:4000/graphql');

  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, BaseAssetId]]);

  return wallet;
};

type Baz = {
  x: number;
};

describe('Script Coverage', () => {
  it('can call script and use main arguments', async () => {
    const wallet = await setup();
    // #region script-call-factory
    const foo = 33;
    const scriptInstance = new Script<BigNumberish[], BigNumberish>(scriptBin, scriptAbi, wallet);

    const { value, logs } = await scriptInstance.functions.main(foo).call();
    // #endregion script-call-factory

    expect(value?.toString()).toEqual(bn(foo).toString());
    expect(logs).toEqual(['u8 foo', 33]);
  });

  it('can call script and use main arguments [two args, read logs]', async () => {
    const wallet = await setup();
    const scriptInstance = getScript<[BigNumberish, Baz], Baz>('script-main-two-args', wallet);
    const foo = 33;
    const bar: Baz = {
      x: 12,
    };

    const { value, logs } = await scriptInstance.functions.main(foo, bar).call();

    expect(value?.toString()).toEqual(bn(foo + bar.x).toString());
    expect(logs).toEqual(['u8 foo', 33, 'u8 bar', 12, 'u8 bar', 12]);
  });

  it('can call script and use main arguments [two args, struct return]', async () => {
    const wallet = await setup();
    const scriptInstance = getScript<[BigNumberish, Baz], Baz>('script-main-return-struct', wallet);
    const foo = 1;
    const bar: Baz = {
      x: 2,
    };

    const { value } = await scriptInstance.functions.main(foo, bar).call();

    expect(value).toEqual({
      x: 3,
    });
  });

  it('can call script and use main arguments [tx params]', async () => {
    const wallet = await setup();
    const scriptInstance = new Script<BigNumberish[], BigNumberish>(scriptBin, scriptAbi, wallet);
    const foo = 42;

    await expect(
      scriptInstance.functions.main(foo).txParams({ gasLimit: 10, gasPrice: 400 }).call()
    ).rejects.toThrow(/Gas limit '10' is lower than the required/);
  });
});
