import type { IRawAbiTypeRoot } from '../types/interfaces/IRawAbiType';

import { parseTypes } from './parseTypes';

/**
 * @group node
 */
describe('types.ts', () => {
  test('should parse an array of raw abi types', () => {
    const rawU8: IRawAbiTypeRoot = {
      typeId: 1,
      type: 'u8',
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
      typeId: 3,
      type: 'struct RawVec',
      components: null,
      typeParameters: null,
    };
    // `rawVec` up here should be skipped

    const rawAbiTypes = [rawU8, rawStr, rawVec];
    const types = parseTypes({ rawAbiTypes });

    expect(types).toBeTruthy();
    expect(types.length).toEqual(2);

    // this is to ensure that the method `parseComponentsAttributes`
    // was called inside the `parseTypes` forEach loop
    types.forEach((t) => {
      expect(t.attributes.inputLabel).not.toEqual('unknown');
      expect(t.attributes.outputLabel).not.toEqual('unknown');
    });
  });
});
