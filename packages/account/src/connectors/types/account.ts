import type { BN } from '@fuel-ts/math';
import type { Coin } from '@fuel-ts/providers';
import type { BigNumberish } from 'ethers';

export type Vault = {
  key: string;
  data: string;
};

export type Account = {
  name: string;
  address: string;
  vaultId?: number;
  publicKey: string;
  isHidden?: boolean;
  balance?: BigNumberish | BN;
  balanceSymbol?: string;
  balances?: Coin[];
  isCurrent?: boolean;
};

export enum AddressType {
  contract,
  account,
}
