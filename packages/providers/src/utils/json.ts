/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { hexlify } from '@ethersproject/bytes';

// When parsing a Transaction to JSON we need
// to convert special types into each respective
// JSON friendly value. This enables a tx to be
// stringified and parsed back into a Transaction
export function normalizeJSON(root: any) {
  function nomarlize(object: any) {
    Object.keys(object).forEach((key) => {
      switch (object[key].constructor.name) {
        case 'Uint8Array':
          object[key] = hexlify(object[key]);
          break;
        case 'Array':
          object[key] = nomarlize(object[key]);
          break;
        case 'BN':
          object[key] = object[key].toHex();
          break;
        case 'Address':
          object[key] = object[key].toB256();
          break;
        case 'Object':
          object[key] = nomarlize(object[key]);
          break;
        default:
          break;
      }
    });
    return object;
  }
  return nomarlize({ ...root });
}
