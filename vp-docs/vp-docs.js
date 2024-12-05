import assert from 'assert';
import fs from 'fs';
import { EOL } from 'os';
import path from 'path';

const subFolderExceptions = ['guide', 'api'];
const subFolderIgnore = ['snippets'];

const srcFolderPath = path.join(process.cwd(), `../../${process.argv[2]}`);
const subfolders = getSubfolders(srcFolderPath);

const configPath = path.join(srcFolderPath, '../.vitepress/config.ts');
const apiOrderPath = path.join(srcFolderPath, '../.typedoc/api-links.json');

const configFile = fs.readFileSync(configPath, 'utf8');
const apiOrderFile = fs.readFileSync(apiOrderPath, 'utf8');

function main() {
  checkForIndexFile(srcFolderPath);
  checkForNestedFolders(subfolders, srcFolderPath);
  const order = processVPConfig(configFile.split(EOL));
  checkOrder(order);
  checkForUnusedFiles(srcFolderPath, subfolders);
}

main();

function checkForIndexFile(srcFolderPath) {
  const indexPath = path.join(srcFolderPath, 'index.md');
  assert(fs.existsSync(indexPath), 'missing index.md at root');
}

function getSubfolders(folderPath) {
  return fs
    .readdirSync(folderPath)
    .filter(
      (item) =>
        fs.statSync(path.join(folderPath, item)).isDirectory() &&
        item !== 'public' &&
        !subFolderIgnore.includes(item)
    );
}

function getNestedFolders(subfolders, folderPath) {
  return subfolders.filter((subfolder) =>
    fs
      .readdirSync(path.join(folderPath, subfolder))
      .some((item) => fs.statSync(path.join(folderPath, subfolder, item)).isDirectory())
  );
}

function checkForNestedFolders(subfolders, srcFolderPath) {
  const nestedSubfolders = getNestedFolders(subfolders, srcFolderPath);
  if (nestedSubfolders.length > 0) {
    nestedSubfolders.forEach((folder) => {
      assert(
        subFolderExceptions.includes(folder),
        `cannot have nested subfolders except for in ${subFolderExceptions
          .map((folder) => folder)
          .join(', ')}`
      );
      const subSubFolderPath = path.join(srcFolderPath, folder);
      const subSubFolders = getSubfolders(subSubFolderPath);
      const nestedSubSubFolders = getNestedFolders(subSubFolders, subSubFolderPath);
      assert.deepStrictEqual(
        nestedSubSubFolders.length,
        0,
        `cannot have nested folders inside ${folder}`
      );
    });
  }
}

function checkForUnusedFiles(srcFolderPath, subfolders) {
  // check if each file can be found in the config
  const fileNames = fs.readdirSync(srcFolderPath);
  fileNames.forEach((file) => {
    if (
      !subFolderIgnore.includes(file) &&
      file !== 'api' &&
      file !== 'public' &&
      file !== 'index.md' &&
      (file.endsWith('md') || file.split('.').length === 1)
    ) {
      assert(configFile.includes(file.replace('.md', '')), `${file} missing in the nav config`);
    }
  });
  subfolders.forEach((folder) => {
    const folderPath = path.join(srcFolderPath, folder);
    const subfolderNames = fs.readdirSync(folderPath);
    const parentFolder = folderPath.split('/').pop();
    subfolderNames.forEach((subFile) => {
      if (parentFolder !== 'api') {
        const actualPath = `${parentFolder}/${subFile === 'index.md' ? '' : subFile}`;
        assert(configFile.includes(actualPath), `${actualPath} missing in the nav config`);
        const fullPath = path.join(srcFolderPath, actualPath);
        if (fs.statSync(fullPath).isDirectory()) {
          const subFolderFiles = fs.readdirSync(fullPath);
          subFolderFiles.forEach((file) => {
            if (file !== 'index.md') {
              assert(
                configFile.includes(file.replace('.md', '')),
                `${file} missing in the nav config`
              );
            }
          });
        }
      }
    });
  });
}

