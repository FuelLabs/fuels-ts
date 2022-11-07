import type { IRawAbiTypeComponent, IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';

import { parseTypeArguments } from './parseTypeArguments';
import { makeType } from './types';

/*
  Sample ABI with components in both fashions:
    — WITH and WITHOUT `typeArguments`
*/
const rawTypes: IRawAbiTypeRoot[] = [
  {
    typeId: 0,
    type: 'bool',
    components: null,
    typeParameters: null,
  },
  {
    typeId: 1,
    type: 'generic T',
    components: null,
    typeParameters: null,
  },
  {
    typeId: 2,
    type: 'struct A',
    components: [
      {
        name: 'a',
        type: 1,
        typeArguments: null,
      },
    ],
    typeParameters: [1],
  },
  {
    typeId: 3,
    type: 'struct B',
    components: [
      {
        name: 'b',
        type: 2,
        typeArguments: [
          {
            name: '',
            type: 4,
            typeArguments: null,
          },
        ],
      },
    ],
    typeParameters: null,
  },
  {
    typeId: 4,
    type: 'u8',
    components: null,
    typeParameters: null,
  },
];

describe('parseTypeArguments.js', () => {
  /*
    Test helpers
  */
  function bundleTypes() {
    const types = rawTypes.map((rawAbiType) => {
      const type = makeType({ rawAbiType });

      // injects mocked labels for further validations
      type.attributes = {
        inputLabel: `${type.name}_IN`,
        outputLabel: `${type.name}_OUT`,
      };

      return type;
    });

    return types;
  }

  function getTypeComponents(params: { typeId: number }) {
    const found = rawTypes.find((rt) => rt.typeId === params.typeId);
    return (found as IRawAbiTypeRoot).components as IRawAbiTypeComponent[];
  }

  /*
    Tests
  */
  test('should parse type arguments just fine', async () => {
    const types = bundleTypes();
    const typeArguments = getTypeComponents({ typeId: 2 });

    const asInput = parseTypeArguments({ types, targetMode: 'input', typeArguments });
    const asOutput = parseTypeArguments({ types, targetMode: 'output', typeArguments });

    expect(asInput).toEqual('generic_IN');
    expect(asOutput).toEqual('generic_OUT');
  });

  test('should parse type arguments recursively', async () => {
    const types = bundleTypes();
    const typeArguments = getTypeComponents({ typeId: 3 }); // this has `typeArguments`

    const asInput = parseTypeArguments({ types, targetMode: 'input', typeArguments });
    const asOutput = parseTypeArguments({ types, targetMode: 'output', typeArguments });

    expect(asInput).toEqual('struct_IN<u8_IN>');
    expect(asOutput).toEqual('struct_OUT<u8_OUT>');
  });
});
