import { unlink } from 'fs';
import { join } from 'path';

/**
 * Post build script to trim off undesired leftovers from Typedoc.
 */
const docsDir = join(__dirname, '../src/');
const filesToRemove = ['api/modules.md'];
const { log } = console;

filesToRemove.forEach((filePath) => {
  const fullFilePath = join(docsDir, filePath);
  unlink(fullFilePath, (err) => {
    if (err) throw err;
    log(`Removed ${fullFilePath}`);
  });
});
