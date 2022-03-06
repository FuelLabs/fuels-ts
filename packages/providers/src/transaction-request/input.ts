import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Input } from '@fuel-ts/transactions';
import { InputType } from '@fuel-ts/transactions';

type CoinTransactionRequestInput = {
  type: InputType.Coin;
  /** UTXO ID */
  id: BytesLike;
  /** Owning address or script hash */
  owner: BytesLike;
  /** Amount of coins */
  amount: BigNumberish;
  /** Asset ID of the coins */
  assetId: BytesLike;
  /** Index of witness that authorizes spending the coin */
  witnessIndex: BigNumberish;
  /** UTXO being spent must have been created at least this many blocks ago */
  maturity?: BigNumberish;
  /** Predicate bytecode */
  predicate?: BytesLike;
  /** Predicate input data (parameters) */
  predicateData?: BytesLike;
};
type ContractTransactionRequestInput = {
  type: InputType.Contract;
  /** Contract ID */
  contractId: BytesLike;
};
export type TransactionRequestInput = CoinTransactionRequestInput | ContractTransactionRequestInput;

export const inputify = (value: TransactionRequestInput): Input => {
  switch (value.type) {
    case InputType.Coin: {
      const predicate = arrayify(value.predicate ?? '0x');
      const predicateData = arrayify(value.predicateData ?? '0x');
      return {
        type: InputType.Coin,
        utxoID: {
          transactionId: hexlify(arrayify(value.id).slice(0, 32)),
          outputIndex: BigNumber.from(arrayify(value.id)[32]),
        },
        owner: hexlify(value.owner),
        amount: BigNumber.from(value.amount),
        assetId: hexlify(value.assetId),
        witnessIndex: BigNumber.from(value.witnessIndex),
        maturity: BigNumber.from(value.maturity ?? 0),
        predicateLength: BigNumber.from(predicate.length),
        predicateDataLength: BigNumber.from(predicate.length),
        predicate: hexlify(predicate),
        predicateData: hexlify(predicateData),
      };
    }
    case InputType.Contract: {
      return {
        type: InputType.Contract,
        utxoID: {
          transactionId: '0x0000000000000000000000000000000000000000000000000000000000000000',
          outputIndex: BigNumber.from(0),
        },
        balanceRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
        stateRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
        contractID: hexlify(value.contractId),
      };
    }
    default: {
      throw new Error('Invalid Input type');
    }
  }
};
