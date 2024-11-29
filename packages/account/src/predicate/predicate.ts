import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify, hexlify } from '@fuel-ts/utils';

import type { FakeResources } from '../account';
import { Account } from '../account';
import {
  transactionRequestify,
  isRequestInputResource,
  isRequestInputResourceFromOwner,
  isRequestInputCoinOrMessage,
} from '../providers';
import type {
  CallResult,
  CoinQuantityLike,
  ExcludeResourcesOption,
  Provider,
  Resource,
  TransactionRequest,
  TransactionRequestLike,
  TransactionResponse,
} from '../providers';
import { deployScriptOrPredicate } from '../utils/deployScriptOrPredicate';

import { getPredicateRoot } from './utils';

export type PredicateParams<
  TData extends InputValue[] = InputValue[],
  TConfigurables extends { [name: string]: unknown } | undefined = { [name: string]: unknown },
> = {
  bytecode: BytesLike;
  provider: Provider;
  abi: JsonAbi;
  data?: TData;
  configurableConstants?: TConfigurables;
};

/**
 * `Predicate` provides methods to populate transaction data with predicate information and sending transactions with them.
 */
export class Predicate<
  TData extends InputValue[] = InputValue[],
  TConfigurables extends { [name: string]: unknown } | undefined = { [name: string]: unknown },
