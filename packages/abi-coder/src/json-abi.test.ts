import { isReferenceType } from './json-abi';

describe('JSON ABI', () => {
  it.each(['u8', 'u16', 'u32', 'u64', 'bool'])(
    `should return false when it's not reference type`,
    (type) => {
      expect(isReferenceType(type)).toBeFalsy();
    }
  );
  it.each(['str[3]', 'b256', '[str[3]; 3]', 'struct MyStruct', 'enum MyEnum'])(
    `should return true when it's reference type`,
    (type) => {
      expect(isReferenceType(type)).toBeTruthy();
    }
  );
});
