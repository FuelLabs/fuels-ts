import { BaseAssetId } from '@fuel-ts/address/configs';
import { safeExec } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';
import type { TransactionRequestLike, TransactionResponse } from '@fuel-ts/providers';
import { transactionRequestify, Provider } from '@fuel-ts/providers';

import { FUEL_NETWORK_URL } from './configs';
import { generateTestWallet } from './test-utils/generateTestWallet';
import { Wallet } from './wallet';
import { WalletUnlocked } from './wallets';

describe('Wallet', () => {
  let wallet: WalletUnlocked;
  let provider: Provider;

  beforeAll(async () => {
    provider = await Provider.connect(FUEL_NETWORK_URL);
    wallet = Wallet.generate({
      provider,
    });
  });

  it('Instantiate a new wallet', () => {
    const lockedWallet = Wallet.fromAddress(wallet.address, provider);
    expect(lockedWallet.address).toEqual(wallet.address);
  });

  it('Create a locked wallet', () => {
    const lockedWallet = Wallet.fromAddress(wallet.address, provider);
    expect(lockedWallet.address).toEqual(wallet.address);
  });

  it('Unlock a locked wallet', () => {
    const lockedWallet = Wallet.fromAddress(wallet.address, provider);
    const unlockedWallet = lockedWallet.unlock(wallet.privateKey);
    expect(unlockedWallet.address).toEqual(lockedWallet.address);
    expect(unlockedWallet.privateKey).toEqual(wallet.privateKey);
  });

  it('Create from privateKey', () => {
    const unlockedWallet = Wallet.fromPrivateKey(wallet.privateKey, provider);
    expect(unlockedWallet.address).toStrictEqual(wallet.address);
    expect(unlockedWallet.privateKey).toEqual(wallet.privateKey);
  });

  it('encrypts and decrypts a JSON wallet', async () => {
    wallet = WalletUnlocked.generate({
      provider,
    });
    const password = 'password';
    const jsonWallet = await wallet.encrypt(password);

    const decryptedWallet = await Wallet.fromEncryptedJson(jsonWallet, password, provider);

    expect(decryptedWallet.address).toStrictEqual(wallet.address);
    expect(decryptedWallet.privateKey).toEqual(wallet.privateKey);
    expect(decryptedWallet.address.toB256()).toEqual(wallet.address.toB256());
  });

  it('Should fail to decrypt JSON wallet for a given wrong password', async () => {
    wallet = WalletUnlocked.generate({
      provider,
    });
    const password = 'password';
    const jsonWallet = await wallet.encrypt(password);

    const { error, result } = await safeExec(() =>
      Wallet.fromEncryptedJson(jsonWallet, 'wrong-password', provider)
    );

    expect(result).toBeUndefined();
    expect(error?.message).toBe(
      'Failed to decrypt the keystore wallet, the provided password is incorrect.'
    );
  });

  it('Provide a custom provider on a public wallet to the contract instance', async () => {
    const externalWallet = await generateTestWallet(provider, [
      {
        amount: bn(1_000_000_000),
        assetId: BaseAssetId,
      },
    ]);
    const externalWalletReceiver = await generateTestWallet(provider);

    // Create a custom provider to emulate a external signer
    // like Wallet Extension or a Hardware wallet
    let signedTransaction;
    class ProviderCustom extends Provider {
      static async connect(url: string) {
        const chainInfo = await ProviderCustom.getChainInfoWithoutInstance(url);
        const newProvider = new ProviderCustom(url, chainInfo, {});
        return newProvider;
      }

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
    const customProvider = await ProviderCustom.connect(FUEL_NETWORK_URL);
    const lockedWallet = Wallet.fromAddress(externalWallet.address, customProvider);

    const response = await lockedWallet.transfer(
      externalWalletReceiver.address,
      bn(1_000_000),
      BaseAssetId
    );
    await response.wait();

    const balance = await externalWalletReceiver.getBalance(BaseAssetId);
    expect(balance.eq(1_000_000)).toBeTruthy();
  });

  /*
   * We are skipping these tests because we only have one valid provider URL to work with.
   * The testnet URLs won't work because they run a different client version.
   * TODO: figure out a way to still test Wallet.connect and other methods that cover provider URL switching
   */
  describe.skip('Wallet.connect', () => {
    const providerUrl1 = 'http://localhost:4001/graphql';
    const providerUrl2 = 'http://localhost:4002/graphql';
    let walletUnlocked: WalletUnlocked;
    let walletProvider: Provider;

    beforeAll(async () => {
      const newProvider = await Provider.connect(providerUrl1);
      walletUnlocked = WalletUnlocked.generate({
        provider: newProvider,
      });
      walletProvider = walletUnlocked.provider;
    });

    it('Wallet provider should be assigned on creation', () => {
      expect(walletUnlocked.provider.url).toBe(providerUrl1);
    });
    it('connect to providerUrl should assign url without change instance of the provider', async () => {
      const newProvider = await Provider.connect(providerUrl2);
      walletUnlocked.connect(newProvider);
      expect(walletUnlocked.provider).toBe(walletProvider);
      expect(walletUnlocked.provider.url).toBe(providerUrl2);
    });
    it('connect to provider instance should replace the current provider istance', async () => {
      const newProvider = await Provider.connect(providerUrl1);
      walletUnlocked.connect(newProvider);
      expect(walletUnlocked.provider).not.toBe(walletProvider);
    });
  });
});
