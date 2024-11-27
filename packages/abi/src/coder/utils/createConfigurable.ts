import type { AbiConfigurable } from '../../parser';
import type { AbiCoderConfigurable } from '../abi-coder-types';
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
  };
};
