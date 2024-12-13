import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import type { AbiLoggedType } from '../../parser';
import type { AbiCoderLog } from '../abi-coder-types';
import type { AbiEncoding } from '../encoding';
import type { DecodedValue } from '../encoding/encoding-types';

export const createLog = (loggedType: AbiLoggedType, encoding: AbiEncoding): AbiCoderLog => {
  const loggedTypeCoder = encoding.getCoder(loggedType);
  return {
    logId: loggedType.logId,
    encode: loggedTypeCoder.encode,
    decode: (data: BytesLike): DecodedValue => {
      const bytes = arrayify(data);
      const [decoded] = loggedTypeCoder.decode(bytes);
      return decoded as DecodedValue;
    },
  };
};
