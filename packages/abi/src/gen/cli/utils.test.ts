import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { normalizeProjectName } from './utils';

/**
 * @group node
 */
describe('normalizeProjectName', () => {
  test('should normalize project name', () => {
    expect(normalizeProjectName('DsToken')).toEqual('DsToken');
    expect(normalizeProjectName('test')).toEqual('Test');
    expect(normalizeProjectName('ds-token')).toEqual('DsToken');
    expect(normalizeProjectName('ds_token')).toEqual('DsToken');
    expect(normalizeProjectName('Aaa_bbb_CCDD-EEE')).toEqual('AaaBbbCCDDEEE');
    expect(normalizeProjectName('ds token')).toEqual('DsToken');
    expect(normalizeProjectName('name.abi')).toEqual('NameAbi');
    expect(normalizeProjectName('1234name.abi')).toEqual('NameAbi');
    expect(normalizeProjectName('ERC20.abi')).toEqual('ERC20Abi');
    expect(normalizeProjectName('my-contract')).toEqual('MyContract');
    expect(normalizeProjectName('my contract')).toEqual('MyContract');
    expect(normalizeProjectName('my.contract')).toEqual('MyContract');
    expect(normalizeProjectName('still-my.contract')).toEqual('StillMyContract');
    expect(normalizeProjectName('also my.contract')).toEqual('AlsoMyContract');
  });

  test('throws if name cannot be normalized', async () => {
    await expectToThrowFuelError(
      () => normalizeProjectName(''),
      new FuelError(
        ErrorCode.PARSE_FAILED,
        `The provided string '' results in an empty output after`.concat(
          ` normalization, therefore, it can't normalize string.`
        )
      )
    );
  });
});
