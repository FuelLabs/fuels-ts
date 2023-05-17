import upperFirst from 'lodash.upperfirst';

/**
 * Converts `some.string-value` into `SomeStringValue`.
 *
 * Examples:
 *  my-simple.test —— MySimpleTest
 *  myFile.ts —— MyFileTs
 *  my-abi.json —— MyAbiJson
 */
export const normalizeString = (str: string): string => {
  const transformations: ((s: string) => string)[] = [
    (s) => s.replace(/\s+/g, '-'), // spaces to -
    (s) => s.replace(/\./g, '-'), // dots to -
    (s) => s.replace(/_/g, '-'), // underscore to -
    (s) => s.replace(/-[a-z]/g, (match) => match.slice(-1).toUpperCase()), // delete '-' and capitalize the letter after them
    (s) => s.replace(/-/g, ''), // delete any '-' left
    (s) => s.replace(/^\d+/, ''), // removes leading digits
    (s) => upperFirst(s),
  ];

  const output = transformations.reduce((s, t) => t(s), str);

  if (output === '') {
    throw new Error(`Can't normalize string: ${str}`);
  }

  return output;
};
