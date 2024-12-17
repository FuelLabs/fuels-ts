import type { Witness } from '@fuel-ts/transactions';
import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, hexlify } from '@fuel-ts/utils';

export type TransactionRequestWitness = BytesLike;

export const witnessify = (value: TransactionRequestWitness): Witness => {
  const data = arrayify(value);

  return {
    data: hexlify(data),
    dataLength: data.length,
  };
};
