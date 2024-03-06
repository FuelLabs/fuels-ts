import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { uint64ToBytesBE, sha256 } from '@fuel-ts/hasher';
import { bn } from '@fuel-ts/math';
import { TransactionType, InputType, OutputType, TransactionCoder } from '@fuel-ts/transactions';
import { concat } from '@fuel-ts/utils';
import { clone } from 'ramda';

import type { TransactionRequest } from './types';

/**
 * Hash transaction request with sha256. [Read more](https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/identifiers.md#transaction-id)
 *
 * @param transactionRequest - Transaction request to be hashed
 * @returns sha256 hash of the transaction
 */
export function hashTransaction(transactionRequest: TransactionRequest, chainId: number) {
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
