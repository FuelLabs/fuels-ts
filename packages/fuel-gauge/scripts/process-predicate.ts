import { hexlify } from 'fuels';
import fs from 'fs';
import path from 'path';

const predicatePath = process.argv[2].replace('/test-projects', '');
const testProjectsPath = path.join(__dirname, '../test-projects');

// Put hexlified binary in a TS file so it can be imported
const binPath = path.join(testProjectsPath, `./${predicatePath}/out/debug/${predicatePath}.bin`);
const bytes = fs.readFileSync(binPath);
const predicateTs = `export default '${hexlify(bytes)}';\n`;
fs.writeFileSync(path.join(testProjectsPath, `./${predicatePath}/index.ts`), predicateTs);
