import type { BytesLike } from '@ethersproject/bytes';
import type { InputValue } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { hashMessage, hashTransaction } from '@fuel-ts/hasher';
import { HDWallet } from '@fuel-ts/hdwallet';
import type { AbstractAddress, AbstractPredicate } from '@fuel-ts/interfaces';
import { AbstractWallet } from '@fuel-ts/interfaces';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { Mnemonic } from '@fuel-ts/mnemonic';
import { ScriptTransactionRequest, transactionRequestify, Provider } from '@fuel-ts/providers';
import type {
  TransactionRequest,
  TransactionResponse,
  Coin,
  TransactionRequestLike,
  CoinQuantityLike,
  CoinQuantity,
  CallResult,
  BuildPredicateOptions,
  TransactionResult,
} from '@fuel-ts/providers';
import type { Message } from '@fuel-ts/providers/src/message';
import { Signer } from '@fuel-ts/signer';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions';

import type { GenerateOptions } from './types/GenerateOptions';

// TODO: import using .env file
const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/graphql';

export default class Wallet extends AbstractWallet {
  /* default HDWallet path */
  static defaultPath = "m/44'/1179993420'/0'/0/0";

  provider: Provider;

  readonly signer: () => Signer;

  constructor(privateKey: BytesLike, provider: string | Provider = FUEL_NETWORK_URL) {
    super();
    const signer = new Signer(privateKey);

    this.signer = () => signer;
    this.provider = this.connect(provider);
  }

  get address(): AbstractAddress {
    return this.signer().address;
  }

  get privateKey(): string {
    return this.signer().privateKey;
  }

  get publicKey(): string {
    return this.signer().publicKey;
  }

  /**
   * Change provider connection
   */
  connect(provider: string | Provider) {
    if (!provider) {
      throw new Error('Provider is required');
    } else if (typeof provider === 'string') {
      this.provider = new Provider(provider);
    } else {
      this.provider = provider;
    }
    return this.provider;
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
   * Returns coins satisfying the spend query.
   */
  async getCoinsToSpend(
    quantities: CoinQuantityLike[],
    /** Maximum number of coins to return */
    maxInputs?: number,
    /** IDs of coins to exclude */
    excludedIds?: BytesLike[]
  ): Promise<Coin[]> {
    return this.provider.getCoinsToSpend(this.address, quantities, maxInputs, excludedIds);
  }

  /**
   * Gets coins owned by the wallet address.
   */
  async getCoins(): Promise<Coin[]> {
    const coins = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageCoins = await this.provider.getCoins(this.address, undefined, {
        first: pageSize,
        after: cursor,
      });

      coins.push(...pageCoins);

      const hasNextPage = pageCoins.length >= pageSize;
      if (!hasNextPage) {
        break;
      }

      // TODO: implement pagination
      throw new Error(`Wallets with more than ${pageSize} coins are not yet supported`);
    }

    return coins;
  }

  /**
   * Gets messages owned by the wallet address.
   */
  async getMessages(): Promise<Message[]> {
    const messages = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageMessages = await this.provider.getMessages(this.address, {
        first: pageSize,
        after: cursor,
      });

      messages.push(...pageMessages);

      const hasNextPage = pageMessages.length >= pageSize;
      if (!hasNextPage) {
        break;
      }

      // TODO: implement pagination
      throw new Error(`Wallets with more than ${pageSize} messages are not yet supported`);
    }

    return messages;
  }

  /**
   * Gets balance for the given asset.
   */
  async getBalance(assetId: BytesLike = NativeAssetId): Promise<BN> {
    const amount = await this.provider.getBalance(this.address, assetId);
    return amount;
  }

  /**
   * Gets balances.
   */
  async getBalances(): Promise<CoinQuantity[]> {
    const balances = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageBalances = await this.provider.getBalances(this.address, {
        first: pageSize,
        after: cursor,
      });

      balances.push(...pageBalances);

      const hasNextPage = pageBalances.length >= pageSize;
      if (!hasNextPage) {
        break;
      }

      // TODO: implement pagination
      throw new Error(`Wallets with more than ${pageSize} balances are not yet supported`);
    }

    return balances;
  }

  /**
   * Adds coins to the transaction enough to fund it.
   */
  async fund<T extends TransactionRequest>(request: T): Promise<void> {
    const fee = request.calculateFee();
    const coins = await this.getCoinsToSpend([fee]);

    request.addCoins(coins);
  }

  /**
   * Returns coins satisfying the spend query.
   */
  async transfer(
    /** Address of the destination */
    destination: AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = NativeAssetId,
    /** Tx Params */
    txParams: Pick<TransactionRequestLike, 'gasLimit' | 'gasPrice' | 'maturity'> = {}
  ): Promise<TransactionResponse> {
    const params = { gasLimit: MAX_GAS_PER_TX, ...txParams };
    const request = new ScriptTransactionRequest(params);
    request.addCoinOutput(destination, amount, assetId);
    const coins = await this.getCoinsToSpend([[amount, assetId], request.calculateFee()]);
    request.addCoins(coins);

    return this.sendTransaction(request);
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
   * Populates witnesses signature and send a call it to the network using `provider.call`.
   *
   * @param transactionRequest - TransactionRequest
   * @returns CallResult
   */
  async simulateTransaction(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);

    return this.provider.call(this.populateTransactionWitnessesSignature(transactionRequest), {
      utxoValidation: true,
    });
  }

  async buildPredicateTransaction(
    predicateAddress: AbstractAddress,
    amountToPredicate: BigNumberish,
    assetId: BytesLike = NativeAssetId,
    predicateOptions?: BuildPredicateOptions
  ): Promise<ScriptTransactionRequest> {
    const options = {
      fundTransaction: true,
      ...predicateOptions,
    };
    const request = new ScriptTransactionRequest({
      gasLimit: MAX_GAS_PER_TX,
      ...options,
    });

    // output is locked behind predicate
    request.addCoinOutput(predicateAddress, amountToPredicate, assetId);

    const requiredCoinQuantities: CoinQuantityLike[] = [];
    if (options.fundTransaction) {
      requiredCoinQuantities.push(request.calculateFee());
    }

    if (requiredCoinQuantities.length) {
      const coins = await this.getCoinsToSpend(requiredCoinQuantities);
      request.addCoins(coins);
    }

    return request;
  }

  async submitPredicate(
    predicateAddress: AbstractAddress,
    amountToPredicate: BigNumberish,
    assetId: BytesLike = NativeAssetId,
    options?: BuildPredicateOptions
  ): Promise<TransactionResult<'success'>> {
    const request = await this.buildPredicateTransaction(
      predicateAddress,
      amountToPredicate,
      assetId,
      options
    );
    const response = await this.sendTransaction(request);
    return response.waitForResult();
  }

  async submitSpendPredicate(
    predicate: AbstractPredicate,
    amountToSpend: BigNumberish,
    predicateData?: InputValue[],
    assetId: BytesLike = NativeAssetId,
    options?: BuildPredicateOptions
  ): Promise<TransactionResult<'success'>> {
    return this.provider.submitSpendPredicate(
      predicate,
      amountToSpend,
      this.address,
      predicateData,
      assetId,
      options
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
