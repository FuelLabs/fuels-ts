import type { ResolvedAbiType } from '../../ResolvedAbiType';
import type { TGetCoderFn } from '../../types/IGetCoder';
import type { TEncodingOptions } from '../../types/TEncodingOptions';
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
  const options = {} as TEncodingOptions;

  const getCoderMock = vi.fn(
    (_resolvedAbiType: ResolvedAbiType, _options?: TEncodingOptions) => new MockCoder()
  ) as TGetCoderFn;

  it('gets coders', () => {
    const result = getCoders(components, { ...options, getCoder: getCoderMock });

    expect(result).toEqual({ mock: expect.any(MockCoder) });
  });
});
