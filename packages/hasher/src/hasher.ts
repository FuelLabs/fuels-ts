import type { BytesLike } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { ZeroBytes32 } from '@fuel-ts/constants';
import { toHex } from '@fuel-ts/math';
import type { TransactionRequestLike } from '@fuel-ts/providers';
import { transactionRequestify, TransactionType } from '@fuel-ts/providers';
import type { UtxoId } from '@fuel-ts/transactions';
import { OutputType, InputType, TransactionCoder } from '@fuel-ts/transactions';
import cloneDeep from 'lodash.clonedeep';

/**
 * hash string messages with sha256
 *
 * @param msg - The string message to be hashed
 * @returns A sha256 hash of the message
 */
export function hashMessage(msg: string) {
  return sha256(Buffer.from(msg));
}

/**
 * Hash transaction request with sha256. [Read more](https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/identifiers.md#transaction-id)
 *
 * @param transactionRequest - Transaction request to be hashed
 * @returns sha256 hash of the transaction
 */
export function hashTransaction(transactionRequestLike: TransactionRequestLike) {
  const transactionRequest = transactionRequestify(transactionRequestLike);
  // Return a new transaction object without references to the original transaction request
  const transaction = transactionRequest.toTransaction();

  if (transaction.type === TransactionType.Script) {
    transaction.receiptsRoot = ZeroBytes32;
  }

  // Zero out input fields
  transaction.inputs = transaction.inputs.map((input) => {
    const inputClone = cloneDeep(input);

    switch (inputClone.type) {
      // Zero out on signing: txoPointer
      case InputType.Coin: {
        // inputClone.txoPointer = 0;
        return inputClone;
      }
      // Zero out on signing: txID, outputIndex, balanceRoot, stateRoot, and txoPointer
      case InputType.Contract: {
        // inputClone.txoPointer;
        inputClone.utxoID = <UtxoId>{
          transactionId: ZeroBytes32,
          outputIndex: 0,
        };
        inputClone.balanceRoot = ZeroBytes32;
        inputClone.stateRoot = ZeroBytes32;
        return inputClone;
      }
      default:
        return inputClone;
    }
  });
  // Zero out output fields
  transaction.outputs = transaction.outputs.map((output) => {
    const outputClone = cloneDeep(output);

    switch (outputClone.type) {
      // Zero out on signing: balanceRoot, stateRoot
      case OutputType.Contract: {
        outputClone.balanceRoot = ZeroBytes32;
        outputClone.stateRoot = ZeroBytes32;
        return outputClone;
      }
      // Zero out on signing: amount
      case OutputType.Change: {
        outputClone.amount = toHex(0);
        return outputClone;
      }
      // Zero out on signing: amount, to and assetId
      case OutputType.Variable: {
        outputClone.to = ZeroBytes32;
        outputClone.amount = toHex(0);
        outputClone.assetId = ZeroBytes32;
        return outputClone;
      }
      default:
        return outputClone;
    }
  });
  transaction.witnessesCount = 0;
  transaction.witnesses = [];

  return sha256(new TransactionCoder().encode(transaction));
}

/**
 * wrap sha256
 *
 * @param data - The data to be hash
 * @returns A sha256 hash of the data
 */
export function hash(data: BytesLike) {
  return sha256(data);
}
