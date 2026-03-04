import { Address } from '../../src/address';

export function generateAccounts(total: number) {
  return new Array(total).fill(0).map(() => Address.fromRandom().toString());
}
