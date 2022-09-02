import { parse } from 'path';

export function getFilename(path: string) {
  return parse(path).name;
}
