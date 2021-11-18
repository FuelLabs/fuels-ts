import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';
import type {
  Output,
  OutputCoin,
  OutputWithdrawal,
  OutputChange,
  OutputVariable,
} from '@fuel-ts/transactions';
import { OutputType } from '@fuel-ts/transactions';

type CoinTransactionRequestOutput = {
  type: OutputType.Coin;
  data: OutputCoin;
};
type ContractTransactionRequestOutput = {
  type: OutputType.Contract;
  inputIndex: BigNumberish;
};
type WithdrawalTransactionRequestOutput = {
  type: OutputType.Withdrawal;
  data: OutputWithdrawal;
};
type ChangeTransactionRequestOutput = {
  type: OutputType.Change;
  data: OutputChange;
};
type VariableTransactionRequestOutput = {
  type: OutputType.Variable;
  data: OutputVariable;
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
      return value;
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
      return value;
    }
    case OutputType.Change: {
      return value;
    }
    case OutputType.Variable: {
      return value;
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
