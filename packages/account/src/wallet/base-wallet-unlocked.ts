import { hashMessage } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/utils';
import { hexlify } from '@fuel-ts/utils';

import { Account } from '../account';
import { transactionRequestify } from '../providers';
import type {
  TransactionRequestLike,
  CallResult,
  Provider,
  ProviderSendTxParams,
  EstimateTransactionParams,
  TransactionRequest,
  TransactionResponse,
} from '../providers';
import { Signer } from '../signer';

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
   * A function that returns the wallet's signer.
   */
  signer: () => Signer;

  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(privateKey: BytesLike, provider?: Provider) {
    const signer = new Signer(privateKey);
    super(signer.address, provider);
    this.signer = () => signer;
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
  override async signMessage(message: string): Promise<string> {
    const signedMessage = await this.signer().sign(hashMessage(message));
    return hexlify(signedMessage);
  }

  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  override async signTransaction(transactionRequestLike: TransactionRequestLike): Promise<string> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    const chainId = await this.provider.getChainId();
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
  async populateTransactionWitnessesSignature<T extends TransactionRequest>(
    transactionRequestLike: TransactionRequestLike
  ) {
    const transactionRequest = transactionRequestify(transactionRequestLike) as T;
    const signedTransaction = await this.signTransaction(transactionRequest);

    transactionRequest.updateWitnessByOwner(this.address, signedTransaction);

    return transactionRequest;
  }

  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @param estimateTxDependencies - Whether to estimate the transaction dependencies.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  override async sendTransaction(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = false }: ProviderSendTxParams = {}
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    if (estimateTxDependencies) {
      await this.provider.estimateTxDependencies(transactionRequest);
    }
    return this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(transactionRequest),
      { estimateTxDependencies: false }
    );
  }

  /**
   * Populates the witness signature for a transaction and sends a call to the network using `provider.dryRun`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  override async simulateTransaction(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = true }: EstimateTransactionParams = {}
  ): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    if (estimateTxDependencies) {
      await this.provider.estimateTxDependencies(transactionRequest);
    }
    return this.provider.dryRun(
      await this.populateTransactionWitnessesSignature(transactionRequest),
      {
        utxoValidation: true,
        estimateTxDependencies: false,
      }
    );
  }

  /**
   * Encrypts an unlocked wallet with a password.
   *
   * @param password - the password to encrypt the wallet with.
   * @returns - the encrypted wallet.
   */
  async encrypt(password: string): Promise<string> {
    return encryptKeystoreWallet(this.privateKey, this.address, password);
  }
}
