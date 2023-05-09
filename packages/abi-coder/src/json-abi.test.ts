import { jsonFlatAbiMock } from '../test/fixtures/mocks';

import type { JsonAbiFragmentType } from './json-abi';
import { ABI, isPointerType } from './json-abi';

describe('JSON ABI', () => {
  afterEach(jest.restoreAllMocks);

  it.each(['u8', 'u16', 'u32', 'u64', 'bool'])(
    `should return false when it's not reference type`,
    (type) => {
      expect(isPointerType(type)).toBeFalsy();
    }
  );

  it.each(['str[3]', 'b256', '[str[3]; 3]', 'struct MyStruct', 'enum MyEnum'])(
    `should return true when it's reference type`,
    (type) => {
      expect(isPointerType(type)).toBeTruthy();
    }
  );

  it('should ensure `unflattenConfigurables` adds `fragmentType` to each `configurables` entry', () => {
    const abi = new ABI(jsonFlatAbiMock);

    const mockedValue: JsonAbiFragmentType = {
      type: 'dummy',
      name: 'dummy',
      components: null,
      typeArguments: null,
    };

    const spy = jest.spyOn(abi, 'parseInput').mockReturnValue(mockedValue);

    const result = abi.unflattenConfigurables();

    const expected1 = { ...abi.configurables[0], fragmentType: mockedValue };
    const expected2 = { ...abi.configurables[1], fragmentType: mockedValue };

    expect(result[0]).toStrictEqual(expected1);
    expect(result[1]).toStrictEqual(expected2);

    expect(spy).toHaveBeenCalledWith(jsonFlatAbiMock.configurables[0].configurableType);
    expect(spy).toHaveBeenCalledWith(jsonFlatAbiMock.configurables[1].configurableType);

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
