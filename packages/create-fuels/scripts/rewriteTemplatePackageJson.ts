import { versions } from '@fuel-ts/versions';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filepath = join(__dirname, '../templates/nextjs/package.json');

let contents = readFileSync(filepath, 'utf-8');

contents = contents.replace(/xprebuild/g, 'prebuild');
contents = contents.replace(/"fuels": "workspace:\*"/, `"fuels": "${versions.FUELS}"`);
contents = contents.replace(/"build": "pnpm run prebuild && next build"/, `"build": "next build"`);

writeFileSync(filepath, contents);
