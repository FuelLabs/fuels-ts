import { readFileSync } from 'fs';
import { join } from 'path';

import { setup } from '../test-utils';

import abiJSON from './out/debug/generic-types-contract-abi.json';

const contractBytecode = readFileSync(join(__dirname, './out/debug/generic-types-contract.bin'));

describe('GenericTypesContract', () => {
  it('should call complex contract function with generic type', async () => {
    const contract = await setup({
      abi: abiJSON,
      contractBytecode,
    });

    const b256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

    const { value } = await contract.functions
      .generic_type_function({
        bim: b256,
        bam: {
          Address: { value: true },
        },
      })
      .call();

    expect(value).toEqual(b256);
  });
});
