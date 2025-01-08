import type { BytesLike } from '@fuel-ts/utils';
import { arrayify } from '@fuel-ts/utils';

import type { AbiConfigurable } from '../../parser';
import type { AbiCoderConfigurable } from '../abi-coder-types';
import type { AbiEncoding, DecodedValue } from '../encoding';

export const createConfigurable = (
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
      const [decodedValue] = configurableCoder.decode(bytes);
      return decodedValue as DecodedValue;
    },
  };
};
