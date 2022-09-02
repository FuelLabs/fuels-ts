import { dirname } from 'path';

import { lowestCommonPath } from './lowestCommonPath';
import { shortenFullJsonFilePath } from './shortenFullJsonFilePath';

export function detectInputsRoot(allFiles: string[]): string {
  return allFiles.length === 1
    ? dirname(shortenFullJsonFilePath(allFiles[0], allFiles))
    : lowestCommonPath(allFiles);
}
