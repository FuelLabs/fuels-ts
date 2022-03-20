import type { BigNumberish } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { NativeAssetId } from '@fuel-ts/constants';
import { hashMessage, hashTransaction } from '@fuel-ts/hasher';
import { AbstractWallet } from '@fuel-ts/interfaces';
import { Provider, ScriptTransactionRequest, transactionRequestify } from '@fuel-ts/providers';
import type {
  TransactionRequest,
  TransactionResponse,
  Coin,
  TransactionRequestLike,
  CoinQuantityLike,
  CoinQuantity,
} from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';

import type { GenerateOptions } from './types/GenerateOptions';

// TODO: import using .env file
const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/graphql';

export default class Wallet extends AbstractWallet {
  readonly provider: Provider;

  readonly signer: () => Signer;

  constructor(privateKey: BytesLike, provider: string | Provider = FUEL_NETWORK_URL) {
    super();
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
   * Returns coins satisfying the spend query.
   */
  async getCoinsToSpend(quantities: CoinQuantityLike[]): Promise<Coin[]> {
    return this.provider.getCoinsToSpend(this.address, quantities);
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
   * Gets balances.
   */
  async getBalances(): Promise<CoinQuantity[]> {
    const coins = await this.getCoins();

    const balanceObj = coins.reduce<{ [assetId: string]: CoinQuantity }>(
      (acc, { assetId, amount }) => ({
        ...acc,
        [assetId]: { assetId, amount: amount.add(acc[assetId]?.amount ?? 0) },
      }),
      {}
    );

    const balances = Object.values(balanceObj).filter((balance) => balance.amount.gt(0));

    return balances;
  }

  /**
   * Adds coins to the transaction enough to fund it.
   */
  async fund<T extends TransactionRequest>(request: T): Promise<void> {
    const feeAmount = request.calculateFee();
    const coins = await this.getCoinsToSpend([[feeAmount, NativeAssetId]]);

    request.addCoins(coins);
  }

  /**
   * Returns coins satisfying the spend query.
   */
  async transfer(
    /** Address of the destination */
    destination: BytesLike,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = NativeAssetId
  ): Promise<TransactionResponse> {
    const coins = await this.getCoinsToSpend([{ assetId, amount }]);

    const request = new ScriptTransactionRequest({ gasLimit: 1000000 });
    request.addCoins(coins);
    request.addCoinOutput(destination, amount, assetId);
    await this.fund(request);

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
