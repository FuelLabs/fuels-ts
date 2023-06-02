import { NativeAssetId } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';
import type { TransactionRequestLike, TransactionResponse } from '@fuel-ts/providers';
import { transactionRequestify, Provider } from '@fuel-ts/providers';
import { safeExec } from '@fuel-ts/utils/test';

import { generateTestWallet } from '../test/utils/generateTestWallet';

import { FUEL_NETWORK_URL } from './configs';
import { Wallet } from './wallet';
import { WalletUnlocked } from './wallets';

describe('Wallet', () => {
  let wallet: WalletUnlocked;

  beforeAll(() => {
    wallet = Wallet.generate();
  });

  it('Instantiate a new wallet', () => {
    const lockedWallet = Wallet.fromAddress(wallet.address);
    expect(lockedWallet.address).toEqual(wallet.address);
  });

  it('Create a locked wallet', () => {
    const lockedWallet = Wallet.fromAddress(wallet.address);
    expect(lockedWallet.address).toEqual(wallet.address);
  });

  it('Unlock a locked wallet', () => {
    const lockedWallet = Wallet.fromAddress(wallet.address);
    const unlockedWallet = lockedWallet.unlock(wallet.privateKey);
    expect(unlockedWallet.address).toEqual(lockedWallet.address);
    expect(unlockedWallet.privateKey).toEqual(wallet.privateKey);
  });

  it('Create from privateKey', () => {
    const unlockedWallet = Wallet.fromPrivateKey(wallet.privateKey);
    expect(unlockedWallet.address).toEqual(wallet.address);
    expect(unlockedWallet.privateKey).toEqual(wallet.privateKey);
  });

  it('Should encrypt and decrypt JSON wallet just fine', () => {
    wallet = WalletUnlocked.generate();
    const password = 'password';
    const jsonWallet = wallet.encrypt(password);

    const decryptedWallet = Wallet.fromEncryptedJson(jsonWallet, password);

    expect(decryptedWallet.address).toEqual(wallet.address);
    expect(decryptedWallet.privateKey).toEqual(wallet.privateKey);
    expect(decryptedWallet.address.toB256()).toEqual(wallet.address.toB256());
  });

  it('Should fail to decrypt JSON wallet for a given wrong password', async () => {
    wallet = WalletUnlocked.generate();
    const password = 'password';
    const jsonWallet = wallet.encrypt(password);

    const { error, result } = await safeExec(() =>
      Wallet.fromEncryptedJson(jsonWallet, 'wrong-password')
    );

    expect(result).toBeUndefined();
    expect(error?.message).toBe('Error decrypting wallet: invalid password');
  });

  it('Provide a custom provider on a public wallet to the contract instance', async () => {
    const externalWallet = await generateTestWallet(new Provider(FUEL_NETWORK_URL), [
      {
        amount: bn(1_000_000_000),
        assetId: NativeAssetId,
      },
    ]);
    const externalWalletReceiver = await generateTestWallet(new Provider(FUEL_NETWORK_URL));

    // Create a custom provider to emulate a external signer
    // like Wallet Extension or a Hardware wallet
    let signedTransaction;
    class ProviderCustom extends Provider {
      async sendTransaction(
        transactionRequestLike: TransactionRequestLike
      ): Promise<TransactionResponse> {
        const transactionRequest = transactionRequestify(transactionRequestLike);
        // Simulate a external request of signature
        signedTransaction = await externalWallet.signTransaction(transactionRequest);
        transactionRequest.updateWitnessByOwner(externalWallet.address, signedTransaction);
        return super.sendTransaction(transactionRequestLike);
      }
    }

    // Set custom provider to contract instance
    const customProvider = new ProviderCustom(FUEL_NETWORK_URL);
    const lockedWallet = Wallet.fromAddress(externalWallet.address, customProvider);

    const response = await lockedWallet.transfer(
      externalWalletReceiver.address,
      bn(1_000_000),
      NativeAssetId
    );
    await response.wait();

    const balance = await externalWalletReceiver.getBalance(NativeAssetId);
    expect(balance.eq(1_000_000)).toBeTruthy();
  });

  describe('Wallet.connect', () => {
    const providerUrl1 = 'http://localhost:4001/graphql';
    const providerUrl2 = 'http://localhost:4002/graphql';
    const walletUnlocked = Wallet.generate({
      provider: providerUrl1,
    });
    const provider = walletUnlocked.provider;

    it('Wallet provider should be assigned on creation', () => {
      expect(walletUnlocked.provider.url).toBe(providerUrl1);
    });
    it('connect to providerUrl should assign url without change instance of the provider', () => {
      walletUnlocked.connect(providerUrl2);
      expect(walletUnlocked.provider).toBe(provider);
      expect(walletUnlocked.provider.url).toBe(providerUrl2);
    });
    it('connect to provider instance should replace the current provider istance', () => {
      walletUnlocked.connect(new Provider(providerUrl1));
      expect(walletUnlocked.provider).not.toBe(provider);
    });
  });
});
