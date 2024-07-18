import { glob } from 'glob';

export const getAllFiles = async (pathToDir: string) => {
  const files = await glob(`${pathToDir}/**/*`, {
    ignore: ['**/node_modules/**', '**/.next/**', '**/sway-api/**'],
  });
  return files.map((file) => file.replace(pathToDir, ''));
};

export const filterOriginalTemplateFiles = (files: string[]) => {
  let newFiles = [...files];

  newFiles = newFiles.filter((file) => {
    if (file.includes('CHANGELOG')) {
      return false;
    }
    return !['/gitignore', '/env'].includes(file);
  });

  return newFiles;
};

export const filterForcBuildFiles = (file: string) =>
  !file.includes('contract/out') && !file.includes('script/out') && !file.includes('predicate/out');
