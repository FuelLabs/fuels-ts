import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import type { TransactionRequest } from '@fuel-ts/providers';
import { transactionFromRequest } from '@fuel-ts/providers';
import type { UtxoId } from '@fuel-ts/transactions';
import { InputType, TransactionCoder, TransactionType } from '@fuel-ts/transactions';

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
export function hashTransaction(transactionRequest: TransactionRequest) {
  // Return a new transaction object without references to the original transaction request
  const transaction = transactionFromRequest(transactionRequest);

  if (transaction.type === TransactionType.Script) {
    transaction.receiptsRoot = '0x0000000000000000000000000000000000000000000000000000000000000000';
  }

  // Zero out input fields
  transaction.inputs = transaction.inputs.map((input) => {
    const inputClone = { ...input };

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
          outputIndex: BigNumber.from(0),
          transactionId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        };
        inputClone.balanceRoot =
          '0x0000000000000000000000000000000000000000000000000000000000000000';
        inputClone.stateRoot = '0x0000000000000000000000000000000000000000000000000000000000000000';
        return inputClone;
      }
      default:
        return inputClone;
    }
  });
  transaction.witnesses = [];

  return sha256(new TransactionCoder('transaction').encode(transaction));
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