function checkOrder(order, altSrcFolderPath = null) {
  const srcPath = altSrcFolderPath || srcFolderPath;
  Object.keys(order).forEach((key) => {
    const menuOrder = order[key];
    if (key === 'menu') {
      // check if each line in the menu corresponds to
      // an existing top-level file or the name of the folder
      menuOrder.forEach((item) => {
        const itemPath =
          item === 'Introduction'
            ? path.join(srcPath, 'index.md')
            : path.join(srcPath, item.toLowerCase().replaceAll(' ', '-'));

        if (!fs.existsSync(itemPath) && !fs.existsSync(itemPath.concat('.md'))) {
          let newItemPath;
          for (let i = 0; i < subFolderExceptions.length; i++) {
            let newPath = path.join(
              srcPath,
              subFolderExceptions[i],
              item.toLowerCase().replaceAll(' ', '-')
            );
            if (fs.existsSync(newPath)) {
              newItemPath = newPath;
              break;
            } else {
              newPath = path.join(srcPath, subFolderExceptions[i], item.replaceAll(' ', '-'));
              if (fs.existsSync(newPath)) {
                newItemPath = newPath;
                break;
              }
            }
          }
          assert(
            fs.existsSync(newItemPath),
            `${item.toLowerCase().replaceAll(' ', '-')} doesn't exist at ${itemPath}`
          );
        }
      });
    } else {
      const thisKey = key.replaceAll(' ', '-').toLowerCase();
      // check if item exists in the right folder
      menuOrder.forEach((item) => {
        let fileExists = false;
        const newItem = item.replaceAll(' ', '-').toLowerCase();
        let itemPath = path.join(srcPath, thisKey, `/${newItem}.md`);
        if (fs.existsSync(itemPath)) {
          fileExists = true;
        } else {
          for (let i = 0; i < subFolderExceptions.length; i++) {
            itemPath = path.join(srcPath, subFolderExceptions[i], thisKey, `/${newItem}.md`);
            if (fs.existsSync(itemPath)) {
              fileExists = true;
              break;
            } else {
              itemPath = path.join(
                srcPath,
                subFolderExceptions[i],
                key.replaceAll(' ', '-'),
                `/${item.replaceAll(' ', '-')}.md`
              );
              if (fs.existsSync(itemPath)) {
                fileExists = true;
                break;
              }
            }
          }
        }
        assert(
          fileExists,
          `${item} doesn't exist. The file name must match the title in the nav config. If this file is in the API folder, something went wrong.`
        );
      });
    }
  });
}

function extractData(inputString) {
  // used for api.json order
  const regex = /"([^"]+)":\s*"([^"]+)"/g;
  const match = regex.exec(inputString);
  if (match !== null) {
    return match[2];
  }
  return null;
}

function handleVPLine(trimmedLine, lines, index, thisOrder, thisCat) {
  const regex = /'([^']+)'/;
  // Create a shallow copy
  let newVPOrder = JSON.parse(JSON.stringify(thisOrder));
  let category = thisCat;
  if (trimmedLine.includes('collapsed:') || trimmedLine.includes('"collapsed":')) {
    // handle categories
    if (trimmedLine.includes('collapsed:')) {
      const matches = regex.exec(lines[index - 2]);
      category = matches[1];
    } else {
      category = extractData(lines[index - 2]);
    }
    newVPOrder.menu.push(category);
    newVPOrder[category] = [];
  } else if (
    // handle items
    trimmedLine.includes('text') &&
    !lines[index + 2].includes('collapsed:') &&
    !lines[index + 2].includes('"collapsed":')
  ) {
    const matches = regex.exec(trimmedLine);
    const linkMatches = regex.exec(lines[index + 1].trimStart());
    let link;
    let linkName;
    if (linkMatches && matches) {
      link = linkMatches[1];
      linkName = matches[1];
    } else {
      linkName = extractData(trimmedLine);
      link = extractData(lines[index + 1].trimStart());
    }
    if (link && linkName) {
      if (link.startsWith('/')) {
        link = link.replace('/', '');
      }
      const split = link.split('/');
      if (category && split.length !== 2 && split[1] !== '') {
        newVPOrder[category].push(linkName);
      } else {
        newVPOrder.menu.push(linkName);
      }
    }
  } else if (trimmedLine.startsWith('apiLinks')) {
    // handle API order
    newVPOrder.menu.push('API');
    const apiJSON = JSON.parse(apiOrderFile);
    const apiLines = JSON.stringify(apiJSON, null, 2).split(EOL);
    apiLines.forEach((apiLine, apiIndex) => {
      const trimmedAPILine = apiLine.trimStart();
      const results = handleVPLine(trimmedAPILine, apiLines, apiIndex, newVPOrder, category);
      category = results.category;
      newVPOrder = results.newVPOrder;
    });
  }

  return { newVPOrder, category };
}

function processVPConfig(lines) {
  let tsOrder = { menu: [] };
  let currentCategory;
  let foundStart = false;
  lines.forEach((line, index) => {
    const trimmedLine = line.trimStart();
    if (foundStart) {
      const { newVPOrder, category } = handleVPLine(
        trimmedLine,
        lines,
        index,
        tsOrder,
        currentCategory
      );
      tsOrder = newVPOrder;
      currentCategory = category;
    } else if (trimmedLine === 'sidebar: [') {
      foundStart = true;
    }
  });

  return tsOrder;
}
