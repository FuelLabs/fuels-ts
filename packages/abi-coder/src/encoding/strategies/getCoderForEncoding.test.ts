import { ENCODING_V0, ENCODING_V1 } from '../../utils/constants';

import { getCoderForEncoding } from './getCoderForEncoding';
import { getCoder as getCoderV0 } from './getCoderV0';
import { getCoder as getCoderV1 } from './getCoderV1';

/**
 * @group node
 * @group browser
 */
describe('getEncodingStrategy', () => {
  it('defaults to encoding version 0', () => {
    expect(getCoderForEncoding()).toBe(getCoderV0);
  });

  it('returns getCoderV1 for encoding version 1', () => {
    expect(getCoderForEncoding(ENCODING_V1)).toBe(getCoderV1);
  });

  it('returns getCoderV0 for encoding version 0', () => {
    expect(getCoderForEncoding(ENCODING_V0)).toBe(getCoderV0);
  });

  it('throws for an unsupported encoding version', () => {
    expect(() => getCoderForEncoding('2')).toThrowError('Encoding version 2 is unsupported.');
  });
});
