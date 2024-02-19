import type { Witness } from '@fuel-ts/transactions';
import { getBytesCopy, hexlify } from 'ethers';
import type { BytesLike } from 'ethers';

export type TransactionRequestWitness = BytesLike;

export const witnessify = (value: TransactionRequestWitness): Witness => {
  const data = getBytesCopy(value);

  return {
    data: hexlify(data),
    dataLength: data.length,
  };
};
