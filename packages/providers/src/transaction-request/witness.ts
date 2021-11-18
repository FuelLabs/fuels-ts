import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Witness } from '@fuel-ts/transactions';

export type TransactionRequestWitness = BytesLike;

export const witnessify = (value: TransactionRequestWitness): Witness => {
  const data = arrayify(value);

  return {
    data: hexlify(data),
    dataLength: BigNumber.from(data.length),
  };
};
