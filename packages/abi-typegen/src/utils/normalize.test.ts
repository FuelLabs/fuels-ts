import { executeAndCatch } from '../../test/utils/executeAndCatch';

import { normalizeName } from './normalize';

describe('findType.ts', () => {
  test('should find type', () => {
    expect(normalizeName('my-contract')).toEqual('MyContract');
    expect(normalizeName('my contract')).toEqual('MyContract');
    expect(normalizeName('my.contract')).toEqual('MyContract');
    expect(normalizeName('still-my.contract')).toEqual('StillMyContract');
    expect(normalizeName('also my.contract')).toEqual('AlsoMyContract');
  });

  test('should throw if name can\t be normalized', async () => {
    const fn = () => normalizeName('');
    const { error, result } = await executeAndCatch(fn);
    expect(error).toBeTruthy;
    expect(result).toBeFalsy;
  });
});
