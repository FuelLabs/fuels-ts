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

    const b256 = '0x626f0c36909faecc316056fca8be684ab0cd06afc63247dc008bdf9e433f927a';

    const { value } = await contract.functions
      .generic_type_function({
        bim: b256,
      })
      .call();

    expect(value).toEqual(b256);
  });
});
