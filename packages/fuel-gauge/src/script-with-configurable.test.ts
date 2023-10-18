import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { CoinQuantityLike, WalletUnlocked } from 'fuels';
import { BN, Script, BaseAssetId, Provider, FUEL_NETWORK_URL } from 'fuels';
import { join } from 'path';

import abi from '../fixtures/forc-projects/script-with-configurable/out/debug/script-with-configurable-abi.json';

const bytecode = readFileSync(
  join(
    __dirname,
    '../fixtures/forc-projects/script-with-configurable/out/debug/script-with-configurable.bin'
  )
);

const defaultValues = {
  FEE: 5,
};

let wallet: WalletUnlocked;

/**
 * @group node
 */
describe('Script With Configurable', () => {
  let gasPrice: BN;
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
    const quantities: CoinQuantityLike[] = [
      {
        amount: 1_000_000,
        assetId: BaseAssetId,
      },
    ];

    wallet = await generateTestWallet(provider, quantities);
  });

  it('should returns true when input value matches default configurable constant', async () => {
    const script = new Script(bytecode, abi, wallet);

    script.setConfigurableConstants(defaultValues);

    const { value } = await script.functions.main(defaultValues.FEE).txParams({ gasPrice }).call();

    // expected to be true
    expect(new BN(value as number).toNumber()).toEqual(1);
  });

  it('should returns false when input value differs from default configurable constant', async () => {
    const configurableConstants = { FEE: 71 };

    expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);

    const script = new Script(bytecode, abi, wallet);

    script.setConfigurableConstants(defaultValues);

    const { value } = await script.functions
      .main(configurableConstants.FEE)
      .txParams({ gasPrice })
      .call();

    // expected to be false
    expect(new BN(value as number).toNumber()).toEqual(0);
  });

  it('should returns true when input value matches manually set configurable constant', async () => {
    const configurableConstants = { FEE: 35 };

    const script = new Script(bytecode, abi, wallet);

    script.setConfigurableConstants(configurableConstants);

    const { value } = await script.functions
      .main(configurableConstants.FEE)
      .txParams({ gasPrice })
      .call();

    // expected to be true
    expect(new BN(value as number).toNumber()).toEqual(1);
  });

  it('should returns false when input value differs from manually set configurable constant', async () => {
    const configurableConstants = { FEE: 10 };

    const input = { FEE: 15 };

    expect(configurableConstants.FEE).not.toEqual(input.FEE);

    const script = new Script(bytecode, abi, wallet);

    script.setConfigurableConstants(configurableConstants);

    const { value } = await script.functions.main(input.FEE).txParams({ gasPrice }).call();

    // expected to be false
    expect(new BN(value as number).toNumber()).toEqual(0);
  });
});
