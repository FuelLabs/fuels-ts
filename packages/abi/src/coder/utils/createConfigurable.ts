import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import type { AbiConfigurable } from '../../parser';
import type { AbiCoderConfigurable, DecodedValue } from '../abi-coder-types';
import type { AbiEncoding } from '../encoding/encoding';

export const makeConfigurable = (
  configurable: AbiConfigurable,
  encoding: AbiEncoding
): AbiCoderConfigurable => {
  const configurableCoder = encoding.getCoder(configurable);
  return {
    name: configurable.name,
    offset: configurable.offset,
    encode: configurableCoder.encode,
    decode: (data: BytesLike): DecodedValue => {
      const bytes = arrayify(data);
      return configurableCoder.decode(bytes) as DecodedValue;
    },
  };
};
