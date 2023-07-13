import { Wallet } from '@fuel-ts/wallet';

import { createWallet } from './createWallet';

describe('Services Fuels', () => {
  it('Create wallet using env PRIVATE_KEY', () => {
    const wallet = Wallet.generate();
    process.env.PRIVATE_KEY = wallet.privateKey;
    expect(createWallet().address.toString()).toBe(wallet.address.toString());
  });

  it('Create wallet using argument should override env PRIVATE_KEY', () => {
    const wallet = Wallet.generate();
    const wallet2 = Wallet.generate();
    process.env.PRIVATE_KEY = wallet.privateKey;
    expect(createWallet(wallet2.privateKey).address.toString()).toBe(wallet2.address.toString());
  });

  it('Should failt if not privateKey is found', () => {
    process.env.PRIVATE_KEY = '';
    expect(() => createWallet()).rejects.toThrowError(/You must provide a privateKey/);
  });
});
