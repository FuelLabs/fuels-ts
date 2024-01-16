import type { Witness } from '@fuel-ts/transactions';
import { arrayify, hexlify } from '@fuel-ts/utils';
import type { BytesLike } from '@fuel-ts/interfaces';

export type TransactionRequestWitness = BytesLike;

export const witnessify = (value: TransactionRequestWitness): Witness => {
  const data = arrayify(value);

  return {
    data: hexlify(data),
    dataLength: data.length,
  };
};
