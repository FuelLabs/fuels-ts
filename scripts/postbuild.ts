import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { exec } from 'shelljs';

/**
 * 1) Emit Declaration Maps
 */
if (existsSync(join(process.cwd(), 'tsconfig.dts.json'))) {
  exec('tsc --emitDeclarationOnly -p tsconfig.dts.json');
} else if (existsSync(join(process.cwd(), 'tsconfig.json'))) {
  exec('tsc --emitDeclarationOnly -p tsconfig.json');
}

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
