import { ENCODING_V0, ENCODING_V1 } from '../../utils/constants';

import { getCoder as getCoderV0 } from './getCoderV0';
import { getCoder as getCoderV1 } from './getCoderV1';
import { getEncodingStrategy } from './getEncodingStrategy';

describe('getEncodingStrategy', () => {
  it('defaults to encoding version 0', () => {
    const result = getEncodingStrategy();
    expect(result.getCoder).toBe(getCoderV0);
  });

  it('returns getCoderV1 for encoding version 1', () => {
    const result = getEncodingStrategy(ENCODING_V1);
    expect(result.getCoder).toBe(getCoderV1);
  });

  it('returns getCoderV0 for encoding version 0', () => {
    const result = getEncodingStrategy(ENCODING_V0);
    expect(result.getCoder).toBe(getCoderV0);
  });

  it('throws for an unsupported encoding version', () => {
    expect(() => getEncodingStrategy('2')).toThrowError('Encoding version 2 is unsupported.');
  });
});
