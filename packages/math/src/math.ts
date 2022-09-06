import type { BN } from './bn';
import { bn } from './bn';
import type { BigNumberish } from './types';

export function max(...numbers: Array<BigNumberish>): BN {
  return numbers.reduce<BN>((prev, cur) => (bn(cur).gt(prev) ? bn(cur) : prev), bn(0));
}

export function multiply(...numbers: Array<BigNumberish>): BN {
  return bn(Math.ceil(numbers.reduce<BN>((a, b) => bn(a).mul(b), bn(1)).toNumber()));
}
