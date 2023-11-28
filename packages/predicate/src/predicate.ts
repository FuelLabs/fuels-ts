import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import {
  Interface,
  INPUT_COIN_FIXED_SIZE,
  SCRIPT_FIXED_SIZE,
  WORD_SIZE,
  calculateVmTxMemory,
} from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { hashTransaction } from '@fuel-ts/hasher';
import type { AbstractAddress, AbstractPredicate } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import type {
  CallResult,
  Provider,
  TransactionRequestLike,
  TransactionResponse,
} from '@fuel-ts/providers';
import { transactionRequestify } from '@fuel-ts/providers';
import { ByteArrayCoder, InputType } from '@fuel-ts/transactions';
import type { TxParamsType } from '@fuel-ts/wallet';
import { Account } from '@fuel-ts/wallet';
import type { BytesLike } from 'ethers';
import { getBytesCopy, hexlify } from 'ethers';

import { getPredicateRoot } from './utils';

/**
 * `Predicate` provides methods to populate transaction data with predicate information and sending transactions with them.
 */
export class Predicate<ARGS extends InputValue[]> extends Account implements AbstractPredicate {
  bytes: Uint8Array;
  predicateData: Uint8Array = Uint8Array.from([]);
  interface?: Interface;

  // TODO: Since provider is no longer optional, we can maybe remove `chainId` from the constructor.
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytes - The bytes of the predicate.
   * @param chainId - The chain ID for which the predicate is used.
   * @param provider - The provider used to interact with the blockchain.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor(
    bytes: BytesLike,
    provider: Provider,
    jsonAbi?: JsonAbi,
    configurableConstants?: { [name: string]: unknown }
  ) {
    const { predicateBytes, predicateInterface } = Predicate.processPredicateData(
      bytes,
      jsonAbi,
      configurableConstants
    );
    const chainId = provider.getChainId();
    const address = Address.fromB256(getPredicateRoot(predicateBytes, chainId));
    super(address, provider);

    this.bytes = predicateBytes;
    this.interface = predicateInterface;
  }

  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(transactionRequestLike: TransactionRequestLike) {
    const request = transactionRequestify(transactionRequestLike);

    request.inputs?.forEach((input) => {
      if (input.type === InputType.Coin && hexlify(input.owner) === this.address.toB256()) {
        // eslint-disable-next-line no-param-reassign
        input.predicate = this.bytes;
        // eslint-disable-next-line no-param-reassign
        input.predicateData = this.predicateData;
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
    const transactionRequest = this.populateTransactionPredicateData(transactionRequestLike);
    return super.sendTransaction(transactionRequest);
  }

  /**
   * Returns the transaction ID for a transfer transaction, without sending it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the transaction ID.
   */
  async getTransferTxId(
    /** Address of the destination */
    destination: AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = BaseAssetId,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<string> {
    const request = await super.prepareTransferTxRequestForIdCalculation(
      destination,
      amount,
      assetId,
      txParams
    );
    const populatedRequest = this.populateTransactionPredicateData(request);
    return hashTransaction(populatedRequest, this.provider.getChainId());
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
   * Sets data for the predicate.
   *
   * @param args - Arguments for the predicate function.
   * @returns The Predicate instance with updated predicate data.
   */
  setData<T extends ARGS>(...args: T) {
    const mainFn = this.interface?.functions.main;
    const paddedCode = new ByteArrayCoder(this.bytes.length).encode(this.bytes);

    const VM_TX_MEMORY = calculateVmTxMemory({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber(),
    });
    const OFFSET =
      VM_TX_MEMORY + SCRIPT_FIXED_SIZE + INPUT_COIN_FIXED_SIZE + WORD_SIZE + paddedCode.byteLength;

    this.predicateData = mainFn?.encodeArguments(args, OFFSET) || new Uint8Array();
    return this;
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
    let predicateBytes = getBytesCopy(bytes);
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
}
