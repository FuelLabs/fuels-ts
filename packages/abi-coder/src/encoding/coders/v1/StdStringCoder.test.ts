import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { StdStringCoder } from './StdStringCoder';

/**
 * @group node
 * @group browser
 */
describe('StdStringCoder', () => {
  const coder = new StdStringCoder();

  it('throws when encoding a std string', async () => {
    await expectToThrowFuelError(
      () => coder.encode('fuel'),
      new FuelError(ErrorCode.ENCODE_ERROR, 'StdString encode unsupported in v1')
    );
  });

  it('decodes a string', () => {
    const input = [0, 0, 0, 0, 0, 0, 0, 4, 102, 117, 101, 108];
    const expected = 'fuel';
    const [actual, newOffset] = coder.decode(new Uint8Array(input), 0);

    expect(actual).toStrictEqual(expected);
    expect(newOffset).toEqual(12);
  });

  it('throws when decoding a string with empty bytes', async () => {
    const input = new Uint8Array([0, 0]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid std string data size.')
    );
  });

  it('throws when decoding a string with empty byte data', async () => {
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255, 1]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid std string byte data size.')
    );
  });
});
