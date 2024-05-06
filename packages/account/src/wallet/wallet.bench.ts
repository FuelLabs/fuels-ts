import { bn } from '@fuel-ts/math';
// eslint-disable-next-line import/no-extraneous-dependencies
import { bench } from 'vitest';

import { FUEL_NETWORK_URL } from '../configs';
import type { TransactionRequestLike, TransactionResponse } from '../providers';
import { Provider, transactionRequestify } from '../providers';
import { generateTestWallet } from '../test-utils';

import { Wallet } from './wallet';
import { WalletLocked, WalletUnlocked } from './wallets';

const expectedPrivateKey = '0x5f70feeff1f229e4a95e1056e8b4d80d0b24b565674860cc213bdb07127ce1b1';
const expectedPublicKey =
  '0x2f34bc0df4db0ec391792cedb05768832b49b1aa3a2dd8c30054d1af00f67d00b74b7acbbf3087c8e0b1a4c343db50aa471d21f278ff5ce09f07795d541fb47e';
const expectedAddress = 'fuel1785jcs4epy625cmjuv9u269rymmwv6s6q2y9jhnw877nj2j08ehqce3rxf';
const expectedLockedAddress = 'fuel1tac0aml37g57f227zptw3dxcp59jfdt9vayxpnpp80dswynuuxcs8eme0m';

let provider: Provider;
let baseAssetId: string;

beforeAll(async () => {
  provider = await Provider.create(FUEL_NETWORK_URL);
  baseAssetId = provider.getBaseAssetId();
});

/**
 * @group node
 */
describe('Wallet Benchmarks', () => {
  bench('Instantiate a new Unlocked wallet', () => {
    const unlockedWallet = new WalletUnlocked(expectedPrivateKey, provider);

    expect(unlockedWallet.publicKey).toEqual(expectedPublicKey);
    expect(unlockedWallet.address.toAddress()).toEqual(expectedAddress);
  });

  bench('Instantiate from a constructor', () => {
    const lockedWallet = new WalletLocked(expectedPrivateKey, provider);

    expect(lockedWallet.address.toAddress()).toEqual(expectedLockedAddress);
  });

  bench('Instantiate from an address', () => {
    const lockedWallet = Wallet.fromAddress(expectedAddress, provider);

    expect(lockedWallet.address.toAddress()).toEqual(expectedAddress);
    expect(lockedWallet).toBeInstanceOf(WalletLocked);
  });

  bench(
    'Sending a transaction via a custom provider on a public wallet to the contract instance',
    async () => {
      const externalWallet = await generateTestWallet(provider, [
        {
          amount: bn(1_000_000_000),
          assetId: baseAssetId,
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
          transactionRequest.updateWitnessByOwner(
            externalWallet.address.toB256(),
            signedTransaction
          );
          return super.sendTransaction(transactionRequestLike);
        }
      }

      const customProvider = await ProviderCustom.connect(FUEL_NETWORK_URL);
      const lockedWallet = Wallet.fromAddress(externalWallet.address, customProvider);

      const response = await lockedWallet.transfer(
        externalWalletReceiver.address,
        bn(1_000_000),
        baseAssetId,
        { gasLimit: 10_000 }
      );
      await response.wait();

      const balance = await externalWalletReceiver.getBalance(baseAssetId);
      expect(balance.eq(1_000_000)).toBeTruthy();
    }
  );
});
