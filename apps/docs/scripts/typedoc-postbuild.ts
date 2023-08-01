import { readdirSync, mkdirSync, copyFileSync, rmSync, renameSync, writeFileSync } from 'fs';
import { join } from 'path';

type Link = {
  link: string;
  text: string;
  items: Link[];
  collapsed?: boolean;
};

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
  const links: Link = { link: '/api/', text: 'API', items: [] };
  const directories = readdirSync(apiDocsDir);
  directories
    .filter((directory) => directory !== 'index.md')
    .forEach((directory) => {
      links.items.push({ text: directory, link: `/api/${directory}/`, collapsed: true, items: [] });
      readdirSync(join(apiDocsDir, directory))
        .filter((file) => file !== 'index.md')
        .forEach((file) => {
          log(file);
          const index = links.items.findIndex((item) => item.text === directory);
          const name = file.split('.')[0];
          links.items[index].items.push({
            text: name,
            link: `/api/${directory}/${name}`,
            items: [],
          });
        });
    });

  writeFileSync('.typedoc/api-links.json', JSON.stringify(links));
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
