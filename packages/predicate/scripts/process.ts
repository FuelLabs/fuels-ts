import { hexlify } from '@ethersproject/bytes';
import fs from 'fs';
import path from 'path';

const predicatePath = process.argv[2];

const srcPath = path.join(__dirname, '../src');

// Put hexlified binary in a TS file so it can be imported
const binPath = path.join(srcPath, `./${predicatePath}/out/debug/${predicatePath}.bin`);
const bytes = fs.readFileSync(binPath);
const predicateTs = `export default '${hexlify(bytes)}';\n`;
fs.writeFileSync(path.join(srcPath, `./${predicatePath}/index.ts`), predicateTs);
