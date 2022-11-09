import { readFileSync } from 'fs';
import { join } from 'path';

export function getPackageVersion() {
  const packagePath = join(__dirname, '..', '..', 'package.json');
  const packageJson = readFileSync(packagePath, 'utf8');
  const { version } = JSON.parse(packageJson);
  return { version };
}
