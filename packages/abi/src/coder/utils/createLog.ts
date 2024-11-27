import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import type { AbiLoggedType } from '../../parser';
import type { AbiCoderLog, DecodedValue } from '../abi-coder-types';
import type { AbiEncoding } from '../encoding/encoding';

export const makeLog = (loggedType: AbiLoggedType, encoding: AbiEncoding): AbiCoderLog => {
  const loggedTypeCoder = encoding.getCoder(loggedType);
  return {
    logId: loggedType.logId,
    decode: (data: BytesLike): DecodedValue => {
      const bytes = arrayify(data);
      return loggedTypeCoder.decode(bytes) as DecodedValue;
    },
  };
};
