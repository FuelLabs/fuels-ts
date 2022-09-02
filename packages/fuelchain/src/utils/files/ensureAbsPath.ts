import { isAbsolute, join } from 'path';

export function ensureAbsPath(path: string): string {
  if (isAbsolute(path)) {
    return path;
  }
  return join(process.cwd(), path);
}
