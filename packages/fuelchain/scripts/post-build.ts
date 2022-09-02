import { chmodSync } from 'fs';
import { resolve } from 'path';

const packageDir = resolve(__dirname, '..');
const distDir = resolve(packageDir, 'dist');

chmodSync(resolve(distDir, 'cli/cli.js'), 0o755);
