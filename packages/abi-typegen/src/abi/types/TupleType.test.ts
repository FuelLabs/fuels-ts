import { spy } from 'sinon';

import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import { findType } from '../../utils/findType';
import * as parseTypeArgumentsMod from '../helpers/parseTypeArguments';
import { makeType } from '../helpers/types';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

describe('TupleType.ts', () => {
  /*
    Test helpers.

    This is the equivalent Sway contract for the JSON `rawTypes` below it:

      contract;

      struct A <T, U>{
        t: T,
        u: U
      }

      struct B <T>{
        t: T
      }

      struct C {
        b: (u8, A<B<u64>, str[3]>),
      }


      abi MyContract {
        fn single_param(c: C) -> u8;
        fn tuple_params(x: (u8, A<B<u64>, str[3]>)) -> (u8, A<B<u64>, str[3]>);
      }

      impl MyContract for Contract {
        fn single_param(c: C) -> u8 {
          1
        }

        fn tuple_params(x: (u8, A<B<u64>, str[3]>)) -> (u8, A<B<u64>, str[3]>) {
          x
        }
      }
  */
  const rawTypes = [
    {
      typeId: 0,
      type: '(_, _)',
      components: [
        {
          name: '__tuple_element',
          type: 8,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 4,
          typeArguments: [
            {
              name: '',
              type: 5,
              typeArguments: [
                {
                  name: '',
                  type: 7,
                  typeArguments: null,
                },
              ],
            },
            {
              name: '',
              type: 3,
              typeArguments: null,
            },
          ],
        },
      ],
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
      type: 'generic U',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 3,
      type: 'str[3]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 4,
      type: 'struct A',
      components: [
        {
          name: 't',
          type: 1,
          typeArguments: null,
        },
        {
          name: 'u',
          type: 2,
          typeArguments: null,
        },
      ],
      typeParameters: [1, 2],
    },
    {
      typeId: 5,
      type: 'struct B',
      components: [
        {
          name: 't',
          type: 1,
          typeArguments: null,
        },
      ],
      typeParameters: [1],
    },
    {
      typeId: 6,
      type: 'struct C',
      components: [
        {
          name: 'b',
          type: 0,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 7,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 8,
      type: 'u8',
      components: null,
      typeParameters: null,
    },
  ];

  /*
    Tests
  */
  test('should properly parse type attributes', () => {
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForTuple = TupleType.isSuitableFor({ type: TupleType.swayTypeExample });
    const suitableForArrauy = TupleType.isSuitableFor({ type: ArrayType.swayTypeExample });

    expect(suitableForTuple).toEqual(true);
    expect(suitableForArrauy).toEqual(false);

    // validating `struct C`, with nested (tuple) `typeArguments` on `b` property
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');
    const c = findType({ types, typeId: 0 }) as TupleType;

    expect(c.attributes.inputLabel).toEqual('[BigNumberish, A<B<BigNumberish>, string>]');
    expect(c.attributes.outputLabel).toEqual('[number, A<B<BN>, string>]');

    expect(parseTypeArguments.callCount).toEqual(2); // called 4x times
  });
});
