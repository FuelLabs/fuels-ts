import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { AbiCoder, Interface } from '@fuel-ts/abi-coder';
import type { JsonAbiFragmentType, JsonAbi, InputValue } from '@fuel-ts/abi-coder';
import { Account } from '@fuel-ts/account';
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

import { getContractRoot } from './utils';

const logger = new Logger(versions.FUELS);

export class Predicate<ARGS extends InputValue[]> extends Account {
  bytes: Uint8Array;
  types?: ReadonlyArray<JsonAbiFragmentType>;
  predicateData: Uint8Array = Uint8Array.from([]);
  interface?: Interface;

  constructor(bytes: BytesLike, types?: JsonAbi, provider?: string | Provider) {
    const address = Address.fromB256(getContractRoot(bytes));
    super(address, provider);

    // Assign bytes data
    this.bytes = arrayify(bytes);

    if (types) {
      this.interface = new Interface(types as JsonAbi);
      const mainFunction = this.interface.fragments.find(({ name }) => name === 'main');
      if (mainFunction !== undefined) {
        this.types = mainFunction.inputs;
      } else {
        logger.throwArgumentError(
          'Cannot use ABI without "main" function',
          'Function fragments',
          this.interface.fragments
        );
      }
    }
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
    const abiCoder = new AbiCoder();
    const encoded = abiCoder.encode(this.types || [], args);
    this.predicateData = encoded;
    return this;
  }
}
