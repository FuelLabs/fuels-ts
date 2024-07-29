import { readFileSync } from 'fs';
import { join } from 'path';

import { arrayify } from './arrayify';
import { compressBytecode, decompressBytecode } from './bytecode';

/**
 * @group node
 * @group browser
 */
test('should compress bytecode', () => {
  const bytecode = readFileSync(
    join(__dirname, '../../test/fixtures/forc-projects/simple/out/release/simple.bin')
  );
  const compressedBytecode = compressBytecode(bytecode);
  expect(compressedBytecode.length).toBeLessThan(bytecode.length);
});

test('should decompress bytecode', () => {
  const bytecode = readFileSync(
    join(__dirname, '../../test/fixtures/forc-projects/simple/out/release/simple.bin')
  );
  const compressedBytecode = compressBytecode(bytecode);
  const decompressedBytecode = decompressBytecode(compressedBytecode);
  expect(decompressedBytecode).toEqual(arrayify(bytecode));
});
