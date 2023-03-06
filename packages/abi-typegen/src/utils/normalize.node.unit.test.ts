import { executeAndCatch } from '../../test/utils/executeAndCatch';

import { normalizeName } from './normalize';

describe('findType.ts', () => {
  test('should find type', () => {
    expect(normalizeName('DsToken')).toEqual('DsToken');
    expect(normalizeName('test')).toEqual('Test');
    expect(normalizeName('ds-token')).toEqual('DsToken');
    expect(normalizeName('ds_token')).toEqual('DsToken');
    expect(normalizeName('Aaa_bbb_CCDD-EEE')).toEqual('AaaBbbCCDDEEE');
    expect(normalizeName('ds token')).toEqual('DsToken');
    expect(normalizeName('name.abi')).toEqual('NameAbi');
    expect(normalizeName('1234name.abi')).toEqual('NameAbi');
    expect(normalizeName('ERC20.abi')).toEqual('ERC20Abi');
    expect(normalizeName('my-contract')).toEqual('MyContract');
    expect(normalizeName('my contract')).toEqual('MyContract');
    expect(normalizeName('my.contract')).toEqual('MyContract');
    expect(normalizeName('still-my.contract')).toEqual('StillMyContract');
    expect(normalizeName('also my.contract')).toEqual('AlsoMyContract');
  });

  test('should throw if name can\t be normalized', async () => {
    const fn = () => normalizeName('');
    const { error, result } = await executeAndCatch(fn);
    expect(error).toBeTruthy();
    expect(result).toBeFalsy();
  });
});
