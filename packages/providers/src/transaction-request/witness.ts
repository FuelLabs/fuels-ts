import { arrayify } from '@ethersproject/bytes';
import type { Witness } from '@fuel-ts/transactions';
import { hexlify } from 'ethers';
import type { BytesLike } from 'ethers';

export type TransactionRequestWitness = BytesLike;

export const witnessify = (value: TransactionRequestWitness): Witness => {
  const data = arrayify(value);

  return {
    data: hexlify(data),
    dataLength: data.length,
  };
};
