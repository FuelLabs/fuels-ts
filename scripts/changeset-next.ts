import { readdir, writeFile } from 'node:fs/promises';
import path from 'path';

const resolveDir = (dir: string) => path.resolve(process.cwd(), dir);

(async () => {
  const pkgsDir = resolveDir('./packages');
  const dirs = await readdir(pkgsDir);
  const output = `---\n${dirs
    .map((dir) => `"@fuel-ts/${dir}": patch`)
    .join('\n')}\n---\n\nincremental\n`;

  writeFile('.changeset/fuel-labs-ci.md', output);
})();
