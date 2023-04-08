import FunctionFragment, { parseFunctionSelector } from './function-fragment';

describe('FunctionFragment', () => {
  describe('function with one param (u64)', () => {
    const fragment = FunctionFragment.fromObject({
      type: 'function',
      inputs: [{ name: 'arg', type: 'u64' }],
      name: 'entry_one',
      outputs: [],
    });

    const functionSignature = 'entry_one(u64)';
    const functionSelector = '0x000000000c36cb9c';

    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });
  });

  describe('function with two params (u64,u64)', () => {
    const jsonFragmentTwoParams = {
      type: 'function',
      inputs: [
        { name: 'a', type: 'u64' },
        { name: 'b', type: 'u64' },
      ],
      name: 'sum',
      outputs: [
        {
          name: '',
          type: 'u64',
        },
      ],
    };
    const fragment = FunctionFragment.fromObject(jsonFragmentTwoParams);

    const functionSignature = 'sum(u64,u64)';
    const functionSelector = '0x00000000e6af18d7';

    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });
  });

  describe('function with one param (struct)', () => {
    const jsonFragmentTwoParams = {
      type: 'function',
      inputs: [
        {
          name: 'test',
          type: 'struct Test',
          components: [
            {
              name: 'foo',
              type: 'u64',
            },
            {
              name: 'bar',
              type: 'u64',
            },
          ],
        },
      ],
      name: 'sum_test',
      outputs: [
        {
          name: '',
          type: 'u64',
        },
      ],
    };
    const fragment = FunctionFragment.fromObject(jsonFragmentTwoParams);

    const functionSignature = 'sum_test(s(u64,u64))';
    const functionSelector = '0x00000000fd5ec586';

    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });
  });

  describe('function with one param (array of strings)', () => {
    const fragment = FunctionFragment.fromObject({
      type: 'function',
      inputs: [
        {
          name: 'arg',
          type: '[str[3]; 3]',
          components: [
            {
              name: '__array_element',
              type: 'str[3]',
            },
          ],
        },
      ],
      name: 'takes_array',
      outputs: [
        {
          name: '',
          type: '[str[3]; 2]',
          components: [
            {
              name: '__array_element',
              type: 'str[3]',
            },
          ],
        },
      ],
    });
    const functionSignature = 'takes_array(a[str[3];3])';
    const functionSelector = '0x00000000f152ad85';

    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });
  });

  describe('function with one param (array of u64)', () => {
    const fragment = FunctionFragment.fromObject({
      type: 'function',
      inputs: [
        {
          name: 'arg',
          type: '[u16; 3]',
          components: [
            {
              name: '__array_element',
              type: 'u16',
            },
          ],
        },
      ],
      name: 'takes_array',
      outputs: [
        {
          name: '',
          type: '[u16; 2]',
          components: [
            {
              name: '__array_element',
              type: 'u16',
            },
          ],
        },
      ],
    });
    const functionSignature = 'takes_array(a[u16;3])';
    const functionSelector = '0x00000000101cbeb5';
    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });

    it('should encode data', () => {
      // TODO: this test needs to be included again after refactor (remove workaround boolean from encoded value)
    });
  });

  describe('function with one param (enum)', () => {
    const fragment = FunctionFragment.fromObject({
      type: 'function',
      inputs: [
        {
          name: 'enum_arg',
          type: 'enum TestEnum',
          components: [
            {
              name: 'Value',
              type: 'bool',
              components: null,
            },
            {
              name: 'Data',
              type: 'bool',
              components: null,
            },
          ],
        },
      ],
      name: 'take_enum',
      outputs: [
        {
          name: '',
          type: 'bool',
          components: null,
        },
      ],
    });
    const functionSignature = 'take_enum(e(bool,bool))';
    const functionSelector = '0x00000000424d6522';

    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });

    it('should encode data', () => {
      // TODO: this test needs to be included again after refactor (remove workaround boolean from encoded value)
    });
  });

  describe('function with two params (u64,struct)', () => {
    const fragment = FunctionFragment.fromObject({
      type: 'function',
      name: 'entry_one',
      inputs: [
        {
          name: 'my_u64',
          type: 'u64',
        },
        {
          name: 'my_struct',
          type: 'struct MyStruct',
          components: [
            {
              name: 'dummy_a',
              type: 'bool',
            },
            {
              name: 'dummy_b',
              type: 'u64',
            },
          ],
        },
      ],
      outputs: [{ name: 'ret', type: 'u64' }],
    });
    const functionSignature = 'entry_one(u64,s(bool,u64))';
    const functionSelector = '0x0000000091bc8061';

    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });

    it('should encode data', () => {
      // TODO: this test needs to be included again after refactor (remove workaround boolean from encoded value)
    });
  });

  describe('function with one param (array of structs)', () => {
    const fragment = FunctionFragment.fromObject({
      type: 'function',
      name: 'entry_one',
      inputs: [
        {
          name: 'arg1',
          type: '[struct MyStruct; 3]',
          components: [
            {
              name: '__array_element',
              type: 'struct MyStruct',
              components: [
                {
                  name: 'bim',
                  type: 'str[3]',
                  components: null,
                  typeArguments: null,
                },
                {
                  name: 'bam',
                  type: 'enum MyEnum',
                  components: [
                    {
                      name: 'Foo',
                      type: 'u64',
                      components: null,
                      typeArguments: null,
                    },
                    {
                      name: 'Bar',
                      type: 'bool',
                      components: null,
                      typeArguments: null,
                    },
                    {
                      name: 'Din',
                      type: 'bool',
                      components: null,
                      typeArguments: null,
                    },
                  ],
                  typeArguments: null,
                },
              ],
              typeArguments: null,
            },
          ],
          typeArguments: null,
        },
      ],
      outputs: [
        {
          name: '',
          type: 'str[3]',
          components: null,
          typeArguments: null,
        },
      ],
    });
    const functionSignature = 'entry_one(a[s(str[3],e(u64,bool,bool));3])';
    const functionSelector = '0x00000000f0f9c792';

    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });

    it('should encode data', () => {
      // TODO: this test needs to be included again after refactor (remove workaround boolean from encoded value)
    });
  });

  describe('function with two params (u64, struct) and dynamic typing', () => {
    const fragment = FunctionFragment.fromObject({
      type: 'function',
      name: 'entry_one',
      inputs: [
        {
          name: 'my_u64',
          type: 'u64',
        },
        {
          name: 'my_struct',
          type: 'struct MyStruct',
          components: [
            {
              name: 'dummy_a',
              type: 'bool',
            },
            {
              name: 'dummy_b',
              type: 'u64',
            },
          ],
          typeArguments: [
            {
              name: 'T',
              type: 'b256',
            },
            {
              name: 'U',
              type: 'bool',
            },
          ],
        },
      ],
      outputs: [{ name: 'ret', type: 'u64' }],
    });
    const functionSignature = 'entry_one(u64,s<b256,bool>(bool,u64))';
    const functionSelector = '0x00000000ab1615ee';

    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });

    it('should encode data', () => {
      // TODO: this test needs to be included again after refactor (remove workaround boolean from encoded value)
    });
  });

  describe('function with one param (array of structs) and dynamic typing', () => {
    const fragment = FunctionFragment.fromObject({
      type: 'function',
      name: 'entry_one',
      inputs: [
        {
          name: 'arg1',
          type: '[struct MyStruct; 3]',
          components: [
            {
              name: '__array_element',
              type: 'struct MyStruct',
              components: [
                {
                  name: 'bim',
                  type: 'str[3]',
                  components: null,
                  typeArguments: null,
                },
                {
                  name: 'bam',
                  type: 'enum MyEnum',
                  components: [
                    {
                      name: 'Foo',
                      type: 'u64',
                      components: null,
                      typeArguments: null,
                    },
                    {
                      name: 'Bar',
                      type: 'bool',
                      components: null,
                      typeArguments: null,
                    },
                    {
                      name: 'Din',
                      type: 'bool',
                      components: null,
                      typeArguments: null,
                    },
                  ],
                  typeArguments: [
                    {
                      name: 'V',
                      type: 'bool',
                      components: null,
                      typeArguments: null,
                    },
                  ],
                },
              ],
              typeArguments: [
                {
                  name: 'T',
                  type: 'str[3]',
                  components: null,
                  typeArguments: null,
                },
                {
                  name: 'U',
                  type: 'bool',
                  components: null,
                  typeArguments: null,
                },
              ],
            },
          ],
          typeArguments: null,
        },
      ],
      outputs: [
        {
          name: '',
          type: 'str[3]',
          components: null,
          typeArguments: null,
        },
      ],
    });
    const functionSignature = 'entry_one(a[s<str[3],bool>(str[3],e<bool>(u64,bool,bool));3])';
    const functionSelector = '0x0000000021b41041';

    it('should get correct signature / selector', () => {
      expect(fragment.getSignature()).toBe(functionSignature);
      expect(parseFunctionSelector(functionSignature)).toEqual(functionSelector);
      expect(fragment.getSelector()).toEqual(functionSelector);
    });

    it('should encode data', () => {
      // TODO: this test needs to be included again after refactor (remove workaround boolean from encoded value)
    });
  });
});
