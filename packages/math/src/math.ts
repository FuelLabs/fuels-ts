import { toNumber } from './convert';

export function max(...numbers: Array<bigint>) {
  return BigInt(Math.max(...numbers.map((n) => toNumber(n))));
}

export function multiply(...numbers: Array<bigint | number>) {
  return BigInt(Math.ceil(numbers.reduce<number>((a, b) => Number(a) * Number(b), 1)));
}
