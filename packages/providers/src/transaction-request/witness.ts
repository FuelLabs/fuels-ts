import type { Witness } from '@fuel-ts/transactions';
import { getBytes, hexlify } from 'ethers';
import type { BytesLike } from 'ethers';

export type TransactionRequestWitness = BytesLike;

export const witnessify = (value: TransactionRequestWitness): Witness => {
  const data = getBytes(value);

  return {
    data: hexlify(data),
    dataLength: data.length,
  };
};
