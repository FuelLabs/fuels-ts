import type { ResolvedAbiType } from '../../ResolvedAbiType';
import type { EncodingOptions } from '../../types/EncodingOptions';
import type { GetCoderFn } from '../../types/GetCoder';
import { Coder } from '../coders/AbstractCoder';

import { getCoders } from './getCoders';

const coderName = 'mock';

class MockCoder extends Coder {
  constructor() {
    super(coderName, coderName, 0);
  }

  encode(_value: unknown, _length?: number): Uint8Array {
    return new Uint8Array();
  }

  decode(_data: Uint8Array): [unknown, number] {
    return [{}, 0];
  }
}

/**
 * @group node
 * @group browser
 */
describe('getCoders', () => {
  const components = [{ name: coderName }] as ResolvedAbiType[];
  const options = {} as EncodingOptions;

  const getCoderMock = vi.fn(
    (_resolvedAbiType: ResolvedAbiType, _options?: EncodingOptions) => new MockCoder()
  ) as GetCoderFn;

  it('gets coders', () => {
    const result = getCoders(components, { ...options, getCoder: getCoderMock });

    expect(result).toEqual({ mock: expect.any(MockCoder) });
  });
});
