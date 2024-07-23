import { toHex } from 'fuels';

import { GenericTypesContractFactory } from '../test/typegen/contracts';

import { launchTestContract } from './utils';
/**
 * @group node
 * @group browser
 */
describe('GenericTypesContract', () => {
  it('should call complex contract function with generic type', async () => {
    using contract = await launchTestContract({
      factory: GenericTypesContractFactory,
    });

    const b256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
    const bimArg1 = 'Yes';
    const call1 = await contract.functions
      .generic_type_function(
        [
          {
            bim: bimArg1,
            bam: {
              Foo: 100,
            },
          },
          {
            bim: bimArg1,
            bam: {
              Bar: true,
            },
          },
          {
            bim: bimArg1,
            bam: {
              Din: true,
            },
          },
        ],
        [
          {
            bim: [b256, b256, b256],
            bam: {
              Foo: 100,
            },
          },
          {
            bim: [b256, b256, b256],
            bam: {
              Bar: true,
            },
          },
          {
            bim: [b256, b256, b256],
            bam: {
              Din: true,
            },
          },
        ],
        {
          bim: 100,
          bam: {
            Din: 'Yes',
          },
        },
        {
          bim: true,
          bam: {
            Din: 100,
          },
        }
      )
      .call();

    const { value } = await call1.waitForResult();

    const arg1 = {
      bim: toHex(1),
      bam: true,
      never_used: toHex(2),
      foo: {
        x: b256,
        b: toHex(32),
      },
      foo_list: new Array(10).fill(b256),
    };
    const arg2 = {
      bim: toHex(1),
      bam: 2,
      never_used: toHex(3),
      foo: {
        x: {
          x: toHex(21),
          b: toHex(22),
        },
        b: toHex(32),
      },
      foo_list: new Array(10).fill({
        x: toHex(31),
        b: toHex(32),
      }),
    };

    const call2 = await contract.functions.generic_complex_type_function(arg1, arg2).call();
    const { value: value2 } = await call2.waitForResult();

    expect(value).toEqual(bimArg1);
    expect(JSON.stringify([arg1, arg2])).toEqual(JSON.stringify(value2));
  });
});
