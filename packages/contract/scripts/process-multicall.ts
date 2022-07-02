import { hexlify } from '@ethersproject/bytes';
import fs from 'fs';
import path from 'path';

const srcPath = path.join(__dirname, '../src');
const srcContractOut = path.join(__dirname, '../src/contracts/multicall/out/debug');

// Put hexlified binary in a TS file so it can be imported
const binPath = path.join(srcContractOut, 'multicall.bin');
const bytes = fs.readFileSync(binPath);
const indexTs = `export default '${hexlify(bytes)}';\n`;
fs.writeFileSync(path.join(srcContractOut, 'multicall-bin.ts'), indexTs);
