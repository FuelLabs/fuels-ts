import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { AbiCoder, Interface } from '@fuel-ts/abi-coder';
import type { InputValue, JsonFlatAbi } from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import type {
  CallResult,
  Provider,
  TransactionRequestLike,
  TransactionResponse,
} from '@fuel-ts/providers';
import { transactionRequestify } from '@fuel-ts/providers';
import { InputType } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';
import { Account } from '@fuel-ts/wallet';

import { getContractRoot } from './utils';

const logger = new Logger(versions.FUELS);

export class Predicate<ARGS extends InputValue[]> extends Account {
  bytes: Uint8Array;
  jsonAbi?: JsonFlatAbi;
  predicateData: Uint8Array = Uint8Array.from([]);
  interface?: Interface;

  constructor(
    bytes: BytesLike,
    chainId: number,
    jsonAbi?: JsonFlatAbi,
    provider?: string | Provider,
    configurableConstants?: { [name: string]: unknown }
  ) {
    const { predicateBytes } = Predicate.processPredicateData(
      bytes,
      jsonAbi,
      configurableConstants
    );

    const address = Address.fromB256(getContractRoot(predicateBytes, chainId));
    super(address, provider);

    // Assign bytes data
    this.bytes = predicateBytes;
    this.jsonAbi = jsonAbi;
    // this.jsonAbi = predicateTypes;
    this.interface = jsonAbi && new Interface(jsonAbi);
  }

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

  sendTransaction(transactionRequestLike: TransactionRequestLike): Promise<TransactionResponse> {
    const transactionRequest = this.populateTransactionPredicateData(transactionRequestLike);
    return super.sendTransaction(transactionRequest);
  }

  simulateTransaction(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = this.populateTransactionPredicateData(transactionRequestLike);
    return super.simulateTransaction(transactionRequest);
  }

  setData<T extends ARGS>(...args: T) {
    const mainFn = this.interface?.functions.main;
    this.predicateData = mainFn?.encodeArguments(args) || new Uint8Array();
    return this;
  }

  private static processPredicateData(
    bytes: BytesLike,
    jsonAbi?: JsonFlatAbi,
    configurableConstants?: { [name: string]: unknown }
  ) {
    let predicateBytes = arrayify(bytes);
    let abi: Interface | undefined;

    if (jsonAbi) {
      abi = new Interface(jsonAbi);
      const mainFunction = abi.functions.main;
      if (mainFunction !== undefined) {
        // predicateTypes = mainFunction.inputs;
      } else {
        logger.throwArgumentError(
          'Cannot use ABI without "main" function',
          'Abi functions',
          abi.functions
        );
      }
    }

    if (configurableConstants && Object.keys(configurableConstants).length) {
      predicateBytes = Predicate.setConfigurableConstants(
        predicateBytes,
        configurableConstants,
        abi
      );
    }

    return {
      predicateBytes,
      predicateInterface: abi,
    };
  }

  private static setConfigurableConstants(
    bytes: Uint8Array,
    configurableConstants: { [name: string]: unknown },
    abiInterface?: Interface
  ) {
    const mutatedBytes = bytes;

    try {
      if (!abiInterface) {
        throw new Error(
          'Unable to validate configurable constants, Predicate instantiated without json ABI'
        );
      }

      if (!Object.keys(abiInterface.configurables).length) {
        throw new Error('Predicate has no configurable constants to be set');
      }

      Object.entries(configurableConstants).forEach(([key, value]) => {
        if (!abiInterface?.configurables[key]) {
          throw new Error(`Predicate has no configurable constant named: ${key}`);
        }

        const configurable = abiInterface.configurables[key];

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const encoded = AbiCoder.encode(abiInterface.jsonAbi, configurable.configurableType, value);

        mutatedBytes.set(encoded, configurable.offset);
      });
    } catch (err) {
      throw new Error(`Error setting configurable constants: ${err}`);
    }

    return mutatedBytes;
  }
}