> extends Account {
  bytes: Uint8Array;
  predicateData: TData = [] as unknown as TData;
  interface: Interface;
  initialBytecode: Uint8Array;

  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytecode - The bytecode of the predicate.
   * @param abi - The JSON ABI of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param data - The predicate input data (optional).
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor({
    bytecode,
    abi,
    provider,
    data,
    configurableConstants,
  }: PredicateParams<TData, TConfigurables>) {
    const { predicateBytes, predicateInterface } = Predicate.processPredicateData(
      bytecode,
      abi,
      configurableConstants
    );
    const address = Address.fromB256(getPredicateRoot(predicateBytes));
    super(address, provider);

    this.initialBytecode = arrayify(bytecode);
    this.bytes = predicateBytes;
    this.interface = predicateInterface;
    if (data !== undefined && data.length > 0) {
      this.predicateData = data;
    }
  }

  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData<T extends TransactionRequest>(
    transactionRequestLike: TransactionRequestLike
  ) {
    const request = transactionRequestify(transactionRequestLike) as T;

    const placeholderIndex = this.getIndexFromPlaceholderWitness(request);

    if (placeholderIndex !== -1) {
      request.removeWitness(placeholderIndex);
    }

    request.inputs.filter(isRequestInputCoinOrMessage).forEach((input) => {
      if (isRequestInputResourceFromOwner(input, this.address)) {
        // eslint-disable-next-line no-param-reassign
        input.predicate = hexlify(this.bytes);
        // eslint-disable-next-line no-param-reassign
        input.predicateData = hexlify(this.getPredicateData());
        // eslint-disable-next-line no-param-reassign
        input.witnessIndex = 0;
      }
    });

    return request;
  }

  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  override sendTransaction(
    transactionRequestLike: TransactionRequestLike
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);

    return super.sendTransaction(transactionRequest, { estimateTxDependencies: false });
  }

  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  override simulateTransaction(
    transactionRequestLike: TransactionRequestLike
  ): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    return super.simulateTransaction(transactionRequest, { estimateTxDependencies: false });
  }

  private getPredicateData(): Uint8Array {
    if (!this.predicateData.length) {
      return new Uint8Array();
    }

    const mainFn = this.interface?.functions.main;
    return mainFn?.encodeArguments(this.predicateData) || new Uint8Array();
  }

  /**
   * Creates a new Predicate instance from an existing Predicate instance.
   * @param instance - The existing Predicate instance.
   * @returns A new Predicate instance with the same bytecode, ABI and provider but with the ability to set the data and configurable constants.
   */
  static fromInstance<
    TData extends InputValue[] = InputValue[],
    TConfigurables extends { [name: string]: unknown } | undefined = { [name: string]: unknown },
  >(instance: Predicate<TData, TConfigurables>) {
    return new (class {
      data: TData;
      configurableConstants: TConfigurables;

      constructor() {
        this.data = instance.predicateData;
        this.configurableConstants = {} as TConfigurables;
      }

      withData(data: TData): this {
        this.data = data;
        return this;
      }

      withConfigurableConstants(configurableConstants: TConfigurables): this {
        this.configurableConstants = configurableConstants;
        return this;
      }

      build(): Predicate<TData, TConfigurables> {
        return new Predicate({
          bytecode: instance.initialBytecode,
          abi: instance.interface.jsonAbi,
          provider: instance.provider,
          data: this.data,
          configurableConstants: this.configurableConstants,
        });
      }
    })();
  }

  /**
   * Processes the predicate data and returns the altered bytecode and interface.
   *
   * @param bytes - The bytes of the predicate.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   * @returns An object containing the new predicate bytes and interface.
   */
  private static processPredicateData(
    bytes: BytesLike,
    jsonAbi: JsonAbi,
    configurableConstants?: { [name: string]: unknown }
  ) {
    let predicateBytes = arrayify(bytes);
    const abiInterface: Interface = new Interface(jsonAbi);

    if (abiInterface.functions.main === undefined) {
      throw new FuelError(
        ErrorCode.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    }

    if (configurableConstants && Object.keys(configurableConstants).length) {
      predicateBytes = Predicate.setConfigurableConstants(
        predicateBytes,
        configurableConstants,
        abiInterface
      );
    }

    return {
      predicateBytes,
      predicateInterface: abiInterface,
    };
  }

  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  override async getResourcesToSpend(
    quantities: CoinQuantityLike[] /** IDs of coins to exclude */,
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    const resources = await this.provider.getResourcesToSpend(
      this.address,
      quantities,
      excludedIds
    );
    return resources.map((resource) => ({
      ...resource,
      predicate: hexlify(this.bytes),
      predicateData: hexlify(this.getPredicateData()),
    }));
  }

  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  override generateFakeResources(coins: FakeResources[]): Array<Resource> {
    return super.generateFakeResources(coins).map((coin) => ({
      ...coin,
      predicate: hexlify(this.bytes),
      predicateData: hexlify(this.getPredicateData()),
    }));
  }

  /**
   * Sets the configurable constants for the predicate.
   *
   * @param bytes - The bytes of the predicate.
   * @param configurableConstants - Configurable constants to be set.
   * @param abiInterface - The ABI interface of the predicate.
   * @returns The mutated bytes with the configurable constants set.
   */
  private static setConfigurableConstants(
    bytes: Uint8Array,
    configurableConstants: { [name: string]: unknown },
    abiInterface: Interface
  ) {
    const mutatedBytes = bytes;

    try {
      if (Object.keys(abiInterface.configurables).length === 0) {
        throw new FuelError(
          ErrorCode.INVALID_CONFIGURABLE_CONSTANTS,
          'Predicate has no configurable constants to be set'
        );
      }

      Object.entries(configurableConstants).forEach(([key, value]) => {
        if (!abiInterface?.configurables[key]) {
          throw new FuelError(
            ErrorCode.CONFIGURABLE_NOT_FOUND,
            `No configurable constant named '${key}' found in the Predicate`
          );
        }

        const { offset } = abiInterface.configurables[key];

        const encoded = abiInterface.encodeConfigurable(key, value as InputValue);

        mutatedBytes.set(encoded, offset);
      });
    } catch (err) {
      throw new FuelError(
        ErrorCode.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${(<Error>err).message}.`
      );
    }

    return mutatedBytes;
  }

  /**
   * Returns the index of the witness placeholder that was added to this predicate.
   * If no witness placeholder was added, it returns -1.
   * @param request - The transaction request.
   * @returns The index of the witness placeholder, or -1 if there is no witness placeholder.
   */
  private getIndexFromPlaceholderWitness(request: TransactionRequest): number {
    const predicateInputs = request.inputs
      .filter(isRequestInputResource)
      .filter((input) => isRequestInputResourceFromOwner(input, this.address));

    let index = -1;

    const hasEmptyPredicateInputs = predicateInputs.find((input) => !input.predicate);

    if (hasEmptyPredicateInputs) {
      index = hasEmptyPredicateInputs.witnessIndex;

      const allInputsAreEmpty = predicateInputs.every((input) => !input.predicate);

      if (!allInputsAreEmpty) {
        /**
         * If at least one resource was added as a predicate resource, we need to check if it was the
         * first one. If that is the case, we don't need to remove the witness placeholder
         * as this was added with the "witnessIndex" as 0 and without a placeholder witness. Later if
         * any resource without a predicate is added, it will have the same witnessIndex because it has the
         * same owner.
         */
        const wasFilledInputAddedFirst = !!predicateInputs[0]?.predicate;

        if (wasFilledInputAddedFirst) {
          index = -1;
        }
      }
    }

    return index;
  }

  /**
   *
   * @param account - The account used to pay the deployment costs.
   * @returns The _blobId_ and a _waitForResult_ callback that returns the deployed predicate
   * once the blob deployment transaction finishes.
   *
   * The returned loader predicate will have the same configurable constants
   * as the original predicate which was used to generate the loader predicate.
   */
  async deploy<T = this>(account: Account) {
    return deployScriptOrPredicate<T>({
      deployer: account,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: (loaderBytecode, newAbi) =>
        new Predicate({
          bytecode: loaderBytecode,
          abi: newAbi,
          provider: this.provider,
          data: this.predicateData,
        }) as T,
    });
  }
}
