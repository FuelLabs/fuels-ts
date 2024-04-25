import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import {
  Interface,
  INPUT_COIN_FIXED_SIZE,
  WORD_SIZE,
  calculateVmTxMemory,
  SCRIPT_FIXED_SIZE,
} from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { ByteArrayCoder, InputType } from '@fuel-ts/transactions';
import { arrayify, hexlify } from '@fuel-ts/utils';

import { Account } from '../account';
import { transactionRequestify, BaseTransactionRequest } from '../providers';
import type {
  CallResult,
  CoinQuantityLike,
  ExcludeResourcesOption,
  Provider,
  Resource,
  TransactionRequestInput,
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
  populateTransactionPredicateData(transactionRequestLike: TransactionRequestLike) {
    const request = transactionRequestify(transactionRequestLike);

    const { policies } = BaseTransactionRequest.getPolicyMeta(request);

    request.inputs?.forEach((input: TransactionRequestInput) => {
      if (input.type === InputType.Coin && hexlify(input.owner) === this.address.toB256()) {
        // eslint-disable-next-line no-param-reassign
        input.predicate = hexlify(this.bytes);
        // eslint-disable-next-line no-param-reassign
        input.predicateData = hexlify(this.getPredicateData(policies.length));
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
  sendTransaction(transactionRequestLike: TransactionRequestLike): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    return super.sendTransaction(transactionRequest, { estimateTxDependencies: false });
  }

  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    return super.simulateTransaction(transactionRequest, { estimateTxDependencies: false });
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
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(
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
      padPredicateData: (policiesLength: number) => hexlify(this.getPredicateData(policiesLength)),
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
}
