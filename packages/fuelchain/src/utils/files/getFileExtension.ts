import { parse } from 'path';

export function getFileExtension(path: string) {
  return parse(path).ext;
}
