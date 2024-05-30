import { glob } from 'glob';

import type { ProgramsToInclude } from '../../src/cli';

export const getAllFiles = async (pathToDir: string) => {
  const files = await glob(`${pathToDir}/**/*`, {
    ignore: ['**/node_modules/**', '**/.next/**', '**/sway-api/**'],
  });
  const filesWithoutPrefix = files.map((file) => file.replace(pathToDir, ''));
  return filesWithoutPrefix;
};

export const filterOriginalTemplateFiles = (
  files: string[],
  programsToInclude: ProgramsToInclude
) => {
  let newFiles = [...files];

  newFiles = newFiles.filter((file) => {
    if (file.includes('CHANGELOG')) {
      return false;
    }
    if (!programsToInclude.contract && file.includes('contract')) {
      return false;
    }
    if (!programsToInclude.predicate && file.includes('predicate')) {
      return false;
    }
    if (!programsToInclude.script && file.includes('script')) {
      return false;
    }
    if (['/gitignore', '/env'].includes(file)) {
      return false;
    }
    return true;
  });

  return newFiles;
};

export const filterForcBuildFiles = (file: string) =>
  !file.includes('contract/out') && !file.includes('script/out') && !file.includes('predicate/out');
