import { BaseAssetId } from '@fuel-ts/address/configs';
import { safeExec } from '@fuel-ts/errors/test-utils';
import type { BN } from '@fuel-ts/math';
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
  let gasPrice: BN;
  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    wallet = Wallet.generate({
      provider,
    });
    gasPrice = provider.getGasConfig().minGasPrice;
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

    // Set custom provider to contract instance
    class ProviderCustom extends Provider {
      // eslint-disable-next-line @typescript-eslint/require-await
      static async connect(url: string) {
        const newProvider = new ProviderCustom(url, {});
        return newProvider;
      }

      async sendTransaction(
        transactionRequestLike: TransactionRequestLike
      ): Promise<TransactionResponse> {
        const transactionRequest = transactionRequestify(transactionRequestLike);
        // Simulate a external request of signature
        const signedTransaction = await externalWallet.signTransaction(transactionRequest);
        transactionRequest.updateWitnessByOwner(externalWallet.address, signedTransaction);
        return super.sendTransaction(transactionRequestLike);
      }
    }

    const customProvider = await ProviderCustom.connect(FUEL_NETWORK_URL);
    const lockedWallet = Wallet.fromAddress(externalWallet.address, customProvider);

    const response = await lockedWallet.transfer(
      externalWalletReceiver.address,
      bn(1_000_000),
      BaseAssetId,
      { gasPrice, gasLimit: 10_000 }
    );
    await response.wait();

    const balance = await externalWalletReceiver.getBalance(BaseAssetId);
    expect(balance.eq(1_000_000)).toBeTruthy();
  });

  describe('Wallet.connect', () => {
    let walletUnlocked: WalletUnlocked;
    let providerInstance: Provider;

    Provider.prototype.getContractBalance;

    beforeAll(async () => {
      providerInstance = await Provider.create(FUEL_NETWORK_URL);

      walletUnlocked = WalletUnlocked.generate({
        provider: providerInstance,
      });
    });

    it('Wallet provider should be assigned on creation', async () => {
      const newProviderInstance = await Provider.create(FUEL_NETWORK_URL);

      const myWallet = Wallet.generate({ provider: newProviderInstance });

      expect(myWallet.provider).toBe(newProviderInstance);
    });

    it('connect should assign a new instance of the provider', async () => {
      const newProviderInstance = await Provider.create(FUEL_NETWORK_URL);

      walletUnlocked.connect(newProviderInstance);

      expect(walletUnlocked.provider).toBe(newProviderInstance);
    });

    it('connect should replace the current provider instance', async () => {
      const currentInstance = walletUnlocked.provider;

      const newProviderInstance = await Provider.create(FUEL_NETWORK_URL);

      walletUnlocked.connect(newProviderInstance);

      expect(walletUnlocked.provider).toBe(newProviderInstance);
      expect(walletUnlocked.provider).not.toBe(currentInstance);
    });
  });
});
