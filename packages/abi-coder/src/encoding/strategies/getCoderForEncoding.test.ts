import type { EncodingVersion } from '../../utils/constants';
import { ENCODING_V1 } from '../../utils/constants';

import { getCoderForEncoding } from './getCoderForEncoding';
import { getCoder as getCoderV1 } from './getCoderV1';

/**
 * @group node
 * @group browser
 */
describe('getEncodingStrategy', () => {
  it('defaults to encoding version 1', () => {
    expect(getCoderForEncoding()).toBe(getCoderV1);
  });

  it('returns getCoderV1 for encoding version 1', () => {
    expect(getCoderForEncoding(ENCODING_V1)).toBe(getCoderV1);
  });

  it('throws for an unsupported encoding version', () => {
    expect(() => getCoderForEncoding('2' as EncodingVersion)).toThrowError(
      'Encoding version 2 is unsupported.'
    );
  });
});
