import { safeExec } from '../test/safeExec';

import { normalizeFileName } from './normalizeFileName';

describe('normalizeFileName.ts', () => {
  test('should normalize file names', () => {
    expect(normalizeFileName('DsToken')).toEqual('DsToken');
    expect(normalizeFileName('test')).toEqual('Test');
    expect(normalizeFileName('ds-token')).toEqual('DsToken');
    expect(normalizeFileName('ds_token')).toEqual('DsToken');
    expect(normalizeFileName('Aaa_bbb_CCDD-EEE')).toEqual('AaaBbbCCDDEEE');
    expect(normalizeFileName('ds token')).toEqual('DsToken');
    expect(normalizeFileName('name.abi')).toEqual('NameAbi');
    expect(normalizeFileName('1234name.abi')).toEqual('NameAbi');
    expect(normalizeFileName('ERC20.abi')).toEqual('ERC20Abi');
    expect(normalizeFileName('my-contract')).toEqual('MyContract');
    expect(normalizeFileName('my contract')).toEqual('MyContract');
    expect(normalizeFileName('my.contract')).toEqual('MyContract');
    expect(normalizeFileName('still-my.contract')).toEqual('StillMyContract');
    expect(normalizeFileName('also my.contract')).toEqual('AlsoMyContract');
  });

  test('should throw if name can\t be normalized', async () => {
    const fn = () => normalizeFileName('');
    const { error, result } = await safeExec(fn);
    expect(error).toBeTruthy();
    expect(result).toBeFalsy();
  });
});
