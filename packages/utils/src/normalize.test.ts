import { safeExec } from '../test/safeExec';

import { normalize } from './normalize';

describe('normalizeFileName.ts', () => {
  test('should normalize file names', () => {
    expect(normalize('DsToken')).toEqual('DsToken');
    expect(normalize('test')).toEqual('Test');
    expect(normalize('ds-token')).toEqual('DsToken');
    expect(normalize('ds_token')).toEqual('DsToken');
    expect(normalize('Aaa_bbb_CCDD-EEE')).toEqual('AaaBbbCCDDEEE');
    expect(normalize('ds token')).toEqual('DsToken');
    expect(normalize('name.abi')).toEqual('NameAbi');
    expect(normalize('1234name.abi')).toEqual('NameAbi');
    expect(normalize('ERC20.abi')).toEqual('ERC20Abi');
    expect(normalize('my-contract')).toEqual('MyContract');
    expect(normalize('my contract')).toEqual('MyContract');
    expect(normalize('my.contract')).toEqual('MyContract');
    expect(normalize('still-my.contract')).toEqual('StillMyContract');
    expect(normalize('also my.contract')).toEqual('AlsoMyContract');
  });

  test('should throw if name can\t be normalized', async () => {
    const fn = () => normalize('');
    const { error, result } = await safeExec(fn);
    expect(error).toBeTruthy();
    expect(result).toBeFalsy();
  });
});
