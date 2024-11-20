/* eslint-disable import/no-extraneous-dependencies */

import { DEVNET_NETWORK_URL } from '@internal/utils';
import { Provider, WalletLocked, WalletUnlocked, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
import { bench } from 'vitest';

import { isDevnet } from './config';

const expectedPrivateKey = '0x5f70feeff1f229e4a95e1056e8b4d80d0b24b565674860cc213bdb07127ce1b1';
const expectedPublicKey =
  '0x2f34bc0df4db0ec391792cedb05768832b49b1aa3a2dd8c30054d1af00f67d00b74b7acbbf3087c8e0b1a4c343db50aa471d21f278ff5ce09f07795d541fb47e';
const expectedAddress = 'fuel1785jcs4epy625cmjuv9u269rymmwv6s6q2y9jhnw877nj2j08ehqce3rxf';
const expectedLockedAddress = 'fuel1tac0aml37g57f227zptw3dxcp59jfdt9vayxpnpp80dswynuuxcs8eme0m';

/**
 * @group node
 * @group browser
 */
describe('Wallet Benchmarks', () => {
  let cleanup: () => void;
  let provider: Provider;

  const setupTestEnvironment = async () => {
    if (isDevnet) {
      provider = await Provider.create(DEVNET_NETWORK_URL);
    } else {
      const launched = await launchTestNode();
      cleanup = launched.cleanup;
      provider = launched.provider;
    }
  };

  beforeAll(setupTestEnvironment);

  afterAll(() => {
    if (!isDevnet && cleanup) {
      cleanup();
    }
  });

  bench('Instantiate a new Unlocked wallet', () => {
    const unlockedWallet = new WalletUnlocked(expectedPrivateKey, provider);
    expect(unlockedWallet.publicKey).toEqual(expectedPublicKey);
    expect(unlockedWallet.address.toAddress()).toEqual(expectedAddress);
  });

  bench('Instantiate a new Locked wallet from a constructor', () => {
    const lockedWallet = new WalletLocked(expectedPrivateKey, provider);
    expect(lockedWallet.address.toAddress()).toEqual(expectedLockedAddress);
  });

  bench('Instantiate from an address', () => {
    const lockedWallet = Wallet.fromAddress(expectedAddress, provider);
    expect(lockedWallet.address.toAddress()).toEqual(expectedAddress);
    expect(lockedWallet).toBeInstanceOf(WalletLocked);
  });
});
