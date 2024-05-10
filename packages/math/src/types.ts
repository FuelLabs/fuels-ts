import type { BN } from './bn';

export type BigNumberish = string | number | BN;
export type ToFixedConfig = {
  minPrecision?: number;
  precision?: number;
};
export type FormatConfig = {
  units?: number;
} & ToFixedConfig;
