import type { CoinQuantityLike, WalletUnlocked } from 'fuels';
import { Script, Provider, FUEL_NETWORK_URL } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

const defaultValues = {
  FEE: 5,
};

let wallet: WalletUnlocked;

/**
 * @group node
 */
describe('Script With Configurable', () => {
  const { binHexlified: bytecode, abiContents: abi } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.SCRIPT_WITH_CONFIGURABLE
  );

  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const baseAssetId = provider.getBaseAssetId();
    const quantities: CoinQuantityLike[] = [
      {
        amount: 1_000_000,
        assetId: baseAssetId,
      },
    ];

    wallet = await generateTestWallet(provider, quantities);
  });

  it('should returns true when input value matches default configurable constant', async () => {
    const script = new Script(bytecode, abi, wallet);

    script.setConfigurableConstants(defaultValues);

    const { value } = await script.functions.main(defaultValues.FEE).call();

    expect(value).toBe(true);
  });

  it('should returns false when input value differs from default configurable constant', async () => {
    const configurableConstants = { FEE: 71 };

    expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);

    const script = new Script(bytecode, abi, wallet);

    script.setConfigurableConstants(defaultValues);

    const { value } = await script.functions.main(configurableConstants.FEE).call();

    expect(value).toBe(false);
  });

  it('should returns true when input value matches manually set configurable constant', async () => {
    const configurableConstants = { FEE: 35 };

    const script = new Script(bytecode, abi, wallet);

    script.setConfigurableConstants(configurableConstants);

    const { value } = await script.functions.main(configurableConstants.FEE).call();

    expect(value).toBe(true);
  });

  it('should returns false when input value differs from manually set configurable constant', async () => {
    const configurableConstants = { FEE: 10 };

    const input = { FEE: 15 };

    expect(configurableConstants.FEE).not.toEqual(input.FEE);

    const script = new Script(bytecode, abi, wallet);

    script.setConfigurableConstants(configurableConstants);

    const { value } = await script.functions.main(input.FEE).call();

    expect(value).toBe(false);
  });
});
