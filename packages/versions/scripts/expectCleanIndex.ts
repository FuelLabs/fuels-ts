import { execSync } from 'child_process';
import { join } from 'path';

export function expectCleanIndex() {
  const { error } = console;

  const indexFilepath = join(__dirname, '..', 'src', 'index.ts');
  const status = execSync(`git status --short ${indexFilepath}`);
  const isClean = status.toString() === '';

  // exit(1) unless file is up-to-date and has been committed
  if (!isClean) {
    error(`Please, commit this file and try again:\n\t${indexFilepath}\n`);
    process.exit(1);
  }
}
