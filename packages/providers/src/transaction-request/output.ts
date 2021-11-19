import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';
import type { Output } from '@fuel-ts/transactions';
import { OutputType } from '@fuel-ts/transactions';

type CoinTransactionRequestOutput = {
  type: OutputType.Coin;
  to: BytesLike;
  amount: BigNumberish;
  color: BytesLike;
};
type ContractTransactionRequestOutput = {
  type: OutputType.Contract;
  inputIndex: BigNumberish;
};
type WithdrawalTransactionRequestOutput = {
  type: OutputType.Withdrawal;
  to: BytesLike;
  amount: BigNumberish;
  color: BytesLike;
};
type ChangeTransactionRequestOutput = {
  type: OutputType.Change;
  to: BytesLike;
  color: BytesLike;
};
type VariableTransactionRequestOutput = {
  type: OutputType.Variable;
};
type ContractCreatedTransactionRequestOutput = {
  type: OutputType.ContractCreated;
  contractId: BytesLike;
};
export type TransactionRequestOutput =
  | CoinTransactionRequestOutput
  | ContractTransactionRequestOutput
  | WithdrawalTransactionRequestOutput
  | ChangeTransactionRequestOutput
  | VariableTransactionRequestOutput
  | ContractCreatedTransactionRequestOutput;

export const outputify = (value: TransactionRequestOutput): Output => {
  switch (value.type) {
    case OutputType.Coin: {
      return {
        type: OutputType.Coin,
        data: {
          to: hexlify(value.to),
          amount: BigNumber.from(value.amount),
          color: hexlify(value.color),
        },
      };
    }
    case OutputType.Contract: {
      return {
        type: OutputType.Contract,
        data: {
          inputIndex: BigNumber.from(value.inputIndex),
          balanceRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
          stateRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
        },
      };
    }
    case OutputType.Withdrawal: {
      return {
        type: OutputType.Withdrawal,
        data: {
          to: hexlify(value.to),
          amount: BigNumber.from(value.amount),
          color: hexlify(value.color),
        },
      };
    }
    case OutputType.Change: {
      return {
        type: OutputType.Change,
        data: {
          to: hexlify(value.to),
          amount: BigNumber.from(0),
          color: hexlify(value.color),
        },
      };
    }
    case OutputType.Variable: {
      return {
        type: OutputType.Variable,
        data: {
          to: '0x00000000000000000000000000000000000000000000000000000000',
          amount: BigNumber.from(0),
          color: '0x00000000000000000000000000000000000000000000000000000000',
        },
      };
    }
    case OutputType.ContractCreated: {
      return {
        type: OutputType.ContractCreated,
        data: {
          contractId: hexlify(value.contractId),
        },
      };
    }
    default: {
      throw new Error('Invalid Output type');
    }
  }
};
