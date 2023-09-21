import { Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';
import { FUEL_NETWORK_URL } from '@fuel-ts/wallet/configs';

import { createWallet } from './createWallet';

describe('Services Fuels', () => {
  let provider: Provider;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
  });

  it('Create wallet using env PRIVATE_KEY', async () => {
    const wallet = Wallet.generate({ provider });
    process.env.PRIVATE_KEY = wallet.privateKey;
    const wallet2 = await createWallet(provider.url);
    expect(wallet.address.toString()).toBe(wallet2.address.toString());
  });

  it('Create wallet using argument should override env PRIVATE_KEY', async () => {
    const wallet = Wallet.generate({ provider });
    const wallet2 = Wallet.generate({ provider });
    process.env.PRIVATE_KEY = wallet.privateKey;
    const wallet3 = await createWallet(provider.url, wallet2.privateKey);
    expect(wallet3.address.toString()).toBe(wallet2.address.toString());
  });

  it('Should fail if not privateKey is found', async () => {
    delete process.env.PRIVATE_KEY;
    await expect(async () => createWallet(provider.url)).rejects.toThrowError(
      /You must provide a privateKey/
    );
  });
});
