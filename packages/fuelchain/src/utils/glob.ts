import { sync as globSync } from 'glob';
import { flatten, uniq } from 'lodash';

export function glob(
  cwd: string,
  patternsOrFiles: string[],
  ignoreNodeModules: boolean = true
): string[] {
  const matches = patternsOrFiles.map((p) =>
    globSync(
      p,
      ignoreNodeModules
        ? { ignore: 'node_modules/**', absolute: true, cwd }
        : { absolute: true, cwd }
    )
  );

  return uniq(flatten(matches));
}
