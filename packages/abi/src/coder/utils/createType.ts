import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import type { AbiType } from '../../parser';
import type { AbiCoderType, DecodedValue } from '../abi-coder-types';
import type { AbiEncoding } from '../encoding';

export function makeType(type: AbiType, encoding: AbiEncoding): AbiCoderType {
  const coder = encoding.getCoder({ type });
  return {
    encode: coder.encode,
    decode: (data: BytesLike): DecodedValue => coder.decode(arrayify(data)) as DecodedValue,
  };
}
