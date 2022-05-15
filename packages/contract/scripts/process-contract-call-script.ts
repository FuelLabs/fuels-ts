import { hexlify } from '@ethersproject/bytes';
import { NumberCoder } from '@fuel-ts/abi-coder';
import fs from 'fs';
import path from 'path';

// Patches the script binary to add the binary size
const getPatchedScript = (bytes: Uint8Array): string => {
  // Encode length and right-pad to the size of b256
  const encodedSize = new NumberCoder('encodedSize', 'u64').encode(bytes.length);
  const paddedSize = new Uint8Array(32);
  paddedSize.set(encodedSize);
  // Patch the binary with the encoded size
  const magic = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
  const patched = hexlify(bytes).replace(magic.slice(2), hexlify(paddedSize).slice(2));
  return patched;
};

const srcPath = path.join(__dirname, '../src');

const bytes = fs.readFileSync(
  path.join(srcPath, './contract-call-script/out/debug/contract-call-script.bin')
);

const patchedBytes = getPatchedScript(bytes);

const indexTs = `export default '${patchedBytes}';\n`;

fs.writeFileSync(path.join(srcPath, './contract-call-script/index.ts'), indexTs);
