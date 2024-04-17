import type { BytesLike } from '@fuel-ts/interfaces';
import { getBytes } from '@fuel-ts/utils';
import { ripemd160 as noble_ripemd160 } from '@noble/hashes/ripemd160';

let locked = false;

const helper = (data: Uint8Array): Uint8Array => noble_ripemd160(data);

let ripemd: (data: Uint8Array) => Uint8Array = helper;

export function ripemd160(_data: BytesLike): Uint8Array {
  const data = getBytes(_data, 'data');
  return ripemd(data);
}
ripemd160._ = helper;
ripemd160.lock = (): void => {
  locked = true;
};
ripemd160.register = (func: (data: Uint8Array) => Uint8Array) => {
  if (locked) {
    throw new TypeError('ripemd160 is locked');
  }
  ripemd = func;
};
Object.freeze(ripemd160);
