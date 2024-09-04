import { cpSync, existsSync, readdirSync, rmSync } from 'fs';
import { basename, join } from 'path';

import { rewriteTemplateFiles } from '../../src/lib/rewriteTemplateFiles';

export type ProjectPaths = {
  // Project paths
  projectRoot: string;
  projectPackageJson: string;

  // Template paths
  templateName: string;
  templateSource: string;
  templateRoot: string;
};

/**
 * Path and Directory utils
 */
const testDir = join(__dirname, '..');
const createFuelsDir = join(__dirname, '../..');
const sourceTemplatesDir = join(__dirname, '../../../../templates');

export const bootstrapProject = (testFilepath: string, template: string = 'vite'): ProjectPaths => {
  // Unique name
  const testFilename = basename(testFilepath.replace(/\./g, '-'));

  // Project paths
  const projectName = `__temp__project_${testFilename}_${new Date().getTime()}`;
  const projectRoot = join(testDir, projectName);
  const projectPackageJson = join(projectRoot, 'package.json');

  // Template paths
  const templateName = `__temp__template_${template}_${testFilename}_${new Date().getTime()}`;
  const templateSource = join(sourceTemplatesDir, template);
  const templateRoot = join(createFuelsDir, 'templates', templateName);

  return {
    // Project paths
    projectRoot,
    projectPackageJson,

    // Template paths
    templateName,
    templateSource,
    templateRoot,
  };
};

export const copyTemplate = (srcDir: string, destDir: string, shouldRewrite: boolean = true) => {
  if (!existsSync(destDir)) {
    cpSync(srcDir, destDir, { recursive: true });
  }

  if (shouldRewrite) {
    rewriteTemplateFiles(destDir);
  }
};

export const resetFilesystem = (dirPath: string) => {
  if (existsSync(dirPath)) {
    rmSync(dirPath, { recursive: true });
  }
};

export const cleanupFilesystem = (dirPaths: string[] = [testDir, createFuelsDir]) => {
  dirPaths
    .flatMap((dirPath) => {
      const dirsInDir = readdirSync(dirPath);
      return dirsInDir.map((dir) => join(dirPath, dir));
    })
    .filter((dir) => dir.startsWith('__temp__'))
    .forEach(resetFilesystem);
};
