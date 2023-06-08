import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { exec } from 'shelljs';

/**
 * 1) Emit Declaration Maps
 */
exec('tsc --emitDeclarationOnly -p tsconfig.dts.json');

/**
 * 2) Injects secondary entry-points in main DTS file
 */
const cwd = process.cwd();

const dtsPath = join(cwd, 'dist', 'index.d.ts');
let dtsContents = readFileSync(dtsPath, 'utf-8');

const pkgPath = join(cwd, 'package.json');
const pkgJson = JSON.parse(readFileSync(pkgPath, 'utf-8'));

Object.keys(pkgJson.exports)
  .filter((k) => k !== '.')
  .forEach((k) => {
    const line = `import '${k}.js';`;
    if (dtsContents.indexOf(line) < 0) {
      dtsContents = `${line}\n${dtsContents}`;
    }
  });

writeFileSync(dtsPath, dtsContents);
