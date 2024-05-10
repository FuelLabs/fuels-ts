import { safeExec } from '@fuel-ts/errors/test-utils';

import { normalizeString } from './normalizeString';

/**
 * @group node
 * @group browser
 */
describe('normalize.ts', () => {
  test('should normalize strings', () => {
    expect(normalizeString('DsToken')).toEqual('DsToken');
    expect(normalizeString('test')).toEqual('Test');
    expect(normalizeString('ds-token')).toEqual('DsToken');
    expect(normalizeString('ds_token')).toEqual('DsToken');
    expect(normalizeString('Aaa_bbb_CCDD-EEE')).toEqual('AaaBbbCCDDEEE');
    expect(normalizeString('ds token')).toEqual('DsToken');
    expect(normalizeString('name.abi')).toEqual('NameAbi');
    expect(normalizeString('1234name.abi')).toEqual('NameAbi');
    expect(normalizeString('ERC20.abi')).toEqual('ERC20Abi');
    expect(normalizeString('my-contract')).toEqual('MyContract');
    expect(normalizeString('my contract')).toEqual('MyContract');
    expect(normalizeString('my.contract')).toEqual('MyContract');
    expect(normalizeString('still-my.contract')).toEqual('StillMyContract');
    expect(normalizeString('also my.contract')).toEqual('AlsoMyContract');
  });

  test('should throw if name can\t be normalized', async () => {
    const fn = () => normalizeString('');
    const { error, result } = await safeExec(fn);
    expect(error).toBeTruthy();
    expect(result).toBeFalsy();
  });
});
