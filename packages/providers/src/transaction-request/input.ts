import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';
import type { Input, InputCoin } from '@fuel-ts/transactions';
import { InputType } from '@fuel-ts/transactions';

type CoinTransactionRequestInput = {
  type: InputType.Coin;
  data: InputCoin;
};
type ContractTransactionRequestInput = {
  type: InputType.Contract;
  contractId: BytesLike;
};
export type TransactionRequestInput = CoinTransactionRequestInput | ContractTransactionRequestInput;

export const inputify = (value: TransactionRequestInput): Input => {
  switch (value.type) {
    case InputType.Coin: {
      return value;
    }
    case InputType.Contract: {
      return {
        type: InputType.Contract,
        data: {
          utxoID: '0x0000000000000000000000000000000000000000000000000000000000000000',
          balanceRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
          stateRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
          contractID: hexlify(value.contractId),
        },
      };
    }
    default: {
      throw new Error('Invalid Input type');
    }
  }
};
