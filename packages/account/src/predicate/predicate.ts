import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import {
  Interface,
  INPUT_COIN_FIXED_SIZE,
  WORD_SIZE,
  calculateVmTxMemory,
  SCRIPT_FIXED_SIZE,
} from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import { ByteArrayCoder } from '@fuel-ts/transactions';
import { arrayify, hexlify } from '@fuel-ts/utils';

import { Account } from '../account';
import type { TxParamsType } from '../account';
import {
  transactionRequestify,
  BaseTransactionRequest,
  isRequestInputResource,
  isRequestInputResourceFromOwner,
} from '../providers';
import type {
  CallResult,
  CoinQuantityLike,
  ExcludeResourcesOption,
  Provider,
  ProviderSendTxParams,
  Resource,
  TransactionRequest,
  TransactionRequestLike,
  TransactionResponse,
} from '../providers';

import { getPredicateRoot } from './utils';

export type PredicateParams<T = InputValue[]> = {
  bytecode: BytesLike;
  provider: Provider;
  abi?: JsonAbi;
  inputData?: T;
  configurableConstants?: { [name: string]: unknown };
};

/**
 * `Predicate` provides methods to populate transaction data with predicate information and sending transactions with them.
 */
export class Predicate<TInputData extends InputValue[]> extends Account {
  bytes: Uint8Array;
  predicateData: TInputData = [] as unknown as TInputData;
  interface?: Interface;

  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytecode - The bytecode of the predicate.
   * @param abi - The JSON ABI of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param inputData - The predicate input data (optional).
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor({
    bytecode,
    abi,
    provider,
    inputData,
    configurableConstants,
  }: PredicateParams<TInputData>) {
    const { predicateBytes, predicateInterface } = Predicate.processPredicateData(
      bytecode,
      abi,
      configurableConstants
    );
    const address = Address.fromB256(getPredicateRoot(predicateBytes));
    super(address, provider);

    this.bytes = predicateBytes;
    this.interface = predicateInterface;
    if (inputData !== undefined && inputData.length > 0) {
      this.predicateData = inputData;
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

    const { policies } = BaseTransactionRequest.getPolicyMeta(request);

    const placeholderIndex = this.getIndexFromPlaceholderWitness(request);

    if (placeholderIndex !== -1) {
      request.removeWitness(placeholderIndex);
    }

    request.inputs.filter(isRequestInputResource).forEach((input) => {
      if (isRequestInputResourceFromOwner(input, this.address)) {
        // eslint-disable-next-line no-param-reassign
        input.predicate = this.bytes;
        // eslint-disable-next-line no-param-reassign
        input.predicateData = this.getPredicateData(policies.length);
        // eslint-disable-next-line no-param-reassign
        input.witnessIndex = 0;
      }
    });

    return request;
  }

  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(
    /** Address of the destination */
    destination: AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = BaseAssetId,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionRequest> {
    const request = await super.createTransfer(destination, amount, assetId, txParams);
    return this.populateTransactionPredicateData(request);
  }

  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(
    transactionRequestLike: TransactionRequestLike,
    options?: Pick<ProviderSendTxParams, 'awaitExecution'>
  ): Promise<TransactionResponse> {
    const transactionRequest = this.populateTransactionPredicateData(transactionRequestLike);
    return super.sendTransaction(transactionRequest, options);
  }

  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = this.populateTransactionPredicateData(transactionRequestLike);
    return super.simulateTransaction(transactionRequest);
  }

  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - Coins to retrieve.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(
    quantities: CoinQuantityLike[],
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    const resources = await super.getResourcesToSpend(quantities, excludedIds);

    return resources.map((resource) => ({
      ...resource,
      predicate: hexlify(this.bytes),
    }));
  }

  private getPredicateData(policiesLength: number): Uint8Array {
    if (!this.predicateData.length) {
      return new Uint8Array();
    }

    const mainFn = this.interface?.functions.main;
    const paddedCode = new ByteArrayCoder(this.bytes.length).encode(this.bytes);

    const VM_TX_MEMORY = calculateVmTxMemory({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber(),
    });
    const OFFSET =
      VM_TX_MEMORY +
      SCRIPT_FIXED_SIZE +
      INPUT_COIN_FIXED_SIZE +
      WORD_SIZE +
      paddedCode.byteLength +
      policiesLength * WORD_SIZE;

    return mainFn?.encodeArguments(this.predicateData, OFFSET) || new Uint8Array();
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
    jsonAbi?: JsonAbi,
    configurableConstants?: { [name: string]: unknown }
  ) {
    let predicateBytes = arrayify(bytes);
    let abiInterface: Interface | undefined;

    if (jsonAbi) {
      abiInterface = new Interface(jsonAbi);
      if (abiInterface.functions.main === undefined) {
        throw new FuelError(
          ErrorCode.ABI_MAIN_METHOD_MISSING,
          'Cannot use ABI without "main" function.'
        );
      }
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
    abiInterface?: Interface
  ) {
    const mutatedBytes = bytes;

    try {
      if (!abiInterface) {
        throw new Error(
          'Cannot validate configurable constants because the Predicate was instantiated without a JSON ABI'
        );
      }

      if (Object.keys(abiInterface.configurables).length === 0) {
        throw new Error('Predicate has no configurable constants to be set');
      }

      Object.entries(configurableConstants).forEach(([key, value]) => {
        if (!abiInterface?.configurables[key]) {
          throw new Error(`No configurable constant named '${key}' found in the Predicate`);
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
         * If at least one resource was added as predicate resource, we need to check if it was the
         * first one. If that is the case, we don't need to remove the witness placeholder
         * as this was added with the "witnessIndex" as 0 and without a placeholder witness. Later if
         * any resource without predicate is added, it will have the same witnessIndex because it has the
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
}
