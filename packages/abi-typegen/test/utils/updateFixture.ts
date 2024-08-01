import { writeFileSync } from 'fs';

export function autoUpdateFixture(path: string, contents: string) {
  if (process.env.UPDATE_FIXTURES) {
    if (!/fixtures/.test(path)) {
      throw new Error(`This path may no be a fixture: ${path}`);
    }
    writeFileSync(path, contents);
  }
  return contents;
}
