import type { BytesLike } from '@ethersproject/bytes';
import { hashMessage, hashTransaction } from '@fuel-ts/hasher';
import { HDWallet } from '@fuel-ts/hdwallet';
import { Mnemonic } from '@fuel-ts/mnemonic';
import { transactionRequestify } from '@fuel-ts/providers';
import type {
  TransactionResponse,
  TransactionRequestLike,
  CallResult,
  Provider,
} from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';

import type { GenerateOptions } from './types/GenerateOptions';
import WalletPublic from './wallet-public';

// TODO: import using .env file
const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/graphql';

export default class Wallet extends WalletPublic {
  /* default HDWallet path */
  static defaultPath = "m/44'/1179993420'/0'/0/0";

  provider: Provider;

  readonly signer: () => Signer;

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

  /**
   * Create wallet from a seed
   */
  static fromSeed(seed: string, path?: string): Wallet {
    const hdWallet = HDWallet.fromSeed(seed);
    const childWallet = hdWallet.derivePath(path || Wallet.defaultPath);

    return new Wallet(<string>childWallet.privateKey);
  }

  /**
   * Create wallet from mnemonic phrase
   */
  static fromMnemonic(mnemonic: string, path?: string, passphrase?: BytesLike): Wallet {
    const seed = Mnemonic.mnemonicToSeed(mnemonic, passphrase);
    const hdWallet = HDWallet.fromSeed(seed);
    const childWallet = hdWallet.derivePath(path || Wallet.defaultPath);

    return new Wallet(<string>childWallet.privateKey);
  }

  /**
   * Create wallet from extended key
   */
  static fromExtendedKey(extendedKey: string): Wallet {
    const hdWallet = HDWallet.fromExtendedKey(extendedKey);

    return new Wallet(<string>hdWallet.privateKey);
  }
}
