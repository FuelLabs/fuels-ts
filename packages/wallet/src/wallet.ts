import type { BytesLike } from '@ethersproject/bytes';
import { hashMessage, hashTransaction } from '@fuel-ts/hasher';
import { Provider, transactionRequestify } from '@fuel-ts/providers';
import type { TransactionResponse, TransactionRequestLike } from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';

import type { GenerateOptions } from './types/GenerateOptions';

// TODO: import using .env file
const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/graphql';

export default class Wallet {
  readonly provider: Provider;

  readonly signer: () => Signer;

  constructor(privateKey: BytesLike, provider: string | Provider = FUEL_NETWORK_URL) {
    const signer = new Signer(privateKey);

    if (typeof provider === 'string') {
      this.provider = new Provider(provider);
    } else {
      this.provider = provider;
    }

    this.signer = () => signer;
  }

  get address(): string {
    return this.signer().address;
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
   * @returns string - Signature a ECDSA 64 bytes
   */
  signMessage(message: string): string {
    return this.signer().sign(hashMessage(message));
  }

  /**
   * Sign transaction with wallet instance privateKey
   *
   * @param transactionRequestLike - TransactionRequestLike
   * @returns string - Signature a ECDSA 64 bytes
   */
  signTransaction(transactionRequestLike: TransactionRequestLike): string {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    const hashedTransaction = hashTransaction(transactionRequest);
    const signature = this.signer().sign(hashedTransaction);

    return signature;
  }

  populateTransactionWitnessesSignature(transactionRequestLike: TransactionRequestLike) {
    const transactionRequest = transactionRequestify(transactionRequestLike);

    const witnessIndex = transactionRequest.getCoinInputWitnessIndexByOwner(this.address);
    if (typeof witnessIndex === 'number') {
      const signedTransaction = this.signTransaction(transactionRequest);
      transactionRequest.updateWitness(witnessIndex, signedTransaction);
    }

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
      this.populateTransactionWitnessesSignature(transactionRequest)
    );
  }

  /**
   * Generate a new Wallet with a random keyPair
   *
   * @param options - GenerateOptions
   * @returns wallet - Wallet instance
   */
  static generate(generateOptions?: GenerateOptions) {
    const privateKey = Signer.generatePrivateKey(generateOptions?.entropy);
    return new Wallet(privateKey, generateOptions?.provider);
  }
}
