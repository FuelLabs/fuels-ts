import { bn } from './bn';
import { toHex } from './convert';

export function max(...numbers: Array<string | number>): string {
  const maxBn = numbers.reduce((prev, cur) => (bn(cur).gt(prev) ? bn(cur) : prev), bn(0));

  return toHex(maxBn);
}

export function multiply(...numbers: Array<string | number>): string {
  return toHex(Math.ceil(numbers.reduce<number>((a, b) => Number(a) * Number(b), 1)));
}
