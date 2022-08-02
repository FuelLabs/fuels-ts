import { hexlify } from '@ethersproject/bytes';

import FunctionFragment from './fragments/function-fragment';
import { ParamType } from './fragments/param-type';
import Interface from './interface';

describe('Interface', () => {
  const jsonFragment = {
    type: 'function',
    inputs: [{ name: 'arg', type: 'u64' }],
    name: 'entry_one',
    outputs: [],
  };
  const fragment = FunctionFragment.fromObject(jsonFragment);
  let functionInterface: Interface;

  it('encodes the function name', () => {
    let encoded = Interface.getSighash('entry_one(u64)');
    expect(hexlify(encoded)).toEqual('0x000000000c36cb9c');
    encoded = Interface.getSighash(fragment);
    expect(hexlify(encoded)).toEqual('0x000000000c36cb9c');
  });

  it('encodes a function with two params', () => {
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
    const fragmentTwoParams = FunctionFragment.fromObject(jsonFragmentTwoParams);
    const functionInterfaceTwoParams = new Interface([
      jsonFragmentTwoParams,
      jsonFragmentTwoParams,
    ]);
    let encoded = Interface.getSighash('sum(u64,u64)');
    expect(hexlify(encoded)).toEqual('0x00000000e6af18d7');
    encoded = Interface.getSighash(fragmentTwoParams);
    expect(hexlify(encoded)).toEqual('0x00000000e6af18d7');
    encoded = functionInterfaceTwoParams.encodeFunctionData('sum', [42, 34]);
    expect(hexlify(encoded)).toEqual(
      '0x00000000e6af18d70000000000000001000000000000002a0000000000000022'
    );
  });

  it('encodes a function with two params (u64, struct)', () => {
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
    const fragmentTwoParams = FunctionFragment.fromObject(jsonFragmentTwoParams);
    const functionInterfaceTwoParams = new Interface([
      jsonFragmentTwoParams,
      jsonFragmentTwoParams,
    ]);
    expect(fragmentTwoParams.getInputsSighash()).toBe('sum_test(s(u64,u64))');
    let encoded = Interface.getSighash('sum_test(s(u64,u64))');
    expect(hexlify(encoded)).toEqual('0x00000000fd5ec586');
    encoded = Interface.getSighash(fragmentTwoParams);
    expect(hexlify(encoded)).toEqual('0x00000000fd5ec586');
    encoded = functionInterfaceTwoParams.encodeFunctionData('sum_test', [
      {
        foo: 42,
        bar: 2,
      },
    ]);
    expect(hexlify(encoded)).toEqual(
      '0x00000000fd5ec5860000000000000001000000000000002a0000000000000002'
    );
  });

  it('removes duplicates if function signatures are repeated', () => {
    functionInterface = new Interface([jsonFragment, jsonFragment]);
    expect(Object.values(functionInterface.functions)).toHaveLength(1);
  });

  it('can retreive a fragment', () => {
    functionInterface = new Interface([jsonFragment]);

    expect(Object.values(functionInterface.functions)).toHaveLength(1);

    expect(functionInterface.getFunction('entry_one(u64)')).toEqual(fragment);
    expect(functionInterface.getFunction('entry_one')).toEqual(fragment);
    expect(functionInterface.getFunction('0x000000000c36cb9c')).toEqual(fragment);
  });

  it('can encode and decode function data with simple values', () => {
    functionInterface = new Interface([jsonFragment]);
    expect(hexlify(functionInterface.encodeFunctionData('entry_one', [42]))).toEqual(
      '0x000000000c36cb9c0000000000000000000000000000002a'
    );
    const decoded = functionInterface.decodeFunctionData(
      'entry_one',
      '0x000000000c36cb9c0000000000000000000000000000002a'
    );
    expect(decoded.length).toEqual(1);
    expect(decoded[0]).toEqual(42n);
  });
  it('can calculate the correct sighash for array string values', () => {
    const fnFragment = FunctionFragment.fromObject({
      type: 'function',
      inputs: [
        {
          name: 'arg',
          type: '[s[3]; 3]',
          components: [
            {
              name: '__array_element',
              type: 's[3]',
            },
          ],
        },
      ],
      name: 'takes_array',
      outputs: [
        {
          name: '',
          type: '[s[3]; 2]',
          components: [
            {
              name: '__array_element',
              type: 's[3]',
            },
          ],
        },
      ],
    });

    expect(fnFragment.getInputsSighash()).toBe('takes_array(a[s[3];3])');
    const sighash = Interface.getSighash(fnFragment);
    expect(hexlify(sighash)).toEqual('0x00000000b80a1c57');
  });

  it('can calculate the correct sighash for array of u64 values', () => {
    const fnFragment = FunctionFragment.fromObject({
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

    expect(fnFragment.getInputsSighash()).toBe('takes_array(a[u16;3])');
    const sighash = Interface.getSighash(fnFragment);
    expect(hexlify(sighash)).toEqual('0x00000000101cbeb5');
  });

  it('can calculate the correct sighash for enum', () => {
    const fnFragment = FunctionFragment.fromObject({
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

    expect(fnFragment.getInputsSighash()).toBe('take_enum(e(bool,bool))');
    const sighash = Interface.getSighash(fnFragment);
    expect(hexlify(sighash)).toEqual('0x00000000424d6522');
  });

  it('can encode and decode function data with array values', () => {
    functionInterface = new Interface([
      {
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
      },
    ]);
    expect(hexlify(functionInterface.encodeFunctionData('takes_array', [[1, 2, 3]]))).toEqual(
      '0x00000000101cbeb50000000000000001000000000000000100000000000000020000000000000003'
    );
  });

  // TODO: Enable this test when zero arg functions are supported
  it('can encode and decode function data with empty values', () => {
    functionInterface = new Interface([
      { type: 'function', inputs: [], name: 'entry_one', outputs: [] },
    ]);
    expect(hexlify(functionInterface.encodeFunctionData('entry_one', []))).toEqual(
      '0x000000008a521397'
    );
    expect(functionInterface.decodeFunctionData('entry_one', '0x000000008a521397')).toEqual(
      undefined
    );
  });

  it('raises an error if the function is not found', () => {
    functionInterface = new Interface([jsonFragment]);
    expect(() => functionInterface.encodeFunctionData('entry_two', [42])).toThrow(
      'function entry_two not found'
    );
    expect(() =>
      functionInterface.decodeFunctionData('entry_two', '0x00000000000000000000000000000000')
    ).toThrow('function entry_two not found');
  });

  it('raises an error if the arguments do not match the function input types', () => {
    expect(() => functionInterface.encodeFunctionData('entry_one', [11, 11])).toThrow(
      'Types/values length mismatch'
    );
    expect(() =>
      functionInterface.decodeFunctionData('entry_one', '0x1111111111111111000000000000002a')
    ).toThrow('data signature does not match function entry_one');
  });

  it('can encode struct', () => {
    functionInterface = new Interface([
      {
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
      },
    ]);

    expect(functionInterface.getFunction('entry_one').getInputsSighash()).toEqual(
      'entry_one(u64,s(bool,u64))'
    );
  });

  it('can encode array of structs', () => {
    functionInterface = new Interface([
      {
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
      },
    ]);

    expect(functionInterface.getFunction('entry_one').getInputsSighash()).toEqual(
      'entry_one(a[s(str[3],e(u64,bool,bool));3])'
    );
  });

  it('can encode struct with dynamic typing', () => {
    functionInterface = new Interface([
      {
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
      },
    ]);

    expect(functionInterface.getFunction('entry_one').getInputsSighash()).toEqual(
      'entry_one(u64,s<b256,bool>(bool,u64))'
    );
  });

  it('can encode array of structs with dynamic typing', () => {
    functionInterface = new Interface([
      {
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
      },
    ]);

    expect(functionInterface.getFunction('entry_one').getInputsSighash()).toEqual(
      'entry_one(a[s<str[3],bool>(str[3],e<bool>(u64,bool,bool));3])'
    );
  });
});
