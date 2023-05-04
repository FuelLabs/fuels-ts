import upperFirst from 'lodash.upperfirst';

/**
 * Converts valid file names to valid javascript symbols and does
 * best effort to make them readable.
 *
 * Example: ds-token.test becomes DsTokenTest
 */
export const normalize = (fileName: string): string => {
  const transformations: ((s: string) => string)[] = [
    (s) => s.replace(/\s+/g, '-'), // spaces to -
    (s) => s.replace(/\./g, '-'), // dots to -
    (s) => s.replace(/_/g, '-'), // underscore to -
    (s) => s.replace(/-[a-z]/g, (match) => match.slice(-1).toUpperCase()), // delete '-' and capitalize the letter after them
    (s) => s.replace(/-/g, ''), // delete any '-' left
    (s) => s.replace(/^\d+/, ''), // removes leading digits
    (s) => upperFirst(s),
  ];

  const finalName = transformations.reduce((s, t) => t(s), fileName);

  if (finalName === '') {
    throw new Error(`Can't normalize file name: ${fileName}`);
  }

  return finalName;
};
