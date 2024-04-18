import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const fuelsVersion = '0.81.0';
const filepath = join(__dirname, '../templates/nextjs/package.json');

let contents = readFileSync(filepath, 'utf-8');

contents = contents.replace(/xprebuild/g, 'prebuild');
contents = contents.replace(/"fuels": "workspace:\*"/, `"fuels": "${fuelsVersion}"`);
contents = contents.replace(/"build": "pnpm run prebuild && next build"/, `"build": "next build"`);

writeFileSync(filepath, contents);
