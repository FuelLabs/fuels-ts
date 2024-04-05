/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { Address } from '@fuel-ts/address';
import { BN } from '@fuel-ts/math';
import { hexlify } from '@fuel-ts/utils';
import { clone } from 'ramda';

// When parsing a Transaction to JSON we need
// to convert special types into each respective
// JSON friendly value. This enables a tx to be
// stringified and parsed back into a Transaction
/** @hidden */
function normalize(object: any) {
  Object.keys(object).forEach((key) => {
    const obj = object[key];

    switch (true) {
      case obj instanceof BN:
        object[key] = obj.toHex();
        break;
      case obj instanceof Address:
        object[key] = obj.toB256();
        break;
      case obj instanceof Uint8Array:
        object[key] = hexlify(obj);
        break;
      case Array.isArray(obj):
        object[key] = normalize(obj);
        break;
      case obj instanceof Object:
        object[key] = normalize(obj);
        break;
      default:
        break;
    }
  });
  return object;
}

/**
 * Stringify Transaction to a JSON object
 * compatible with the Transaction class constructor.
 */
/** @hidden */
export function normalizeJSON(root: any) {
  // Do a single deep clone before normalizing
  // to avoid mutating the original object
  // and doing extra clones on each iteration
  return normalize(clone(root));
}
