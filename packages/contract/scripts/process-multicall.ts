import { hexlify } from '@ethersproject/bytes';
import fs from 'fs';
import path from 'path';

const srcPath = path.join(__dirname, '../src');

// Put hexlified binary in a TS file so it can be imported
const binPath = path.join(srcPath, './multicall/out/debug/multicall.bin');
const bytes = fs.readFileSync(binPath);
const indexTs = `export default '${hexlify(bytes)}';\n`;
fs.writeFileSync(path.join(srcPath, './multicall/out/debug/multicall-bin.ts'), indexTs);
