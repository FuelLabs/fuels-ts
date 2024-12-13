import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import type { AbiConcreteType, AbiTypeComponent } from '../../parser';
import type { AbiCoderType } from '../abi-coder-types';
import type { AbiEncoding } from '../encoding';
import type { DecodedValue } from '../encoding/encoding-types';

export function createType(
  type: AbiConcreteType | AbiTypeComponent['type'],
  encoding: AbiEncoding
): AbiCoderType {
  const coder = encoding.getCoder({ type });
  return {
    encode: coder.encode,
    decode: (data: BytesLike): DecodedValue => {
      const bytes = arrayify(data);
      const [decoded] = coder.decode(bytes);
      return decoded as DecodedValue;
    },
  };
}
