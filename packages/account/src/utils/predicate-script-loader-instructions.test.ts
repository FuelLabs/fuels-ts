import { concat } from '@fuel-ts/utils';

import {
  getBytecodeConfigurableOffset,
  getBytecodeDataOffset,
  getBytecodeId,
  getLegacyBlobId,
} from './predicate-script-loader-instructions';

/**
 * @group node
 * @group browser
 */
describe('Predicate Script Loader Instructions', () => {
  const suffixBytes = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
  const dataBytes = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3]);
  const configurableBytes = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 5]);
  const bytecode = concat([suffixBytes, dataBytes, configurableBytes]);

  it('gets the data offset', () => {
    const offset = getBytecodeDataOffset(bytecode);
    expect(offset).toBe(3);
  });

  it('gets the configurable offset', () => {
    const offset = getBytecodeConfigurableOffset(bytecode);
    expect(offset).toBe(5);
  });

  it('gets the bytecode id', () => {
    const id = getBytecodeId(bytecode);
    expect(id).toBe('0x8855508aade16ec573d21e6a485dfd0a7624085c1a14b5ecdd6485de0c6839a4');
  });

  it('gets the legacy blob id', () => {
    const id = getLegacyBlobId(bytecode);
    expect(id).toBe('0x709e80c88487a2411e1ee4dfb9f22a861492d20c4765150c0c794abd70f8147c');
  });
});
