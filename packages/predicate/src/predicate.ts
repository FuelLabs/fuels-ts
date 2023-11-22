import type { JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import {
  Interface,
  INPUT_COIN_FIXED_SIZE,
  SCRIPT_FIXED_SIZE,
  WORD_SIZE,
  calculateVmTxMemory,
} from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type {
  CoinQuantityLike,
  ExcludeResourcesOption,
  Provider,
  PredicateResource,
} from '@fuel-ts/providers';
import { ByteArrayCoder } from '@fuel-ts/transactions';
import { Account } from '@fuel-ts/wallet';
import type { BytesLike } from 'ethers';
import { getBytesCopy } from 'ethers';

import { getPredicateRoot } from './utils';

/**
 * `Predicate` provides methods to populate transaction data with predicate information and sending transactions with them.
 */
export class Predicate<ARGS extends InputValue[]> extends Account {
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
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(
    quantities: CoinQuantityLike[] /** IDs of coins to exclude */,
    excludedIds?: ExcludeResourcesOption
  ): Promise<PredicateResource[]> {
    const resources = await super.getResourcesToSpend(quantities, excludedIds);

    return resources.map((r) => ({
      ...r,
      getPredicateContent: () => ({ predicate: this.bytes, predicateData: this.predicateData }),
    }));
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
