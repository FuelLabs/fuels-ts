import { randomBytes } from '@fuel-ts/crypto';
import { hashMessage } from '@fuel-ts/hasher';
import type { CallResult, TransactionResponse, TransactionRequestLike } from '@fuel-ts/providers';
import { Provider } from '@fuel-ts/providers';
import * as providersMod from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';
import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';
import type { BytesLike } from 'ethers';

import { SCRIPT_TX_REQUEST, SIGNED_TX, PRIVATE_KEY } from '../test/fixtures/wallet-unlocked';

import { BaseWalletUnlocked } from './base-unlocked-wallet';
import { FUEL_NETWORK_URL } from './configs';
import * as keystoreWMod from './keystore-wallet';
import walletSpec from './wallet-spec';
import { WalletLocked, WalletUnlocked } from './wallets';

jest.mock('@fuel-ts/providers', () => ({
  __esModule: true,
  ...jest.requireActual('@fuel-ts/providers'),
}));

const { ScriptTransactionRequest } = providersMod;

describe('WalletUnlocked', () => {
  it('Instantiate a new wallet', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = new WalletUnlocked(signMessageTest.privateKey, provider);

    expect(wallet.publicKey).toEqual(signMessageTest.publicKey);
    expect(wallet.address.toAddress()).toEqual(signMessageTest.address);
  });

  it('Sign a message using wallet instance', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = new WalletUnlocked(signMessageTest.privateKey, provider);
    const signedMessage = await wallet.signMessage(signMessageTest.message);
    const verifiedAddress = Signer.recoverAddress(
      hashMessage(signMessageTest.message),
      signedMessage
    );

    expect(verifiedAddress).toEqual(wallet.address);
    expect(signedMessage).toEqual(signMessageTest.signedMessage);
  });

  it('Sign a transaction using wallet instance', async () => {
    // #region wallet-transaction-signing
    // #context import { WalletUnlocked, hashMessage, Signer} from 'fuels';
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = new WalletUnlocked(PRIVATE_KEY, provider);
    const signedTransaction = await wallet.signTransaction(SCRIPT_TX_REQUEST);
    const chainId = wallet.provider.getChain().consensusParameters.chainId.toNumber();
    const verifiedAddress = Signer.recoverAddress(
      SCRIPT_TX_REQUEST.getTransactionId(chainId),
      signedTransaction
    );

    expect(signedTransaction).toEqual(SIGNED_TX);
    expect(verifiedAddress).toEqual(wallet.address);
    // #endregion wallet-transaction-signing
  });

  it('Populate transaction witnesses signature using wallet instance', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = new WalletUnlocked(PRIVATE_KEY, provider);
    const signedTransaction = await wallet.signTransaction(SCRIPT_TX_REQUEST);
    const populatedTransaction =
      await wallet.populateTransactionWitnessesSignature(SCRIPT_TX_REQUEST);

    expect(populatedTransaction.witnesses?.[0]).toBe(signedTransaction);
  });

  it('Populate transaction multi-witnesses signature using wallet instance', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
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
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = new WalletUnlocked(PRIVATE_KEY, provider);
    let signature: BytesLike | undefined;
    // Intercept Provider.sendTransaction to collect signature
    const spy = jest
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
    const provider = await Provider.create(FUEL_NETWORK_URL);
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
    const provider = await Provider.create(FUEL_NETWORK_URL);
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

  it('Create wallet from seed', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = WalletUnlocked.fromSeed(walletSpec.seed, provider, walletSpec.account_1.path);

    expect(wallet.publicKey).toBe(walletSpec.account_1.publicKey);
    expect(wallet.provider.url).toBe(walletSpec.providerUrl);
  });

  it('Create wallet from mnemonic', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = WalletUnlocked.fromMnemonic(
      walletSpec.mnemonic,
      provider,
      walletSpec.account_1.path,
      undefined
    );

    expect(wallet.publicKey).toBe(walletSpec.account_1.publicKey);
    expect(wallet.provider.url).toBe(walletSpec.providerUrl);
  });

  it('Create wallet from mnemonic with default path', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = WalletUnlocked.fromMnemonic(walletSpec.mnemonic, provider);

    expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
  });

  it('Create wallet from extendedKey', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = WalletUnlocked.fromExtendedKey(walletSpec.account_0.xprv, provider);

    expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
    expect(wallet.provider.url).toBe(walletSpec.providerUrl);
  });

  it('Create wallet from seed with default path', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = WalletUnlocked.fromSeed(walletSpec.seed, provider);

    expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
    expect(wallet.provider.url).toBe(walletSpec.providerUrl);
  });

  it('Create wallet and lock it', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = WalletUnlocked.generate({
      provider,
    });
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

    const transactionRequestify = jest
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionReq);

    const estimateTxDependencies = jest
      .spyOn(providersMod.Provider.prototype, 'estimateTxDependencies')
      .mockImplementation(() => Promise.resolve());

    const call = jest
      .spyOn(providersMod.Provider.prototype, 'call')
      .mockImplementation(() => Promise.resolve(callResult));

    const populateTransactionWitnessesSignatureSpy = jest
      .spyOn(BaseWalletUnlocked.prototype, 'populateTransactionWitnessesSignature')
      .mockImplementationOnce(() => Promise.resolve(transactionReq));

    const provider = await Provider.create(FUEL_NETWORK_URL);

    const wallet = WalletUnlocked.generate({
      provider,
    });

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
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = WalletUnlocked.generate({
      provider,
    });
    const password = 'password';

    const encryptKeystoreWalletSpy = jest.spyOn(keystoreWMod, 'encryptKeystoreWallet');

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
