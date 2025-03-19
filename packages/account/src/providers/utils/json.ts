/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { hexlify } from '@fuel-ts/utils';
import { clone } from 'ramda';

// When parsing a Transaction to JSON we need
// to convert special types into each respective
// JSON friendly value. This enables a tx to be
// stringified and parsed back into a Transaction
/** @hidden */
function normalize(object: any) {
  Object.keys(object).forEach((key) => {
    /**
     * Classes get transformed by `tsup` into:
     *  `var Address = class _Address`
     *
     * Therefore we need to strip of the `_` prefix
     * to get the actual class name.
     */
    switch (object[key]?.constructor.name.replace(/^_/, '')) {
      case 'Uint8Array':
        object[key] = hexlify(object[key]);
        break;
      case 'Array':
        object[key] = normalize(object[key]);
        break;
      case 'BN':
        object[key] = object[key].toHex();
        break;
      case 'Address':
        object[key] = object[key].toB256();
        break;
      case 'Object':
        object[key] = normalize(object[key]);
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
