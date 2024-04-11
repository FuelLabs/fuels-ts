import type { BytesLike } from '@fuel-ts/interfaces';
import { getBytes, hexlify } from '@fuel-ts/utils';
import { ripemd160 as noble_ripemd160 } from '@noble/hashes/ripemd160';

let locked = false;

const helper = function (data: Uint8Array): Uint8Array {
  return noble_ripemd160(data);
};

let ripemd: (data: Uint8Array) => BytesLike = helper;

export function ripemd160(_data: BytesLike): string {
  const data = getBytes(_data, 'data');
  return hexlify(ripemd(data));
}
ripemd160._ = helper;
ripemd160.lock = function (): void {
  locked = true;
};
ripemd160.register = function (func: (data: Uint8Array) => BytesLike) {
  if (locked) {
    throw new TypeError('ripemd160 is locked');
  }
  ripemd = func;
};
Object.freeze(ripemd160);
