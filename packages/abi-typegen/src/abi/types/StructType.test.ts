import { spy } from 'sinon';

import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import * as parseTypeArgumentsMod from '../helpers/parseTypeArguments';
import { makeType } from '../helpers/types';

import { StructType } from './StructType';
import { U16Type } from './U16Type';

describe('StructType.js', () => {
  /*
    Test helpers.

    This is the equivalent Sway contract for the JSON `rawTypes` below it:

      struct A <T, U>{
        t: T,
        u: U
      }

      struct B <T>{
        t: T
      }

      struct C {
        b: A<B<u8>, u16>,
      }


      abi MyContract {
        fn single_params(c: C) -> u8;
      }

      impl MyContract for Contract {
        fn single_params(c: C) -> u8 {
          1
        }
      }

  */
  const rawTypes = [
    {
      typeId: 0,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'generic U',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 2,
      type: 'struct A',
      components: [
        {
          name: 't',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'u',
          type: 1,
          typeArguments: null,
        },
      ],
      typeParameters: [0, 1],
    },
    {
      typeId: 3,
      type: 'struct B',
      components: [
        {
          name: 't',
          type: 0,
          typeArguments: null,
        },
      ],
      typeParameters: [0],
    },
    {
      typeId: 4,
      type: 'struct C',
      components: [
        {
          name: 'b',
          type: 2,
          typeArguments: [
            {
              name: '',
              type: 3,
              typeArguments: [
                {
                  name: '',
                  type: 6,
                  typeArguments: null,
                },
              ],
            },
            {
              name: '',
              type: 5,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 5,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 6,
      type: 'u8',
      components: null,
      typeParameters: null,
    },
  ];

  /*
    Tests
  */
  test('should properly parse type attributes', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => {
      const type = makeType({ rawAbiType });
      type.parseComponentsAttributes({ types: [] });
      return type;
    });

    const suitableForStruct = StructType.isSuitableFor({ type: StructType.swayTypeExample });
    const suitableForU16 = StructType.isSuitableFor({ type: U16Type.swayTypeExample });

    expect(suitableForStruct).toEqual(true);
    expect(suitableForU16).toEqual(false);

    // validating `struct C`, with nested `typeArguments`
    parseTypeArguments.resetHistory();
    const c = types.find((t) => t.rawAbiType.typeId === 4) as StructType;

    expect(c.getStructName()).toEqual('C');
    expect(c.getStructDeclaration({ types })).toEqual('');
    expect(c.attributes.structName).toEqual('C');
    expect(c.attributes.inputLabel).toEqual('C');
    expect(c.attributes.outputLabel).toEqual('C');
    expect(c.getStructContents({ types })).toEqual('b: A<B<BigNumberish>, BigNumberish>'); // nested `typeArguments`

    expect(parseTypeArguments.callCount).toEqual(1); // called once

    // validating `struct A`, with multiple `typeParameters` (generics)
    const a = types.find((t) => t.rawAbiType.typeId === 2) as StructType;
    parseTypeArguments.resetHistory();

    expect(a.getStructName()).toEqual('A');
    expect(a.getStructDeclaration({ types })).toEqual('<T, U>'); // <— `typeParameters`
    expect(a.attributes.structName).toEqual('A');
    expect(a.attributes.inputLabel).toEqual('A');
    expect(a.attributes.outputLabel).toEqual('A');
    expect(a.getStructContents({ types })).toEqual('t: T, u: U');

    expect(parseTypeArguments.callCount).toEqual(0); // never called
  });
});
