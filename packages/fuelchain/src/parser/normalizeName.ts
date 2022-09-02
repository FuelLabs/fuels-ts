import { upperFirst } from 'lodash';

/**
 * Converts valid file names to valid javascript symbols and does best effort to make them readable. Example: ds-token.test becomes DsTokenTest
 */
export function normalizeName(rawName: string): string {
  const transformations: ((s: string) => string)[] = [
    (s) => s.replace(/\s+/g, '-'), // spaces to - so later we can automatically convert them
    (s) => s.replace(/\./g, '-'), // replace "."
    (s) => s.replace(/-[a-z]/g, (match) => match.substr(-1).toUpperCase()), // delete '-' and capitalize the letter after them
    (s) => s.replace(/-/g, ''), // delete any '-' left
    (s) => s.replace(/^\d+/, ''), // removes leading digits
    (s) => upperFirst(s),
  ];

  const finalName = transformations.reduce((s, t) => t(s), rawName);

  if (finalName === '') {
    throw new Error(`Can't guess class name, please rename file: ${rawName}`);
  }

  return finalName;
}
