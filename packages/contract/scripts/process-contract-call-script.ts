import { hexlify } from '@ethersproject/bytes';
import fs from 'fs';
import path from 'path';

const srcPath = path.join(__dirname, '../src');

// Put hexlified binary in a TS file so it can be imported
const binPath = path.join(srcPath, './contract-call-script/out/debug/contract-call-script.bin');
const bytes = fs.readFileSync(binPath);
const indexTs = `export default '${hexlify(bytes)}';\n`;
fs.writeFileSync(path.join(srcPath, './contract-call-script/index.ts'), indexTs);
