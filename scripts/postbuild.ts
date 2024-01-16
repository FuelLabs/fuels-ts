import { execSync } from 'child_process';
import { error } from 'console';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * 1) Emit Declaration Maps
 */
try {
  if (existsSync(join(process.cwd(), 'tsconfig.dts.json'))) {
    execSync('tsc --emitDeclarationOnly -p tsconfig.dts.json', { stdio: 'inherit' });
  } else if (existsSync(join(process.cwd(), 'tsconfig.json'))) {
    execSync('tsc --emitDeclarationOnly -p tsconfig.json', { stdio: 'inherit' });
  }
} catch (err) {
  error(err.toString());
  process.exit(1);
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
