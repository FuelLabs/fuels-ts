import { safeExec } from '@fuel-ts/errors/test-utils';

import { Provider } from '../providers';
import { setupTestProviderAndWallets } from '../test-utils';

import { Wallet } from './wallet';
import { WalletLocked, WalletUnlocked } from './wallets';

/**
 * @group node
 */
describe('Wallet', () => {
  describe('WalletLocked.constructor', () => {
    it('should instatiate from a constructor', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const lockedWallet = new WalletLocked(wallet.address, provider);

      expect(lockedWallet.address).toEqual(wallet.address);
    });

    it('should instatiate from a constructor, without a provider', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        wallets: [wallet],
      } = launched;

      const lockedWallet = new WalletLocked(wallet.address);

      expect(lockedWallet.address).toStrictEqual(wallet.address);
      expect(lockedWallet).toBeInstanceOf(WalletLocked);
    });
  });

  describe('WalletLocked.fromAddress', () => {
    it('should instantiate from an address', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const lockedWallet = Wallet.fromAddress(wallet.address, provider);

      expect(lockedWallet.address).toStrictEqual(wallet.address);
      expect(lockedWallet).toBeInstanceOf(WalletLocked);
    });

    it('should instantiate from an address, without a provider', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        wallets: [wallet],
      } = launched;

      const lockedWallet = Wallet.fromAddress(wallet.address);

      expect(lockedWallet.address).toStrictEqual(wallet.address);
      expect(lockedWallet).toBeInstanceOf(WalletLocked);
    });
  });

  describe('WalletLocked.unlock', () => {
    it('should be able to unlock a locked wallet', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const lockedWallet = Wallet.fromAddress(wallet.address, provider);
      expect(lockedWallet).toBeInstanceOf(WalletLocked);

      const unlockedWallet = lockedWallet.unlock(wallet.privateKey);

      expect(unlockedWallet).toBeInstanceOf(WalletUnlocked);
      expect(unlockedWallet.address).toStrictEqual(lockedWallet.address);
      expect(unlockedWallet.privateKey).toEqual(wallet.privateKey);
    });
  });

  describe('WalletUnlocked.constructor', () => {
    it('Should instantiate from a constructor', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const unlockedWallet = new WalletUnlocked(wallet.privateKey, provider);

      expect(unlockedWallet.address).toStrictEqual(wallet.address);
    });

    it('should instantiate from a constructor, without a provider', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        wallets: [wallet],
      } = launched;

      const unlockedWallet = new WalletUnlocked(wallet.privateKey);

      expect(unlockedWallet.address).toStrictEqual(wallet.address);
      expect(unlockedWallet.privateKey).toEqual(wallet.privateKey);
      expect(() => unlockedWallet.provider).toThrowError('Provider not set');
      expect(unlockedWallet).toBeInstanceOf(WalletUnlocked);
    });
  });

  /**
   * @see {@link WalletUnlocked.fromPrivateKey}
   */
  describe('WalletUnlocked.fromPrivateKey', () => {
    it('Should instantiate fromPrivateKey', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const unlockedWallet = Wallet.fromPrivateKey(wallet.privateKey, provider);

      expect(unlockedWallet.address).toStrictEqual(wallet.address);
      expect(unlockedWallet.privateKey).toEqual(wallet.privateKey);
    });

    it('Should instantiate fromPrivateKey, without a provider', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        wallets: [wallet],
      } = launched;

      const unlockedWallet = Wallet.fromPrivateKey(wallet.privateKey);

      expect(unlockedWallet.address).toStrictEqual(wallet.address);
      expect(unlockedWallet.privateKey).toEqual(wallet.privateKey);
      expect(() => unlockedWallet.provider).toThrowError('Provider not set');
    });
  });

  /**
   * @see {@link WalletUnlocked.generate}
   */
  describe('WalletUnlocked.generate', () => {
    it('Should instantiate from generate', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const unlockedWallet = WalletUnlocked.generate({ provider });

      expect(unlockedWallet.address).toBeDefined();
      expect(unlockedWallet.privateKey).toBeDefined();
    });

    it('Should instantiate from generate, without a provider', () => {
      const unlockedWallet = WalletUnlocked.generate();

      expect(unlockedWallet.address).toBeDefined();
      expect(unlockedWallet.privateKey).toBeDefined();
      expect(() => unlockedWallet.provider).toThrowError('Provider not set');
    });
  });

  /**
   * @see {@link WalletUnlocked.fromEncryptedJson}
   */
  describe('WalletUnlocked.fromEncryptedJson', () => {
    it('should encrypt and decrypt a JSON wallet', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const password = 'password';
      const jsonWallet = await wallet.encrypt(password);

      const decryptedWallet = await Wallet.fromEncryptedJson(jsonWallet, password, provider);

      expect(decryptedWallet.address).toStrictEqual(wallet.address);
      expect(decryptedWallet.privateKey).toEqual(wallet.privateKey);
      expect(decryptedWallet.address.toB256()).toEqual(wallet.address.toB256());
    });

    it('should encrypt and decrypt a JSON wallet, without a provider', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        wallets: [wallet],
      } = launched;

      const password = 'password';
      const jsonWallet = await wallet.encrypt(password);

      const decryptedWallet = await Wallet.fromEncryptedJson(jsonWallet, password);

      expect(decryptedWallet.address).toStrictEqual(wallet.address);
      expect(decryptedWallet.privateKey).toEqual(wallet.privateKey);
      expect(() => decryptedWallet.provider).toThrowError('Provider not set');
    });

    it('Should fail to decrypt JSON wallet for a given wrong password', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;
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
  });

  describe('Wallet.connect', () => {
    it('Wallet provider should be assigned on creation', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const myWallet = Wallet.generate({ provider });

      expect(myWallet.provider).toBe(provider);
    });

    it('connect should assign a new instance of the provider', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const newProviderInstance = new Provider(provider.url);

      wallet.connect(newProviderInstance);

      expect(wallet.provider).toBe(newProviderInstance);
    });
  });
});
