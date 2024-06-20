import { glob } from 'glob';

export const getAllFiles = async (pathToDir: string) => {
  const files = await glob(`${pathToDir}/**/*`, {
    ignore: ['**/node_modules/**', '**/.next/**', '**/sway-api/**'],
  });
  const filesWithoutPrefix = files.map((file) => file.replace(pathToDir, ''));
  return filesWithoutPrefix;
};

export const filterOriginalTemplateFiles = (files: string[]) => {
  let newFiles = [...files];

  newFiles = newFiles.filter((file) => {
    if (file.includes('CHANGELOG')) {
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
