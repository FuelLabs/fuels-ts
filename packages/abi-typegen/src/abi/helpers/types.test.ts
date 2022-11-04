import { executeAndCatch } from '../../../test/utils/executeAndCatch';
import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';

import { makeType, parseTypes, shouldSkipAbiType, supportedTypes } from './types';

describe('types.ts', () => {
  /*
    Method: shouldSkipAbiType
  */
  test('should always skip these types', () => {
    expect(shouldSkipAbiType({ type: '()' })).toEqual(true);
    expect(shouldSkipAbiType({ type: 'struct RawVec' })).toEqual(true);
  });

  test('should never skip known types', () => {
    supportedTypes.forEach((st) => {
      const type = st.swayTypeExample;
      const shouldSkip = shouldSkipAbiType({ type });
      expect(shouldSkip).toEqual(false);
    });
  });

  /*
    Method: makeType
  */
  test('should create a new Type instance just fine', () => {
    const rawAbiType: IRawAbiTypeRoot = {
      typeId: 1,
      type: 'u64',
      components: null,
      typeParameters: null,
    };
    expect(makeType({ rawAbiType })).toBeTruthy;
  });

  test('should throw for unsupported types', async () => {
    const rawAbiType: IRawAbiTypeRoot = {
      typeId: 1,
      type: 'non existent',
      components: null,
      typeParameters: null,
    };

    const expectedErrorMsg = `Type not supported: ${rawAbiType.type}`;

    const fn = () => makeType({ rawAbiType });
    const { error, result } = await executeAndCatch<Error>(fn);

    expect(result).toBeFalsy;
    expect(error?.message).toEqual(expectedErrorMsg);
  });

  /*
    Method: parseTypes
  */
  test('should parse an array of raw abi types', async () => {
    const rawU8: IRawAbiTypeRoot = {
      typeId: 1,
      type: 'u64',
      components: null,
      typeParameters: null,
    };

    const rawStr: IRawAbiTypeRoot = {
      typeId: 2,
      type: 'str[2]',
      components: null,
      typeParameters: null,
    };

    const rawVec: IRawAbiTypeRoot = {
      typeId: 1,
      type: 'struct RawVec', // this one should be skipped
      components: null,
      typeParameters: null,
    };

    const rawAbiTypes = [rawU8, rawStr, rawVec];
    const types = parseTypes({ rawAbiTypes });

    expect(types).toBeTruthy;
    expect(types.length).toEqual(2);

    // this is to ensure that the method `parseComponentsAttributes`
    // was called inside the `parseTypes` forEach loop
    types.forEach((t) => {
      expect(t.attributes.inputLabel).not.toEqual('unknown');
      expect(t.attributes.outputLabel).not.toEqual('unknown');
    });
  });
});
