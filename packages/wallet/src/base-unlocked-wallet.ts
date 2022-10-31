import type { BytesLike } from '@ethersproject/bytes';
import { hashMessage, hashTransaction } from '@fuel-ts/hasher';
import type {
  TransactionResponse,
  TransactionRequestLike,
  CallResult,
  Provider,
} from '@fuel-ts/providers';
import { transactionRequestify } from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';

import { BaseWalletLocked } from './base-locked-wallet';
import { FUEL_NETWORK_URL } from './constants';

/**
 * BaseWalletUnlocked
 */
export class BaseWalletUnlocked extends BaseWalletLocked {
  /* default HDWallet path */
  static defaultPath = "m/44'/1179993420'/0'/0/0";

  provider: Provider;

  signer: () => Signer;

  constructor(privateKey: BytesLike, provider: string | Provider = FUEL_NETWORK_URL) {
    const signer = new Signer(privateKey);
    super(signer.address, provider);
    this.signer = () => signer;
    this.provider = this.connect(provider);
  }

  get privateKey(): string {
    return this.signer().privateKey;
  }

  get publicKey(): string {
    return this.signer().publicKey;
  }

  /**
   * Sign message with wallet instance privateKey
   *
   * @param message - Message
   * @returns Promise<string> - Signature a ECDSA 64 bytes
   */
  async signMessage(message: string): Promise<string> {
    return this.signer().sign(hashMessage(message));
  }

  /**
   * Sign transaction with wallet instance privateKey
   *
   * @param transactionRequestLike - TransactionRequestLike
   * @returns string - Signature a ECDSA 64 bytes
   */
  async signTransaction(transactionRequestLike: TransactionRequestLike): Promise<string> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    const hashedTransaction = hashTransaction(transactionRequest);
    const signature = this.signer().sign(hashedTransaction);

    return signature;
  }

  async populateTransactionWitnessesSignature(transactionRequestLike: TransactionRequestLike) {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    const signedTransaction = await this.signTransaction(transactionRequest);

    transactionRequest.updateWitnessByOwner(this.address, signedTransaction);

    return transactionRequest;
  }

  /**
   * Populates witnesses signature and send it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequest - TransactionRequest
   * @returns TransactionResponse
   */
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);

    return this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(transactionRequest)
    );
  }

  /**
   * Populates witnesses signature and send a call it to the network using `provider.call`.
   *
   * @param transactionRequest - TransactionRequest
   * @returns CallResult
   */
  async simulateTransaction(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);

    return this.provider.call(
      await this.populateTransactionWitnessesSignature(transactionRequest),
      {
        utxoValidation: true,
      }
    );
  }
}
