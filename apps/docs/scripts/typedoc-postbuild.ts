import { readdirSync, mkdirSync, copyFileSync, rmSync, renameSync } from 'fs';
import { join } from 'path';

/**
 * Post build script to trim off undesired leftovers from Typedoc, restructure directories and generate json for links.
 */
const docsDir = join(__dirname, '../src/');
const apiDocsDir = join(docsDir, '/api');
const classesDir = join(apiDocsDir, '/classes');
const modulesDir = join(apiDocsDir, '/modules');

const { log } = console;

const removeUnwantedFiles = () => {
  const filesToRemove = ['api/modules.md', 'api/classes', 'api/modules'];
  filesToRemove.forEach((dirPath) => {
    const fullDirPath = join(docsDir, dirPath);
    rmSync(fullDirPath, { recursive: true, force: true });
  });
};

const exportLinksJson = () => {
  log('TODO: Export links json');
};

const alterFileStructure = () => {
  const modulesFiles = readdirSync(modulesDir);
  const classesFiles = readdirSync(classesDir);

  modulesFiles.forEach((modulesFile) => {
    // Create a new directory for each module
    const newDirName = modulesFile.split('.')[0];
    const newDirPath = join(apiDocsDir, newDirName);
    mkdirSync(newDirPath);

    // Move the class files to the correct module directory
    classesFiles.forEach((classesFile) => {
      if (classesFile.startsWith(newDirName)) {
        const newDirClassFilePath = join(newDirPath, classesFile);
        copyFileSync(join(classesDir, classesFile), newDirClassFilePath);

        // Rename the class file to remove module prefix
        renameSync(newDirClassFilePath, join(newDirPath, classesFile.split('-')[1]));

        log('TODO: Cleanup links');
      }
    });

    // Move module index file
    copyFileSync(join(modulesDir, modulesFile), join(newDirPath, 'index.md'));

    // Rename directory
    const formattedDirName = newDirPath.split('fuel_ts_')[1];
    const capitalisedDirName = formattedDirName.charAt(0).toUpperCase() + formattedDirName.slice(1);
    renameSync(newDirPath, join(apiDocsDir, capitalisedDirName));
  });
};

log('Cleaning up docs.');
alterFileStructure();
removeUnwantedFiles();
exportLinksJson();
