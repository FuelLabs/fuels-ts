import type { BN } from '@fuel-ts/math';

// Bitfield of used policy types.
export enum PolicyType {
  GasPrice = 1,
  WitnessLimit = 2,
  Maturity = 4,
  MaxFee = 8,
}

export type Policy = PolicyGasPrice | PolicyWitnessLimit | PolicyMaturity | PolicyMaxFee;

export type PolicyGasPrice = {
  type: PolicyType.GasPrice;
  data: BN;
};

export type PolicyWitnessLimit = {
  type: PolicyType.WitnessLimit;
  data: BN;
};

export type PolicyMaturity = {
  type: PolicyType.Maturity;
  data: number;
};

export type PolicyMaxFee = {
  type: PolicyType.MaxFee;
  data: BN;
};
