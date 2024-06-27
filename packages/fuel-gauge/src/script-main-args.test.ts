import type { BigNumberish } from 'fuels';
import { Provider, bn, Script, FUEL_NETWORK_URL } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

import { getScript } from './utils';

const setup = async (balance = 500_000) => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const baseAssetId = provider.getBaseAssetId();

  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, baseAssetId]]);

  return wallet;
};

type Baz = {
  x: number;
};

/**
 * @group node
 */
describe('Script Coverage', () => {
  const { binHexlified: scriptBin, abiContents: scriptAbi } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.SCRIPT_MAIN_ARGS
  );

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
      scriptInstance.functions
        .main(foo)
        .txParams({
          gasLimit: 10,
        })
        .call()
    ).rejects.toThrow(/Gas limit '10' is lower than the required/);
  });
});
