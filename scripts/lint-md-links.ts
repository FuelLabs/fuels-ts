#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sh from 'shelljs';

function getAllMarkdownFiles(directory: string): string[] {
  const markdownFiles: string[] = [];

  function traverseDirectory(currentPath: string): void {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory() && file !== 'node_modules') {
        traverseDirectory(filePath);
      } else if (fileStat.isFile() && path.extname(file) === '.md' && file !== 'CHANGELOG.md') {
        markdownFiles.push(filePath);
      }
    });
  }

  traverseDirectory(directory);
  return markdownFiles;
}

(() => {
  const mdFiles = getAllMarkdownFiles(process.cwd());

  const filesWithLintErrors: string[] = [];

  mdFiles.forEach((file) => {
    const { code } = sh.exec(`npx textlint ${file}`);
    if (code !== 0) {
      filesWithLintErrors.push(file);
    }
  });

  if (filesWithLintErrors.length > 0) {
    process.exit(1);
  }
})();
