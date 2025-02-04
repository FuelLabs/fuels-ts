import { randomBytes } from '@fuel-ts/crypto';
import { hashMessage } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/utils';

import walletSpec from '../../test/fixtures/wallet-spec';
import { SCRIPT_TX_REQUEST, SIGNED_TX, PRIVATE_KEY } from '../../test/fixtures/wallet-unlocked';
import * as providersMod from '../providers';
import type { CallResult, TransactionResponse, TransactionRequestLike } from '../providers';
import { Signer } from '../signer';
import { setupTestProviderAndWallets } from '../test-utils';

import { BaseWalletUnlocked } from './base-wallet-unlocked';
import * as keystoreWMod from './keystore-wallet';
import { Wallet } from './wallet';
import { WalletLocked, WalletUnlocked } from './wallets';

const { ScriptTransactionRequest } = providersMod;

/**
 * @group node
 */
describe('WalletUnlocked', () => {
  const expectedPrivateKey = '0x5f70feeff1f229e4a95e1056e8b4d80d0b24b565674860cc213bdb07127ce1b1';
  const expectedPublicKey =
    '0x2f34bc0df4db0ec391792cedb05768832b49b1aa3a2dd8c30054d1af00f67d00b74b7acbbf3087c8e0b1a4c343db50aa471d21f278ff5ce09f07795d541fb47e';
  const expectedAddress = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';
  const expectedMessage = 'my message';
  const expectedSignedMessage =
    '0x8eeb238db1adea4152644f1cd827b552dfa9ab3f4939718bb45ca476d167c6512a656f4d4c7356bfb9561b14448c230c6e7e4bd781df5ee9e5999faa6495163d';

  it('Instantiate a new wallet', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const wallet = new WalletUnlocked(expectedPrivateKey, provider);

    expect(wallet.publicKey).toEqual(expectedPublicKey);
    expect(wallet.address.toAddress()).toEqual(expectedAddress);
  });

  it('Sign a message using wallet instance', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const wallet = new WalletUnlocked(expectedPrivateKey, provider);
    const signedMessage = await wallet.signMessage(expectedMessage);
    const verifiedAddress = Signer.recoverAddress(hashMessage(expectedMessage), signedMessage);

    expect(verifiedAddress).toEqual(wallet.address);
    expect(signedMessage).toEqual(expectedSignedMessage);
  });

  it('Sign a transaction using wallet instance', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    const signedTransaction = await wallet.signTransaction(SCRIPT_TX_REQUEST);
    const chainId = await wallet.provider.getChainId();
    const verifiedAddress = Signer.recoverAddress(
      SCRIPT_TX_REQUEST.getTransactionId(chainId),
      signedTransaction
    );

    expect(signedTransaction).toEqual(SIGNED_TX);
    expect(verifiedAddress).toEqual(wallet.address);
  });

  it('Populate transaction witnesses signature using wallet instance', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const wallet = new WalletUnlocked(PRIVATE_KEY, provider);
    const signedTransaction = await wallet.signTransaction(SCRIPT_TX_REQUEST);
    const populatedTransaction =
      await wallet.populateTransactionWitnessesSignature(SCRIPT_TX_REQUEST);

    expect(populatedTransaction.witnesses?.[0]).toBe(signedTransaction);
  });

  it('Populate transaction multi-witnesses signature using wallet instance', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const wallet = new WalletUnlocked(PRIVATE_KEY, provider);
    const privateKey = randomBytes(32);
    const otherWallet = new WalletUnlocked(privateKey, provider);
    const signedTransaction = await wallet.signTransaction(SCRIPT_TX_REQUEST);
    const otherSignedTransaction = await otherWallet.signTransaction(SCRIPT_TX_REQUEST);
    const populatedTransaction = await wallet.populateTransactionWitnessesSignature({
      ...SCRIPT_TX_REQUEST,
      witnesses: [...SCRIPT_TX_REQUEST.witnesses, otherSignedTransaction],
    });

    expect(populatedTransaction.witnesses?.length).toBe(2);
    expect(populatedTransaction.witnesses).toContain(signedTransaction);
    expect(populatedTransaction.witnesses).toContain(otherSignedTransaction);
  });

  it('Check if send transaction adds signature using wallet instance', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const wallet = new WalletUnlocked(PRIVATE_KEY, provider);
    let signature: BytesLike | undefined;
    // Intercept Provider.sendTransaction to collect signature
    const spy = vi
      .spyOn(wallet.provider, 'sendTransaction')
      .mockImplementation(async (transaction: TransactionRequestLike) => {
        signature = transaction.witnesses?.[0];
        return Promise.resolve({} as TransactionResponse);
      });

    // Call send transaction should populate signature field
    await wallet.sendTransaction(SCRIPT_TX_REQUEST);

    // Provider sendTransaction should be called
    expect(spy).toBeCalled();
    // Signature should have a signature
    expect(signature?.length).toBe(130);
  });

  it('Generate a new random wallet', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const wallet = WalletUnlocked.generate({
      provider,
    });
    const message = 'test';
    const signedMessage = await wallet.signMessage(message);
    const hashedMessage = hashMessage(message);
    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.address).toEqual(recoveredAddress);
  });

  it('Generate a new random wallet with entropy', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const wallet = WalletUnlocked.generate({
      entropy: randomBytes(32),
      provider,
    });
    const message = 'test';
    const signedMessage = await wallet.signMessage(message);
    const hashedMessage = hashMessage(message);
    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.address).toEqual(recoveredAddress);
  });

  describe('WalletUnlocked.fromSeed', () => {
    it('Create wallet from seed', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const wallet = WalletUnlocked.fromSeed(walletSpec.seed, walletSpec.account_1.path, provider);

      expect(wallet.publicKey).toBe(walletSpec.account_1.publicKey);
      expect(wallet.provider.url).toBeDefined();
    });

    it('Create wallet from seed with default path', () => {
      const wallet = WalletUnlocked.fromSeed(walletSpec.seed);

      expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
    });

    it('Create wallet from seed with default path, without a provider', () => {
      const wallet = WalletUnlocked.fromSeed(walletSpec.seed);

      expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
      expect(() => wallet.provider).toThrowError('Provider not set');
    });
  });

  describe('WalletUnlocked.fromMnemonic', () => {
    it('Create wallet from mnemonic', () => {
      const wallet = WalletUnlocked.fromMnemonic(walletSpec.mnemonic, walletSpec.account_1.path);

      expect(wallet.publicKey).toBe(walletSpec.account_1.publicKey);
    });

    it('Create wallet from mnemonic with default path', () => {
      const wallet = WalletUnlocked.fromMnemonic(walletSpec.mnemonic);

      expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
    });

    it('Create wallet from mnemonic with default path, without a provider', () => {
      const wallet = WalletUnlocked.fromMnemonic(walletSpec.mnemonic);

      expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
      expect(() => wallet.provider).toThrowError('Provider not set');
    });
  });

  describe('WalletUnlocked.extendedKey', () => {
    it('Create wallet from extendedKey', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const wallet = WalletUnlocked.fromExtendedKey(walletSpec.account_0.xprv, provider);

      expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
      expect(wallet.provider.url).toBeDefined();
    });

    it('Create wallet from extendedKey, without provider', () => {
      const wallet = WalletUnlocked.fromExtendedKey(walletSpec.account_0.xprv);

      expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
      expect(() => wallet.provider).toThrowError('Provider not set');
    });
  });

  it('Create wallet and lock it', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [wallet],
    } = launched;

    expect(wallet.privateKey).toBeTruthy();
    const lockedWallet = wallet.lock();
    expect(lockedWallet instanceof WalletLocked).toBeTruthy();
  });

  it('simulates a transaction', async () => {
    const transactionRequestLike: TransactionRequestLike = {
      type: providersMod.TransactionType.Script,
    };
    const transactionReq = new ScriptTransactionRequest();
    const callResult = 'callResult' as unknown as CallResult;

    const transactionRequestify = vi
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionReq);

    const estimateTxDependencies = vi
      .spyOn(providersMod.Provider.prototype, 'estimateTxDependencies')
      .mockImplementation(() =>
        Promise.resolve({ receipts: [], missingContractIds: [], outputVariables: 0 })
      );

    const call = vi
      .spyOn(providersMod.Provider.prototype, 'dryRun')
      .mockImplementation(() => Promise.resolve(callResult));

    const populateTransactionWitnessesSignatureSpy = vi
      .spyOn(BaseWalletUnlocked.prototype, 'populateTransactionWitnessesSignature')
      .mockImplementationOnce(() => Promise.resolve(transactionReq));

    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [wallet],
    } = launched;

    const result = await wallet.simulateTransaction(transactionRequestLike);

    expect(result).toEqual(callResult);

    expect(transactionRequestify.mock.calls.length).toBe(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequestLike);

    expect(estimateTxDependencies.mock.calls.length).toBe(1);
    expect(estimateTxDependencies.mock.calls[0][0]).toEqual(transactionReq);

    expect(populateTransactionWitnessesSignatureSpy.mock.calls.length).toBe(1);
    expect(populateTransactionWitnessesSignatureSpy.mock.calls[0][0]).toEqual(transactionReq);

    expect(call.mock.calls.length).toBe(1);
  });

  it('encrypts wallet to keystore', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [wallet],
    } = launched;

    const password = 'password';

    const encryptKeystoreWalletSpy = vi.spyOn(keystoreWMod, 'encryptKeystoreWallet');

    const keystore = wallet.encrypt(password);

    expect(encryptKeystoreWalletSpy).toBeCalledTimes(1);
    expect(encryptKeystoreWalletSpy).toHaveBeenCalledWith(
      wallet.privateKey,
      wallet.address,
      password
    );

    expect(keystore).toBeTruthy();
  });
});
