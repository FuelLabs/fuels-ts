import type { BytesLike } from '@ethersproject/bytes';
import { hashMessage, hashTransaction } from '@fuel-ts/hasher';
import { Provider } from '@fuel-ts/providers';
import type { TransactionRequest, TransactionResponse } from '@fuel-ts/providers';
import Signer from '@fuel-ts/signer';
import cloneDeep from 'lodash.clonedeep';

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
   * @param transactionRequest - TransactionRequest
   * @returns string - Signature a ECDSA 64 bytes
   */
  signTransaction(transactionRequest: TransactionRequest): string {
    const hashedTransaction = hashTransaction(transactionRequest);
    const signature = this.signer().sign(hashedTransaction);

    return signature;
  }

  populateTransactionWitnessesSignature(transactionRequest: TransactionRequest) {
    const signedTransaction = this.signTransaction(transactionRequest);
    const transactionRequestClone = cloneDeep(transactionRequest);

    // Add signature only if transaction didn't has witnesses field already set
    // this enables sdk user to send mult-signed transaction
    if (!transactionRequest.witnesses?.length) {
      transactionRequestClone.witnesses = [signedTransaction];
    } else if (!transactionRequestClone.witnesses?.includes(signedTransaction)) {
      // Append signature if the transaction do not have the
      // current witnesses signature
      transactionRequestClone.witnesses?.push(signedTransaction);
    }

    return transactionRequestClone;
  }

  /**
   * Populates witnesses signature and send it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequest - TransactionRequest
   * @returns TransactionResponse
   */
  async sendTransaction(transactionRequest: TransactionRequest): Promise<TransactionResponse> {
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
