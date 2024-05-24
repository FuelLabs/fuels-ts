import { cpSync, existsSync, readdirSync, rmSync } from 'fs';
import { basename, join } from 'path';

export type ProjectPaths = {
  root: string;
  template: string;
  sourceTemplate: string;
};

/**
 * Path and Directory utils
 */
const testDir = join(__dirname, '..');
const createFuelsDir = join(__dirname, '../..');
const testTemplateDir = join(createFuelsDir, 'templates');
const templatesDir = join(__dirname, '../../../../templates');

export const bootstrapProject = (
  testFilepath: string,
  templateName: string = 'nextjs'
): ProjectPaths => {
  // Template paths
  const templateDir = join(templatesDir, templateName);
  const localTemplateDir = join(testTemplateDir, templateName);

  // Unique name
  const testFilename = basename(testFilepath.replace(/\./g, '-'));
  const projectName = `__temp__${testFilename}_${new Date().getTime()}`;

  // Test paths
  const root = join(testDir, projectName);

  return {
    root,
    template: localTemplateDir,
    sourceTemplate: templateDir,
  };
};

export const copyTemplate = (srcDir: string, destDir: string) => {
  if (!existsSync(destDir)) {
    cpSync(srcDir, destDir, { recursive: true });
  }
};

export const resetFilesystem = (dirPath: string) => {
  if (existsSync(dirPath)) {
    rmSync(dirPath, { recursive: true });
  }
};

export const cleanupFilesystem = (dirPath: string = testDir) => {
  const dirs = readdirSync(dirPath).filter((dir) => dir.startsWith('__temp__'));
  dirs.forEach((dir) => {
    resetFilesystem(join(dirPath, dir));
  });

  resetFilesystem(testTemplateDir);
};
