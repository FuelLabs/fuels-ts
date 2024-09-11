import fs from 'fs';
import path from 'path';

export function getFuelsVersion() {
  if (!require.main) {
    return null;
  }

  let currentDir = path.dirname(require.main.filename);

  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath;
    }
    currentDir = path.dirname(currentDir);
  }

  return null;
}
