import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Input } from '@fuel-ts/transactions';
import { InputType } from '@fuel-ts/transactions';

type CoinTransactionRequestInput = {
  type: InputType.Coin;
  utxoId: BytesLike;
  owner: BytesLike;
  amount: BigNumberish;
  color: BytesLike;
  witnessIndex: BigNumberish;
  maturity: BigNumberish;
  predicate: BytesLike;
  predicateData: BytesLike;
};
type ContractTransactionRequestInput = {
  type: InputType.Contract;
  contractId: BytesLike;
};
export type TransactionRequestInput = CoinTransactionRequestInput | ContractTransactionRequestInput;

export const inputify = (value: TransactionRequestInput): Input => {
  switch (value.type) {
    case InputType.Coin: {
      const predicate = arrayify(value.predicate);
      const predicateData = arrayify(value.predicateData);
      return {
        type: InputType.Coin,
        utxoID: hexlify(value.utxoId),
        owner: hexlify(value.owner),
        amount: BigNumber.from(value.amount),
        color: hexlify(value.color),
        witnessIndex: BigNumber.from(value.witnessIndex),
        maturity: BigNumber.from(value.maturity),
        predicateLength: BigNumber.from(predicate.length),
        predicateDataLength: BigNumber.from(predicate.length),
        predicate: hexlify(predicate),
        predicateData: hexlify(predicateData),
      };
    }
    case InputType.Contract: {
      return {
        type: InputType.Contract,
        utxoID: '0x0000000000000000000000000000000000000000000000000000000000000000',
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
