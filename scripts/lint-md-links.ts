#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sh from 'shelljs';

function getAllMarkdownFiles(directory: string): string[] {
  const markdownFiles: string[] = [];

  function traverseDirectory(currentPath: string, isRoot: boolean): void {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory() && file !== 'node_modules') {
        traverseDirectory(filePath, false);
      } else if (fileStat.isFile() && path.extname(file) === '.md' && file !== 'CHANGELOG.md') {
        markdownFiles.push(filePath);
      }
    });

    if (isRoot) {
      const readmeFilePath = path.join(currentPath, 'README.md');
      if (fs.existsSync(readmeFilePath)) {
        markdownFiles.push(readmeFilePath); // Add README.md at the root
      }
    }
  }

  traverseDirectory(directory, true);
  return markdownFiles;
}

(() => {
  const mdFiles = getAllMarkdownFiles(process.cwd());

  const filesWithLintErrors: string[] = [];

  mdFiles.forEach((file) => {
    console.log(`Linting ${file}`);
    const { code } = sh.exec(`npx textlint ${file}`);
    if (code !== 0) {
      filesWithLintErrors.push(file);
    }
  });

  if (filesWithLintErrors.length > 0) {
    process.exit(1);
  }
})();
