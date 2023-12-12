import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { bufferFromString } from '@fuel-ts/crypto';
import { bn } from '@fuel-ts/math';
import type { TransactionRequestLike } from '@fuel-ts/providers';
import { transactionRequestify } from '@fuel-ts/providers';
import { OutputType, InputType, TransactionCoder, TransactionType } from '@fuel-ts/transactions';
import type { BytesLike } from 'ethers';
import { sha256, concat } from 'ethers';
import { clone } from 'ramda';

/**
 * hash string messages with sha256
 *
 * @param msg - The string message to be hashed
 * @returns A sha256 hash of the message
 */
export function hashMessage(msg: string) {
  return sha256(bufferFromString(msg, 'utf-8'));
}

/**
 * Convert a uint64 number to a big-endian byte array
 */
export function uint64ToBytesBE(value: number): Uint8Array {
  const bigIntValue = BigInt(value);
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);
  dataView.setBigUint64(0, bigIntValue, false); // write the uint64 value in big-endian order
  return new Uint8Array(dataView.buffer);
}

/**
 * Hash transaction request with sha256. [Read more](https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/identifiers.md#transaction-id)
 *
 * @param transactionRequest - Transaction request to be hashed
 * @returns sha256 hash of the transaction
 */
export function hashTransaction(transactionRequestLike: TransactionRequestLike, chainId: number) {
  const transactionRequest = transactionRequestify(transactionRequestLike);
  // Return a new transaction object without references to the original transaction request
  const transaction = transactionRequest.toTransaction();

  if (transaction.type === TransactionType.Script) {
    transaction.receiptsRoot = ZeroBytes32;
  }

  // Zero out input fields
  transaction.inputs = transaction.inputs.map((input) => {
    const inputClone = clone(input);

    switch (inputClone.type) {
      // Zero out on signing: txPointer, predicateGasUsed
      case InputType.Coin: {
        inputClone.txPointer = {
          blockHeight: 0,
          txIndex: 0,
        };
        inputClone.predicateGasUsed = bn(0);
        return inputClone;
      }
      // Zero out on signing: predicateGasUsed
      case InputType.Message: {
        inputClone.predicateGasUsed = bn(0);
        return inputClone;
      }
      // Zero out on signing: txID, outputIndex, balanceRoot, stateRoot, and txPointer
      case InputType.Contract: {
        inputClone.txPointer = {
          blockHeight: 0,
          txIndex: 0,
        };
        inputClone.txID = ZeroBytes32;
        inputClone.outputIndex = 0;
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
    const outputClone = clone(output);

    switch (outputClone.type) {
      // Zero out on signing: balanceRoot, stateRoot
      case OutputType.Contract: {
        outputClone.balanceRoot = ZeroBytes32;
        outputClone.stateRoot = ZeroBytes32;
        return outputClone;
      }
      // Zero out on signing: amount
      case OutputType.Change: {
        outputClone.amount = bn(0);
        return outputClone;
      }
      // Zero out on signing: amount, to and assetId
      case OutputType.Variable: {
        outputClone.to = ZeroBytes32;
        outputClone.amount = bn(0);
        outputClone.assetId = ZeroBytes32;
        return outputClone;
      }
      default:
        return outputClone;
    }
  });
  transaction.witnessesCount = 0;
  transaction.witnesses = [];

  const chainIdBytes = uint64ToBytesBE(chainId);
  const concatenatedData = concat([chainIdBytes, new TransactionCoder().encode(transaction)]);
  return sha256(concatenatedData);
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
