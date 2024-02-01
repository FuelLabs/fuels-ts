import type { JsonAbi } from '@fuel-ts/abi-coder';

export type AbiMap = {
  [key: string]: JsonAbi;
};

export type AbiTable = {
  contractId: string;
  abi: JsonAbi;
};
