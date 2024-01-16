import { hashMessage } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/interfaces';
import type {
  TransactionResponse,
  TransactionRequestLike,
  CallResult,
  Provider,
} from '@fuel-ts/providers';
import { transactionRequestify } from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';
import { hexlify } from '@fuel-ts/utils';

import { Account } from './account';
import { encryptKeystoreWallet } from './keystore-wallet';

/**
 * `BaseWalletUnlocked` provides the base functionalities for an unlocked wallet.
 */
export class BaseWalletUnlocked extends Account {
  /**
   * Default HDWallet path.
   */
  static defaultPath = "m/44'/1179993420'/0'/0/0";

  /**
   * The provider used to interact with the Fuel network.
   */
  provider: Provider;

  /**
   * A function that returns the wallet's signer.
   */
  signer: () => Signer;

  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance.
   */
  constructor(privateKey: BytesLike, provider: Provider) {
    const signer = new Signer(privateKey);
    super(signer.address, provider);
    this.signer = () => signer;
    this.provider = provider;
  }

  /**
   * Gets the private key of the wallet.
   *
   * @returns The private key of the wallet.
   */
  get privateKey(): string {
    return this.signer().privateKey;
  }

  /**
   * Gets the public key of the wallet.
   *
   * @returns
   */
  get publicKey(): string {
    return this.signer().publicKey;
  }

  /**
   * Signs a message with the wallet's private key.
   *
   * @param message - The message to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signMessage(message: string): Promise<string> {
    const signedMessage = await this.signer().sign(hashMessage(message));
    return hexlify(signedMessage);
  }

  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(transactionRequestLike: TransactionRequestLike): Promise<string> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    const chainId = this.provider.getChain().consensusParameters.chainId.toNumber();
    const hashedTransaction = transactionRequest.getTransactionId(chainId);
    const signature = await this.signer().sign(hashedTransaction);

    return hexlify(signature);
  }

  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(transactionRequestLike: TransactionRequestLike) {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    const signedTransaction = await this.signTransaction(transactionRequest);

    transactionRequest.updateWitnessByOwner(this.address, signedTransaction);

    return transactionRequest;
  }

  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    await this.provider.estimateTxDependencies(transactionRequest);
    return this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(transactionRequest),
      { estimateTxDependencies: false }
    );
  }

  /**
   * Populates the witness signature for a transaction and sends a call to the network using `provider.call`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  async simulateTransaction(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    await this.provider.estimateTxDependencies(transactionRequest);
    return this.provider.call(
      await this.populateTransactionWitnessesSignature(transactionRequest),
      {
        utxoValidation: true,
        estimateTxDependencies: false,
      }
    );
  }

  async encrypt(password: string): Promise<string> {
    return encryptKeystoreWallet(this.privateKey, this.address, password);
  }
}
